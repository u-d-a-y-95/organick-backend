import { Injectable } from '@nestjs/common';
import { Unit } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { UnitCreateDto, UnitUpdateDto } from './dtos/unit.dto';

@Injectable()
export class UnitService {
  constructor(private dbService: DbService) {}

  async getUnits(): Promise<Unit[]> {
    return this.dbService.unit.findMany();
  }

  async getUnitById(id: string): Promise<Unit> {
    return this.dbService.unit.findUnique({ where: { id } });
  }

  async createUnit(data: UnitCreateDto): Promise<Unit> {
    return this.dbService.unit.create({
      data,
    });
  }

  async updateUnit(id: string, data: UnitUpdateDto): Promise<Unit> {
    return this.dbService.unit.update({
      where: { id },
      data,
    });
  }

  async deleteUnit(id: string): Promise<Unit> {
    return this.dbService.unit.delete({ where: { id } });
  }
}
