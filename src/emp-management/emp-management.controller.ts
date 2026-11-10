import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmpManagementService } from './emp-management.service.js';
import { IEmployee } from './emp-management.interface.js';
import { CreateEmpsDto } from './dto/create-emps.dto.js';
import { UpdateEmpsDto } from './dto/update-emps.dto.js';

@Controller('employees')
export class EmpManagementController {
  constructor(private empService: EmpManagementService) {}

  @Get()
  getAll(
    @Query('role') role: IEmployee['role'],
    @Query('search') search: string,
  ) {
    return this.empService.getAll({ role, search });
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.empService.getById(id);
  }

  @Post()
  createEmp(@Body() createEmpDto: CreateEmpsDto) {
    return this.empService.createEmp(createEmpDto);
  }

  @Put('/:id')
  updateEmp(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmpsDto: UpdateEmpsDto,
  ) {
    return this.empService.updateEmp(id, updateEmpsDto);
  }

  @Delete('/:id')
  deleteEmp(@Param('id', ParseIntPipe) id: number) {
    return this.empService.deleteEmp(id);
  }
}
