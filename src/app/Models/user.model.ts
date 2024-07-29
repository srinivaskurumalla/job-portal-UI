export interface User {
    empId: number;
    email: string;
    password: string;
    role: 'admin_hr' | 'employee';
  }
  