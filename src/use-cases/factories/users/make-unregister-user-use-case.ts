import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { UnregisterUserUseCase } from "../../users/unregister";

export function makeUnregisterUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new UnregisterUserUseCase(prismaUsersRepository);

  return useCase;
}
