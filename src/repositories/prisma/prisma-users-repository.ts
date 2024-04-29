import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "../../lib/prisma";
import { normalizeCPF } from "../../utils/normalize-cpf";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByCPF(cpf: string) {
    const user = await prisma.user.findUnique({
      where: {
        cpf: normalizeCPF(cpf),
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
