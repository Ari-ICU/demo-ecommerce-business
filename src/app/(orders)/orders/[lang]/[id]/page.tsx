"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Package, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import { orders as mockOrders } from "@/data/orders";
import { useLanguage } from "@/context/language/LanguageContext";

// Remove local OrderItem and Order interfaces and import them from types
import type { Order } from "@/types/order.type";

export default function OrderDetailPage() {
    const params = useParams();
    const { language } = useLanguage();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching order by ID; in real app, use API
        const foundOrder = mockOrders.find((o) => o.id === params.id);
        setOrder(foundOrder || null);
        setLoading(false);
    }, [params.id]);

    if (loading) {
        return (
            <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
                <div className="text-center">Loading order details...</div>
            </section>
        );
    }

    if (!order) {
        return (
            <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
                <div className="text-center text-gray-500">
                    {language === "en" ? "Order not found." : "មិនរកឃើញការបញ្ជាទិញ។"}
                </div>
                <Link
                    href={`/orders/${language}`}
                    className="mt-4 inline-flex items-center gap-2 text-gray-700 hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {language === "en" ? "Back to Orders" : "ត្រលប់ទៅការបញ្ជាទិញ"}
                </Link>
            </section>
        );
    }

    const getStatusTranslation = (status: Order["status"]) => {
        if (language === "en") return status;
        switch (status) {
            case "Delivered": return "បានដឹកជញ្ជូន";
            case "Processing": return "កំពុងដំណើរការ";
            case "Cancelled": return "បានបោះបង់";
            default: return status;
        }
    };

    const getStatusClass = (status: Order["status"]) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-700";
            case "Processing": return "bg-yellow-100 text-yellow-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-serif font-medium text-gray-800">
                            {language === "en" ? "Order Details" : "ព័ត៌មានលម្អិតការបញ្ជាទិញ"}
                        </h1>
                        <div className="flex items-center gap-2 text-gray-700 mt-1">
                            <Package className="w-4 h-4" />
                            <span className="text-sm font-medium">#{order.id}</span>
                        </div>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(order.status)}`}>
                        {getStatusTranslation(order.status)}
                    </span>
                </div>

                {/* Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                                {language === "en" ? "Order Date" : "កាលបរិច្ឆេទបញ្ជាទិញ"}: {order.date}
                            </span>
                        </div>
                        {/* Add shipping if available */}
                        {/* <div className="flex items-center gap-2 text-gray-600">
                            <Truck className="w-4 h-4" />
                            <span>Shipping: Standard Delivery</span>
                        </div> */}
                    </div>
                    <div className="space-y-4 text-right">
                        <div className="flex justify-end items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-sm">
                                {language === "en" ? "Total" : "សរុប"}: ${order.total.toFixed(2)}
                            </span>
                        </div>
                        {/* Add payment method if available */}
                        {/* <div className="text-sm text-gray-500">Payment: Credit Card ****1234</div> */}
                    </div>
                </div>

                {/* Items List */}
                <div className="mb-8">
                    <h2 className="text-lg font-serif font-medium text-gray-800 mb-4">
                        {language === "en" ? "Order Items" : "ផលិតផលក្នុងការបញ្ជាទិញ"}
                    </h2>
                    <div className="space-y-3">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-gray-50 rounded-md">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                        {language === "en" ? item.product.name.en : item.product.name.kh}
                                    </p>
                                    <p className="text-xs text-gray-600">Qty: {item.qty}</p>
                                </div>
                                <div className="text-sm font-medium text-gray-800">
                                    ${(item.product.price * item.qty).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-8">
                    <h2 className="text-lg font-serif font-medium text-gray-800 mb-4">Shipping Address</h2>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-start gap-2">
                            <div className="text-sm text-gray-600">
                                <p>John Doe</p>
                                <p>123 Main St, Phnom Penh</p>
                                <p>Cambodia</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <Link
                        href={`/orders/${language}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors flex-1 sm:flex-none"
                    >
                        {language === "en" ? "Back to Orders" : "ត្រលប់ទៅការបញ្ជាទិញ"}
                    </Link>
                    {/* Add more actions like "Reorder" or "Contact Support" */}
                    {order.status === "Delivered" && (
                        <Link
                            href={`/sale/${language}`}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex-1 sm:flex-none"
                        >
                            {language === "en" ? "Reorder" : "បញ្ជាទិញម្តងទៀត"}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}