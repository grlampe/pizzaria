import { IsNotEmpty } from 'class-validator';

export class CreateAddressBody {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  zipCode: string;

  complement: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;
}
