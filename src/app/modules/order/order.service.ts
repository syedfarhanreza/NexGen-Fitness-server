import { TOrders } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (payload: Partial<TOrders>) => {
  const result = await Order.create(payload);
  return result;
};

const getAllOrders = async () => {
  const result = await Order.find();

  if (result.length === 0) {
    return null;
  }

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrders,
};
