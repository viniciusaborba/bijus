import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CategoriesRepository } from "../categories-repository";

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findByName(name: string) {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    return category;
  }

  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return category;
  }
}
