import { Module } from '@nestjs/common';
import { EmpManagementController } from './emp-management.controller.js';
import { EmpManagementService } from './emp-management.service.js';

@Module({
  controllers: [EmpManagementController],
  providers: [EmpManagementService]
})
export class EmpManagementModule {}
