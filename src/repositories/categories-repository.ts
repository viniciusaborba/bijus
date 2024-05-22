import { Prisma, Category } from "@prisma/client";

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  delete(id: string): Promise<void>;
  update(data: Prisma.CategoryUpdateInput, categoryId: string): Promise<void>;
  listBySlug(slug: string): Promise<Category | null>
  list(): Promise<Category[]>;
  searchMany(q: string, page: number): Promise<Category[]>;
  findByName(name: string): Promise<Category | null>;
  findById(id: string): Promise<Category | null>;
}
