import { IsNotEmpty } from 'class-validator';

export class CreateOrderBody {
  @IsNotEmpty()
  addressID: string;
}
