import { randomUUID } from 'crypto';
import { Order } from './order.model';

describe('Order', () => {
  it('should be able to create a new Order', () => {
    const order = new Order({
      userID: randomUUID(),
      addressID: randomUUID(),
    });

    expect(order).toBeTruthy();
    expect(order.userID).toEqual(expect.any(String));
    expect(order.addressID).toEqual(expect.any(String));
    expect(order.createdAt).toEqual(expect.any(Date));
  });

  it('should be able to change Properties from Order', () => {
    const address = new Order(
      {
        userID: randomUUID(),
        addressID: randomUUID(),
        createdAt: new Date(),
      },
      randomUUID(),
    );

    address.userID = randomUUID();
    address.addressID = randomUUID();

    expect(address).toBeTruthy();
    expect(address.id).toEqual(expect.any(String));
    expect(address.userID).toEqual(expect.any(String));
    expect(address.addressID).toEqual(expect.any(String));
    expect(address.createdAt).toEqual(expect.any(Date));
  });
});
