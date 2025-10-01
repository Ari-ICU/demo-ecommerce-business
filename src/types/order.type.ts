import { Product } from "./product.type";

export interface OrderItem {
    product: Product;
    qty: number;
}

export interface Order {
    id: string;
    date: string;
    status: "Delivered" | "Processing" | "Cancelled";
    total: number;
    items: OrderItem[];
}
