import { Category } from "@prisma/client";

export class ReadCategoryPresenter {
  static toHTTP(category: Category) {
    return {
      name: category.name,
    };
  }
}
