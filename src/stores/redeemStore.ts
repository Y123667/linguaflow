import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RedeemCode, PlanType } from '../types';

interface RedeemState {
  codes: RedeemCode[];
  redeemedByUser: string[];
  generateCodes: (count: number, plan: PlanType, durationDays: number) => string[];
  redeemCode: (code: string, userId: string) => { success: boolean; message: string; plan?: PlanType; durationDays?: number };
  isCodeRedeemed: (code: string) => boolean;
}

const generateRandomCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const useRedeemStore = create<RedeemState>()(
  persist(
    (set, get) => ({
      codes: [
        {
          code: 'XHS-VIP001-MONTH',
          plan: 'monthly',
          durationDays: 30,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'XHS-VIP002-MONTH',
          plan: 'monthly',
          durationDays: 30,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'XHS-VIP003-MONTH',
          plan: 'monthly',
          durationDays: 30,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'XHS-VIP004-MONTH',
          plan: 'monthly',
          durationDays: 30,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'XHS-VIP005-MONTH',
          plan: 'monthly',
          durationDays: 30,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'XHS-YEAR001-VIP',
          plan: 'yearly',
          durationDays: 365,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'XHS-YEAR002-VIP',
          plan: 'yearly',
          durationDays: 365,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'XHS-YEAR003-VIP',
          plan: 'yearly',
          durationDays: 365,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'ZSXQ-LIFE-0001',
          plan: 'lifetime',
          durationDays: 99999,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'ZSXQ-LIFE-0002',
          plan: 'lifetime',
          durationDays: 99999,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'LINGUA-9999-FLOW',
          plan: 'yearly',
          durationDays: 365,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'LINGUA-8888-TEST',
          plan: 'monthly',
          durationDays: 30,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'VIP2024-ABCD-EFGH',
          plan: 'yearly',
          durationDays: 365,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'MONTH-1234-5678',
          plan: 'monthly',
          durationDays: 30,
          used: false,
          createdAt: new Date().toISOString(),
        },
        {
          code: 'LIFE-AAAA-BBBB',
          plan: 'lifetime',
          durationDays: 99999,
          used: false,
          createdAt: new Date().toISOString(),
        },
      ],
      redeemedByUser: [],

      generateCodes: (count: number, plan: PlanType, durationDays: number) => {
        const newCodes: RedeemCode[] = [];
        const generated: string[] = [];
        for (let i = 0; i < count; i++) {
          let code: string;
          do {
            code = generateRandomCode();
          } while (get().codes.some(c => c.code === code));
          newCodes.push({
            code,
            plan,
            durationDays,
            used: false,
            createdAt: new Date().toISOString(),
          });
          generated.push(code);
        }
        set({ codes: [...newCodes, ...get().codes] });
        return generated;
      },

      redeemCode: (code: string, userId: string) => {
        const normalizedCode = code.trim().toUpperCase();
        const codeEntry = get().codes.find(c => c.code.toUpperCase() === normalizedCode);

        if (!codeEntry) {
          return { success: false, message: '兑换码不存在，请检查后重试' };
        }

        if (codeEntry.used) {
          return { success: false, message: '该兑换码已被使用' };
        }

        const updatedCodes = get().codes.map(c =>
          c.code === codeEntry.code
            ? { ...c, used: true, usedBy: userId, usedAt: new Date().toISOString() }
            : c
        );

        set({
          codes: updatedCodes,
          redeemedByUser: [...get().redeemedByUser, codeEntry.code],
        });

        return {
          success: true,
          message: '兑换成功！',
          plan: codeEntry.plan,
          durationDays: codeEntry.durationDays,
        };
      },

      isCodeRedeemed: (code: string) => {
        return get().redeemedByUser.includes(code);
      },
    }),
    {
      name: 'redeem-storage',
    }
  )
);
