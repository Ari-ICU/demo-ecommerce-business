import { Order } from "@/types/order.type";
import { products } from "./products";

export const orders: Order[] = [
    {
        id: "ORD-1001",
        date: "2025-09-15",
        status: "Delivered",
        total: 120.5,
        items: [
            { product: products[0], qty: 1 },
            { product: products[1], qty: 2 }, 
        ],
    },
    {
        id: "ORD-1002",
        date: "2025-09-20",
        status: "Processing",
        total: 89.99,
        items: [{ product: products[2], qty: 1 }],
    },
    {
        id: "ORD-1003",
        date: "2025-09-25",
        status: "Cancelled",
        total: 45.0,
        items: [{ product: products[4], qty: 1 }], // Sunglasses
    },
];
