import { Injectable, NotFoundException } from '@nestjs/common';
import { IEmployee } from './emp-management.interface.js';

@Injectable()
export class EmpManagementService {
  private readonly employees: IEmployee[] = [
    {
      id: 1,
      name: 'Rakibul Hasan',
      email: 'rakibul@gmail.com',
      image: 'https://randomuser.me/api/portraits/men/69.jpg',
      department: 'Software Development',
      role: 'Manager',
      position: 'Software Developer',
      createdAt: '2026-07-10T10:00:00Z',
      updatedAt: '2026-07-10T10:00:00Z',
    },
    {
      id: 2,
      name: 'Abu Rayhan',
      email: 'abu@gmail.com',
      image: 'https://randomuser.me/api/portraits/men/69.jpg',
      department: 'Web Development',
      role: 'Employee',
      position: 'Web Developer',
      createdAt: '2026-07-20T10:00:00Z',
      updatedAt: '2026-07-20T10:00:00Z',
    },
  ];

  getAll() {
    return this.employees;
  }

  getById(id: IEmployee['id']) {
    const found = this.employees.find((emp) => emp.id === id);

    if (!found) {
      throw new NotFoundException(`Employee not found with this id : ${id}`);
    }

    return found;
  }
}
