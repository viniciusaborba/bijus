import { UsersRepository } from "../../repositories/users-repository";
import { Either, left, right } from "../../@types/either";
import { NotFoundError } from "../../errors/not-found-error";
import { hash } from "bcryptjs";

interface UpdateUserRequest {
  userId: string;
  name?: string;
  cellphoneNumber?: string;
  email?: string;
  address?: string;
}

type UpdateUserResponse = Either<NotFoundError, null>;

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    address,
    cellphoneNumber,
    email,
    name,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      return left(new NotFoundError("User"));
    }

    user.name = name ?? user.name;
    user.address = address ?? user.address;
    user.cellphoneNumber = cellphoneNumber ?? user.cellphoneNumber;
    user.email = email ?? user.email;

    await this.usersRepository.update(user, user.id);

    return right(null)
  }
}
