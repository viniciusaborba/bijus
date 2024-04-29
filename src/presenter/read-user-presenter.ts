import { User } from "@prisma/client";

export class ReadUserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      role: user.role,
      email: user.email,
      address: user.address,
      cellphoneNumber: user.cellphoneNumber,
    };
  }
}
