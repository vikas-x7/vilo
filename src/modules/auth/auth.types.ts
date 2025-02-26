export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SafeUser {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
