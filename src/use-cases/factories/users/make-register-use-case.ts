import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { RegisterUser } from "../../users/register";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUser(prismaUsersRepository);

  return useCase;
}