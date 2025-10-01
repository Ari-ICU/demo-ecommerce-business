"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Package, DollarSign } from "lucide-react";
import { orders } from "@/data/orders";

export default function OrderDetailPage() {
    const { id } = useParams();
    const order = orders.find((o) => o.id === id);

    if (!order) {
        return (
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
                    Order Not Found
                </h2>
                <Link
                    href="/order-history"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Orders
                </Link>
            </section>
        );
    }

    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-400">
                    Order Details
                </h2>
                <Link
                    href="/orders"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Orders
                </Link>
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-gray-700">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-sm sm:text-base">Order ID: {order.id}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-sm sm:text-base">{order.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        <span className="text-sm sm:text-base">Total: ${order.total.toFixed(2)}</span>
                    </div>
                    <div>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                        >
                            {order.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Items */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Items</h3>
                <div className="space-y-6">
                    {order.items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                        >
                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-lg overflow-hidden">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    fill
                                    sizes="(max-width: 640px) 96px, 112px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                                    {item.product.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    ${item.product.price.toFixed(2)} × {item.qty}
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    Subtotal: ${(item.product.price * item.qty).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}