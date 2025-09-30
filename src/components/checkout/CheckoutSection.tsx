"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import { CartItem } from "@/types/cart.type";

interface CheckoutSectionProps {
    initialItems: CartItem[];
}

export default function CheckoutSection({ initialItems }: CheckoutSectionProps) {
    const [items] = useState<CartItem[]>(initialItems);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
    const toastId = useRef(0);

    // Form state
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
    });

    // Show toast notification
    const showToast = (message: string) => {
        toastId.current += 1;
        setToast({ message, id: toastId.current });
        setTimeout(() => {
            setToast((current) => (current?.id === toastId.current ? null : current));
        }, 3000);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleConfirmOrder = () => {
        // Basic form validation
        if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
            showToast("Please fill out all fields");
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast("Order confirmed successfully!");
            // In a real app, process payment and redirect to order confirmation
            // window.location.href = "/order-confirmation";
        }, 1000);
    };

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                Checkout
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-4 right-4 z-50 bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-300 opacity-100 font-serif text-sm">
                    {toast.message}
                </div>
            )}

            {items.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Order Summary */}
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-serif font-medium text-gray-400 mb-4">
                            Order Summary
                        </h3>
                        <div className="bg-white rounded-md border border-gray-200 p-6 mb-6">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0"
                                >
                                    <div className="relative w-16 h-16">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="64px"
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base font-serif font-medium text-gray-800">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                        <p className="text-sm font-medium text-gray-800">
                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <p className="text-base font-serif font-medium text-gray-800 mt-4">
                                Order Total: ${total.toFixed(2)}
                            </p>
                        </div>
                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 text-gray-300 hover:text-gray-800 font-serif text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Cart
                        </Link>
                    </div>

                    {/* Checkout Form */}
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-serif font-medium text-gray-400 mb-4">
                            Shipping & Billing Details
                        </h3>
                        <div className="bg-white rounded-md border border-gray-200 p-6">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="block text-sm font-serif text-gray-600 mb-1"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-serif text-gray-600 mb-1"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                        placeholder="john.doe@example.com"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-serif text-gray-600 mb-1"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                        placeholder="123 Main St"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-serif text-gray-600 mb-1"
                                        >
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label
                                            htmlFor="postalCode"
                                            className="block text-sm font-serif text-gray-600 mb-1"
                                        >
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                            placeholder="10001"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleConfirmOrder}
                                    disabled={loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 w-full mt-4"
                                    aria-disabled={loading}
                                >
                                    {loading ? "Processing..." : "Confirm Order"} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-base text-gray-500 font-serif mb-6">
                        Your cart is empty.
                    </p>
                    <Link
                        href="/collections"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                        Shop Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </section>
    );
}
