export interface IEmployee {
  id: number;
  name: string;
  email: string;
  image: string;
  department: string;
  position: string;
  role: 'Employee' | 'Manager' | 'Admin';
  createdAt: string;
  updatedAt: string;
}
