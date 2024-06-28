import { UsersRepository } from "@/repositories/users-repository";
import { Prisma, $Enums, User } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      cpf: data.cpf,
      email: data.email,
      updatedAt: new Date(),
      createdAt: new Date(),
      password: data.password,
      role: data.role || "USER",
      cellphoneNumber: data.cellphoneNumber,
      address: data.address,
    };

    this.items.push(user);

    return user;
  }
  async unregister(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  async update(data: Prisma.UserUpdateInput, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findByCPF(cpf: string) {
    const user = this.items.find((item) => item.cpf === cpf);

    if (!user) {
      return null;
    }

    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
