import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
}
