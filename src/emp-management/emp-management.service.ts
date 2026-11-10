import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IEmployee } from './emp-management.interface.js';
import { CreateEmpsDto } from './dto/create-emps.dto.js';
import { UpdateEmpsDto } from './dto/update-emps.dto.js';

@Injectable()
export class EmpManagementService {
  private readonly employees: IEmployee[] = [
    {
      id: 1,
      name: 'Rakibul Hasan',
      email: 'rakibul@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
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
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'Web Development',
      role: 'manager',
      position: 'Team Lead',
      createdAt: '2026-07-20T10:00:00Z',
      updatedAt: '2026-07-20T10:00:00Z',
    },
    {
      id: 3,
      name: 'Tanvir Ahmed',
      email: 'tanvir@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'Software Development',
      role: 'employee',
      position: 'Frontend Developer',
      createdAt: '2026-07-22T10:00:00Z',
      updatedAt: '2026-07-22T10:00:00Z',
    },
    {
      id: 4,
      name: 'Mehedi Hasan',
      email: 'mehedi@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'Web Development',
      role: 'employee',
      position: 'Backend Developer',
      createdAt: '2026-07-25T10:00:00Z',
      updatedAt: '2026-07-25T10:00:00Z',
    },
    {
      id: 5,
      name: 'Nazmul Islam',
      email: 'nazmul@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'UI/UX Design',
      role: 'employee',
      position: 'Product Designer',
      createdAt: '2026-07-28T10:00:00Z',
      updatedAt: '2026-07-28T10:00:00Z',
    },
    {
      id: 6,
      name: 'Imran Hossain',
      email: 'imran@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'Quality Assurance',
      role: 'employee',
      position: 'QA Engineer',
      createdAt: '2026-08-01T10:00:00Z',
      updatedAt: '2026-08-01T10:00:00Z',
    },
    {
      id: 7,
      name: 'Sazzad Hossain',
      email: 'sazzad@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'Software Development',
      role: 'manager',
      position: 'Project Manager',
      createdAt: '2026-08-05T10:00:00Z',
      updatedAt: '2026-08-05T10:00:00Z',
    },
    {
      id: 8,
      name: 'Fahim Faisal',
      email: 'fahim@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'DevOps',
      role: 'employee',
      position: 'DevOps Engineer',
      createdAt: '2026-08-10T10:00:00Z',
      updatedAt: '2026-08-10T10:00:00Z',
    },
    {
      id: 9,
      name: 'Ashikur Rahman',
      email: 'ashik@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'Web Development',
      role: 'employee',
      position: 'Full Stack Developer',
      createdAt: '2026-08-15T10:00:00Z',
      updatedAt: '2026-08-15T10:00:00Z',
    },
    {
      id: 10,
      name: 'Sharif Uddin',
      email: 'sharif@gmail.com',
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      department: 'Cyber Security',
      role: 'employee',
      position: 'Security Analyst',
      createdAt: '2026-08-20T10:00:00Z',
      updatedAt: '2026-08-20T10:00:00Z',
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
      image: 'https://randomemployee.me/api/portraits/men/69.jpg',
      role: 'employee',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.employees.push(newEmp);
    return newEmp;
  }

  updateEmp(id: IEmployee['id'], payload: UpdateEmpsDto) {
    const emp = this.getById(id);
    Object.assign(emp, { ...payload, updatedAt: new Date().toISOString() });
    return emp;
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
