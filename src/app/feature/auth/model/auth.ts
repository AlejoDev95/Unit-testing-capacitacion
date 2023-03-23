export interface Users {
  id: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type CreateUserDTO = Omit<Users, 'id'>;
