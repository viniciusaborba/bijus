import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  unregister(id: string): Promise<void>;
  update(data: Prisma.UserUpdateInput, userId: string): Promise<void>;
  findByCPF(cpf: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
