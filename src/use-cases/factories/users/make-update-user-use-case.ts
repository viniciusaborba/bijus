import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { UpdateUserUseCase } from "../../users/update";

export function makeUpdateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const useCase = new UpdateUserUseCase(prismaUsersRepository);

  return useCase;
}
