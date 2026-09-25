import { Order } from '../types';
import { mockOrders } from '../data/mockRepository';

export const orderService = {
  async getOrders(): Promise<Order[]> {
    return [...mockOrders];
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const found = mockOrders.find((o) => o.order_id === orderId);
    return found || null;
  },
};
