import { ProductsRepository } from "../products-repository";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaProductsRepository implements ProductsRepository {
  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
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

  async listProductsBySlug() {
    const necklaces = await prisma.product.findMany({
      where: {
        category: {
          slug: "colares",
        },
      },
    });

    return necklaces;
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data,
    });

    return product;
  }
}
