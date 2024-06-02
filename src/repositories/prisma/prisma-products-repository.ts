import { ProductsRepository } from "../products-repository";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaProductsRepository implements ProductsRepository {
  async findManyOffers() {
    const offers = await prisma.product.findMany({
      where: {
        discountPercentage: {
          gt: 0,
        },
      },
    });

    return offers;
  }

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

  async read(slug: string) {
    const product = await prisma.product.findFirst({
      where: {
        slug,
      },
      include: {
        category: {
          include: {
            products: {
              where: {
                slug: {
                  not: slug,
                },
              },
            },
          },
        },
      },
    });

    return product;
  }

  async listProductsBySlug(slug: string) {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug,
        },
      },
    });

    return products;
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
