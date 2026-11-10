import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IEmployee } from './emp-management.interface.js';
import { CreateEmpsDto } from './dto/create-emps.dto.js';

@Injectable()
export class EmpManagementService {
  private readonly employees: IEmployee[] = [
    {
      id: 1,
      name: 'Rakibul Hasan',
      email: 'rakibul@gmail.com',
      image: 'https://randomuser.me/api/portraits/men/69.jpg',
      department: 'Software Development',
      role: 'admin',
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
      role: 'manager',
      position: 'Team Lead',
      createdAt: '2026-07-20T10:00:00Z',
      updatedAt: '2026-07-20T10:00:00Z',
    },
  ];

  private id = this.employees.length + 1;

  getAll(query: { role: IEmployee['role']; search: string }) {
    let employees = this.employees;

    if (query.role) {
      employees = employees.filter((emp) => emp.role === query.role);
    }

    if (query.search) {
      employees = employees.filter(
        (emp) =>
          emp.name.toLowerCase().startsWith(query.search.toLowerCase()) ||
          emp.email.toLowerCase().startsWith(query.search.toLowerCase()),
      );
    }

    return employees;
  }

  getById(id: IEmployee['id']) {
    const found = this.employees.find((emp) => emp.id === id);

    if (!found) {
      throw new NotFoundException(`Employee not found with this id : ${id}`);
    }

    return found;
  }

  createEmp(payload: CreateEmpsDto) {
    const exist = this.employees.find(
      (emp) => emp.email.toLowerCase() === payload.email.toLowerCase(),
    );

    if (exist) {
      throw new ConflictException(
        `Employee already exists with this email : ${payload.email}`,
      );
    }

    const newEmp: IEmployee = {
      id: this.id++,
      ...payload,
      image: 'https://randomuser.me/api/portraits/men/69.jpg',
      role: 'employee',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.employees.push(newEmp);
    return newEmp;
  }

  updateEmp(id: IEmployee['id'], payload: Partial<CreateEmpsDto>) {
    const index = this.employees.findIndex((emp) => emp.id === id);

    if (index === -1) {
      throw new NotFoundException(`Employee not found with this id : ${id}`);
    }

    if (payload.email) {
      const duplicate = this.employees.find(
        (emp) =>
          emp.id !== id &&
          emp.email.toLowerCase() === payload.email!.toLowerCase(),
      );

      if (duplicate) {
        throw new ConflictException(
          `Employee already exists with this email : ${payload.email}`,
        );
      }
    }

    this.employees[index] = {
      ...this.employees[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    return this.employees[index];
  }

  deleteEmp(id: IEmployee['id']) {
    const index = this.employees.findIndex((emp) => emp.id === id);

    if (index === -1) {
      throw new NotFoundException(`Employee not found with this id : ${id}`);
    }

    const [deleted] = this.employees.splice(index, 1);
    return deleted;
  }
}
