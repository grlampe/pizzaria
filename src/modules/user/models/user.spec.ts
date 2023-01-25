import { User } from './user';

describe('User', () => {
  it('should be able to create a new User', () => {
    const user = new User({
      name: 'User Name Test',
      email: 'user@example.com',
      password: 'test pass',
    });

    expect(user).toBeTruthy();
    expect(user.name).toEqual('User Name Test');
    expect(user.email).toEqual('user@example.com');
    expect(user.password).toEqual('test pass');
    expect(user.createdAt).toEqual(expect.any(Date));
    expect(user.id).toEqual(expect.any(String));
  });
});
