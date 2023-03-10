import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AddressController } from './adress.controller';
import { CreateAddressService } from './services/createAddress.service';
import { ListAllAddressByUserIDService } from './services/listAllAddressByUserID.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [CreateAddressService, ListAllAddressByUserIDService],
})
export class AddressModule {}
