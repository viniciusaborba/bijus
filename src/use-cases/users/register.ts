import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/users-repository";
import { Either, left, right } from "../../@types/either";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { normalizeCPF } from "../../utils/normalize-cpf";

interface RegisterUserRequest {
  name: string;
  cellphoneNumber: string;
  cpf: string;
  email: string;
  address: string;
  password: string;
}

type RegisterUserResponse = Either<
  AlreadyExistsError,
  {
    user: User;
  }
>;
export class RegisterUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    cpf,
    name,
    email,
    password,
    address,
    cellphoneNumber,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const password_hash = await hash(password, 6);

    const userAlreadyExists = await this.usersRepository.findByCPF(cpf);

    if (userAlreadyExists) {
      return left(new AlreadyExistsError("User"));
    }

    const user = await this.usersRepository.create({
      cpf: normalizeCPF(cpf),
      name,
      password: password_hash,
      cellphoneNumber,
      address,
      email,
    });

    return right({
      user,
    });
  }
}
