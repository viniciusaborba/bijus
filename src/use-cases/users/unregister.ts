import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";
import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";

interface UnregisterUserRequest {
  userId: string;
}

type UnregisterUserResponse = Either<NotFoundError, null>;
export class UnregisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: UnregisterUserRequest): Promise<UnregisterUserResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new NotFoundError("User"));
    }

    await this.usersRepository.unregister(user.id);

    return right(null);
  }
}
