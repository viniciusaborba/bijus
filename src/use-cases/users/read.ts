import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";
import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";

interface ReadUserRequest {
  userId: string;
}

type ReadUserResponse = Either<
  NotFoundError,
  {
    user: User;
  }
>;
export class ReadUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId
  }: ReadUserRequest): Promise<ReadUserResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new NotFoundError("User"));
    }

    return right({
      user,
    });
  }
}
