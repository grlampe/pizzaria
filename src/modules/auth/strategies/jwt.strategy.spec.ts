import { randomUUID } from 'crypto';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  const jwtStrategy: JwtStrategy = new JwtStrategy();

  it('should destructure a payload', async () => {
    const uuid = randomUUID();
    const { userID, email } = await jwtStrategy.validate({
      username: 'user@example.com',
      sub: uuid,
      iat: 1674706133,
      exp: 1674792533,
    });

    expect(userID).toEqual(uuid);
    expect(email).toEqual('user@example.com');
  });
});
