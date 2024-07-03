import { Order } from "@prisma/client";

export class ReadOrderPresenter {
  static toHTTP(order: Order) {
    return {
      id: order.id,
      createdAt: order.createdAt,
      status: order.status,
    };
  }
}
