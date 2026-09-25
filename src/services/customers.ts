import { Customer } from '../types';
import { mockCustomers } from '../data/mockRepository';

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    return [...mockCustomers];
  },

  async getCustomerById(customerId: string): Promise<Customer | null> {
    const found = mockCustomers.find((c) => c.customer_id === customerId);
    return found || null;
  },
};
