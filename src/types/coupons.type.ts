export interface Coupon {
    code: string;          
    discountType: "percent" | "fixed"; // type of discount
    discountValue: number;  // discount value (10 means 10% or $10 depending on type)
    minAmount?: number;     // optional minimum order amount
    expiresAt?: string;     // optional expiration date (ISO string)
}