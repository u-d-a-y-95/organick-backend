import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UnitService } from './unit.service';
import { UnitCreateDto, UnitUpdateDto } from './dtos/unit.dto';

@ApiTags('Unit')
@ApiBearerAuth()
@Controller('units')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get()
  getAllunit() {
    return this.unitService.getUnits();
  }

  @Get(':id')
  async getUnit(@Param('id') id: string) {
    return this.unitService.getUnitById(id);
  }

  @Post()
  createUnit(@Body() unitDto: UnitCreateDto) {
    return this.unitService.createUnit(unitDto);
  }

  @Put(':id')
  updateUnit(@Param('id') id: string, @Body() unitDto: UnitUpdateDto) {
    return this.unitService.updateUnit(id, unitDto);
  }

  @Delete(':id')
  deleteUnit(@Param('id') id: string) {
    return this.unitService.deleteUnit(id);
  }
}
