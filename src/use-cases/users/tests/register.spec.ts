import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUser } from "../register";
import { left } from "@/@types/either";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUser;

describe("Register user", async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUser(usersRepository);
  });

  it("should be able to register a user", async () => {
    const res = await sut.execute({
      email: "email@email.com",
      password: "123456",
      name: "user test",
      cpf: "12345678911",
      address: "rua teste 123",
      cellphoneNumber: "51999999999",
    });

    if (res.isLeft()) {
      return left(new Error());
    }

    const user = res.value.user;

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to use hash user password upon registration", async () => {
    const res = await sut.execute({
      email: "email@email.com",
      password: "123456",
      name: "user test",
      cpf: "12345678911",
      address: "rua teste 123",
      cellphoneNumber: "51999999999",
    });

    if (res.isLeft()) {
      return left(new Error());
    }

    const user = res.value.user;

    const isPasswordHashedCorrectly = await compare("123456", user.password);

    expect(isPasswordHashedCorrectly).toBe(true);
  });

  //   it("should not be able to register a already existent user")
});
