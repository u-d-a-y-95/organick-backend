import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { AddressCreateDto, AddressUpdateDto } from './dtos/address.dto';

@ApiTags('Address')
@ApiBearerAuth()
@Controller('addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get()
  getAddresses() {
    return this.addressService.getAddresses();
  }

  @Post()
  createAddress(@Body() body: AddressCreateDto) {
    return this.addressService.createAddress(body);
  }

  @Get(':id')
  getAddressById(@Param('id') id: string) {
    return this.addressService.getAddressById(id);
  }

  @Get('/user/:id')
  getAddressByUserId(@Param('id') id: string) {
    return this.addressService.getAddressByUserId(id);
  }

  @Patch(':id')
  updateAddress(@Body() body: AddressUpdateDto, @Param('id') id: string) {
    return this.addressService.updateAddressById(id, body);
  }

  @Delete(':id')
  deleteAddress(@Param('id') id: string) {
    return this.addressService.deleteAddressById(id);
  }
}
