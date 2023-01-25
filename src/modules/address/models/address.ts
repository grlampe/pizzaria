import { randomUUID } from 'crypto';
import { Replace } from '../../../utils/replace';

export interface AddressProps {
  userID: string;
  street: string;
  number: number;
  zipCode: string;
  complement: string;
  state: string;
  country: string;
  city: string;
  createdAt: Date;
}

export class Address {
  private _id: string;
  private props: AddressProps;

  constructor(props: Replace<AddressProps, { createdAt?: Date }>, id?: string) {
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

  public get street() {
    return this.props.street;
  }

  public set street(street: string) {
    this.props.street = street;
  }

  public get number() {
    return this.props.number;
  }

  public set number(number: number) {
    this.props.number = number;
  }

  public get zipCode() {
    return this.props.zipCode;
  }

  public set zipCode(zipCode: string) {
    this.props.zipCode = zipCode;
  }

  public get complement() {
    return this.props.complement;
  }

  public set complement(complement: string) {
    this.props.complement = complement;
  }

  public get state() {
    return this.props.state;
  }

  public set state(state: string) {
    this.props.state = state;
  }

  public get country() {
    return this.props.country;
  }

  public set country(country: string) {
    this.props.country = country;
  }

  public get city() {
    return this.props.city;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
