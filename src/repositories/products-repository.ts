import { Prisma, Product } from "@prisma/client";

export interface ProductsRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
  delete(id: string): Promise<void>;
  read(slug: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findManyOffers(): Promise<Product[] | null>
  listProductsBySlug(slug: string): Promise<Product[]>;
}
