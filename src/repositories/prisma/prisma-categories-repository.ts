import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CategoriesRepository } from "../categories-repository";

export class PrismaCategoriesRepository implements CategoriesRepository {
  async searchMany(q: string, page: number) {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return categories;
  }
  async findById(id: string) {
    const user = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async findByName(name: string) {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    return category;
  }

  async list() {
    const categories = await prisma.category.findMany({});

    return categories;
  }

  async update(data: Prisma.CategoryUpdateInput, categoryId: string) {
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data,
    });
  }

  async delete(id: string) {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return category;
  }
}
