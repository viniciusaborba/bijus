import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  listProductsBySlug(): Promise<Product[]>;
}
