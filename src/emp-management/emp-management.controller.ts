import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EmpManagementService } from './emp-management.service.js';

@Controller('employees')
export class EmpManagementController {
  constructor(private empService: EmpManagementService) {}

  @Get()
  getAll() {
    return this.empService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.empService.getById(id);
  }
}
