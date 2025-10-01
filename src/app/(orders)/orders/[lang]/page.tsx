"use client";

import OrderHistorySection from "@/components/orders/OrderHistorySection";

export default function OrderHistoryPage() {
    return (
        <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-gray-400 mb-8 text-center">
                    Order History
                </h1>
                <OrderHistorySection />
            </div>
        </main>
    );
}
