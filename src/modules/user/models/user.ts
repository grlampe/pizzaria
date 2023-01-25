import { randomUUID } from 'crypto';
import { Replace } from '../../../utils/replace';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  fullAddress: string;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set fullAddress(fullAddress: string) {
    this.props.fullAddress = fullAddress;
  }

  public get fullAddress(): string {
    return this.props.fullAddress;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
