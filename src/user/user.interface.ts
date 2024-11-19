export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    role: 'user' | 'admin';
    created_at: Date;
    updated_at: Date;
  }