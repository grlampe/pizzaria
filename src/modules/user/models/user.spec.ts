import { User } from './user';

describe('User', () => {
  it('should be able to create a new User', () => {
    const user = new User({
      name: 'User Name Test',
      email: 'user@example.com',
      password: 'password',
      fullAddress: 'Test Street 1245',
    });

    expect(user).toBeTruthy();
    expect(user.name).toEqual('User Name Test');
    expect(user.email).toEqual('user@example.com');
    expect(user.fullAddress).toEqual('Test Street 1245');
    expect(user.password).toEqual('password');
    expect(user.createdAt).toEqual(expect.any(Date));
    expect(user.id).toEqual(expect.any(String));
  });
});
