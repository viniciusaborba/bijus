import { ProductsRepository } from "../products-repository";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data,
    });

    return product;
  }
  async findByName(name: string) {
    const product = await prisma.product.findFirst({
      where: {
        name,
      },
    });

    return product;
  }
}
