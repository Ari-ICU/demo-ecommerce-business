"use client";

import { useState } from "react";
import { Calendar, Package, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { orders as mockOrders } from "@/data/orders";

export default function OrderHistorySection() {
    const [orders] = useState(mockOrders);

    return (
        <section className="space-y-6">
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                        {/* Order Info */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Package className="w-4 h-4" />
                                <span className="text-sm sm:text-base font-medium">
                                    {order.id}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>{order.date}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                                <DollarSign className="w-4 h-4" />
                                <span>Total: ${order.total.toFixed(2)}</span>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-500">
                                {order.items.map((i, idx) => (
                                    <span key={idx}>
                                        {i.product.name.en} x{i.qty}
                                        {idx < order.items.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>

                            <span
                                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                    order.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "Processing"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* View Details */}
                        <Link
                            href={`/orders/${order.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-700 text-white text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors self-start sm:self-center"
                        >
                            View Details <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-sm sm:text-base">
                        You have no order history yet.
                    </p>
                    <Link
                        href="/sale"
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-800"
                    >
                        Start Shopping
                    </Link>
                </div>
            )}
        </section>
    );
}
