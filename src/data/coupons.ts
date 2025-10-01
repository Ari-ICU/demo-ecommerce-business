// /data/coupons.ts
import { Coupon } from "@/types/coupons.type";

export const coupons: Coupon[] = [
    {
        code: "SAVE10",
        discountType: "percent",
        discountValue: 10,
        minAmount: 50,
        expiresAt: "2025-12-31T23:59:59Z",
    },
    {
        code: "SAVE20",
        discountType: "percent",
        discountValue: 20,
        minAmount: 100,
    },
    {
        code: "WELCOME5",
        discountType: "fixed",
        discountValue: 5,
    },
];
