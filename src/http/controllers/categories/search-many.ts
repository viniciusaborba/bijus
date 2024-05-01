import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchManyCategoriesUserUseCase } from "../../../use-cases/factories/categories/make-search-many-categories";
import { NotFoundError } from "../../../errors/not-found-error";
import { ReadCategoryPresenter } from "../../../presenter/read-category-presenter";

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchRecipientsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchRecipientsQuerySchema.parse(req.query);

  const searchRecipientsUseCase = makeSearchManyCategoriesUserUseCase();

  const result = await searchRecipientsUseCase.execute({
    q,
    page,
  });

  if (result.isLeft()) {
    throw new NotFoundError("Category");
  }

  const categories = result.value.categories;

  return res.status(200).send({
    categories: categories.map(ReadCategoryPresenter.toHTTP),
  });
}
