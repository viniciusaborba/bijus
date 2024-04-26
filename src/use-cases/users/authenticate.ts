import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";
import { UsersRepository } from "../../repositories/users-repository";
import { Either, left, right } from "../../@types/either";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    user: User;
  }
>;

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return right({
      user,
    });
  }
}
