import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, PlanType, PaymentMethod } from '../types';
import { vipPlans } from '../data/vipPlans';

interface OrderState {
  orders: Order[];
  createOrder: (planId: PlanType, paymentMethod: PaymentMethod) => Order;
  simulatePayment: (orderId: string) => Promise<boolean>;
  getLatestOrder: () => Order | undefined;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (planId: PlanType, paymentMethod: PaymentMethod) => {
        const plan = vipPlans.find(p => p.id === planId);
        if (!plan) throw new Error('Plan not found');

        const order: Order = {
          id: `ORD-${Date.now()}`,
          planId,
          amount: plan.price,
          paymentMethod,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        set({ orders: [order, ...get().orders] });
        return order;
      },

      simulatePayment: async (orderId: string) => {
        const order = get().orders.find(o => o.id === orderId);
        if (!order) return false;

        await new Promise(resolve => setTimeout(resolve, 2000));

        const success = Math.random() > 0.1;
        if (success) {
          const updatedOrders = get().orders.map(o =>
            o.id === orderId
              ? {
                  ...o,
                  status: 'paid' as const,
                  paidAt: new Date().toISOString(),
                  expiresAt: o.planId === 'lifetime'
                    ? undefined
                    : new Date(Date.now() + (o.planId === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
                }
              : o
          );
          set({ orders: updatedOrders });
        }
        return success;
      },

      getLatestOrder: () => {
        return get().orders[0];
      },

      getOrderById: (orderId: string) => {
        return get().orders.find(o => o.id === orderId);
      },
    }),
    {
      name: 'order-storage',
    }
  )
);
