import { Module } from '@nestjs/common';
import { EmpManagementModule } from './emp-management/emp-management.module.js';

@Module({
  imports: [EmpManagementModule],
})
export class AppModule {}
