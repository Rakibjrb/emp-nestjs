export interface IEmployee {
  id: number;
  name: string;
  email: string;
  image: string;
  department: string;
  position: string;
  role: 'employee' | 'manager' | 'admin';
  createdAt: string;
  updatedAt: string;
}
