import { Injectable } from '@nestjs/common';
import { Address } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { AddressCreateDto, AddressUpdateDto } from './dtos/address.dto';

@Injectable()
export class AddressService {
  constructor(private dbService: DbService) {}

  getAddresses(): Promise<Address[]> {
    return this.dbService.address.findMany();
  }

  getAddressById(id: string): Promise<Address> {
    return this.dbService.address.findUnique({ where: { id } });
  }

  getAddressByUserId(userId: string): Promise<Address[]> {
    return this.dbService.address.findMany({ where: { userId } });
  }

  createAddress(data: AddressCreateDto): Promise<Address> {
    return this.dbService.address.create({ data });
  }

  updateAddressById(id: string, data: AddressUpdateDto): Promise<Address> {
    return this.dbService.address.update({ where: { id }, data });
  }

  deleteAddressById(id: string): Promise<Address> {
    return this.dbService.address.delete({ where: { id } });
  }
}
