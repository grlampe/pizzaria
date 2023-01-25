import { Body, Controller, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAddressBody } from './dto/createAddressBody';
import { CreateAddressService } from './services/createAddress.service';
import { AddressViewModel } from './view-models/address-view.model';

@Controller('address')
export class AddressController {
  constructor(private readonly createAddressService: CreateAddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateAddressBody, @Req() req) {
    const { street, number, zipCode, complement, state, country, city } = body;
    const { userID } = req.user;

    const { address } = await this.createAddressService.execute({
      userID,
      street,
      number,
      zipCode,
      complement,
      state,
      country,
      city,
    });

    return {
      address: AddressViewModel.toHTTP(address),
    };
  }
}
