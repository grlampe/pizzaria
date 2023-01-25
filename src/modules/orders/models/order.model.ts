import { randomUUID } from 'crypto';
import { Replace } from '../../../utils/replace';

export interface OrderProps {
  userID: string;
  addressID: string;
  createdAt: Date;
}

export class Order {
  private _id: string;
  private props: OrderProps;

  constructor(props: Replace<OrderProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get userID() {
    return this.props.userID;
  }

  public set userID(userID: string) {
    this.props.userID = userID;
  }

  public get addressID() {
    return this.props.addressID;
  }

  public set addressID(addressID: string) {
    this.props.addressID = addressID;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
