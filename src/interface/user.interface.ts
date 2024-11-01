// user.interface.ts
export interface User {
  id: string;
  userId: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
