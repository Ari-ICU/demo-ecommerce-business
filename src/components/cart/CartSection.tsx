"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { useCart } from "@/context/cart/CartContext";

export default function CartSection() {
    const router = useRouter();
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
    const toastId = useRef(0);

    // Show toast notification
    const showToast = (message: string) => {
        toastId.current += 1;
        setToast({ message, id: toastId.current });
        setTimeout(() => {
            setToast((current) => (current?.id === toastId.current ? null : current));
        }, 3000);
    };

    const handleRemoveItem = (id: number, name: string) => {
        removeFromCart(id);
        showToast(`${name} removed from cart`);
    };

    const handleQuantityChange = (id: number, newQuantity: number, name: string) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
            showToast(`${name} removed from cart`);
        } else {
            updateQuantity(id, newQuantity);
            showToast(`Quantity updated for ${name}`);
        }
    };

    const handleCheckout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast("Proceeding to checkout");
            router.push("/checkout");
        }, 1000);
    };

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-gray-800 mb-8 sm:mb-10 text-center">
                Your Cart
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-8 sm:mb-12" />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-4 right-4 z-50 bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-300 opacity-100 font-serif text-sm">
                    {toast.message}
                </div>
            )}

            {cartItems.length > 0 ? (
                <div className="flex flex-col gap-6 sm:gap-8">
                    {/* Cart Items */}
                    <div className="flex flex-col gap-4 sm:gap-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-md border border-gray-200 p-4 bg-white"
                            >
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="(max-width: 640px) 80px, 96px"
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm sm:text-base font-serif font-medium text-gray-800">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        ${item.price.toFixed(2)} x {item.quantity}
                                    </p>
                                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                                        Total: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center text-black gap-2 sm:gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                item.id,
                                                parseInt(e.target.value) || 0,
                                                item.name
                                            )
                                        }
                                        className="w-14 sm:w-16 p-1 sm:p-2 border border-gray-300 rounded text-center text-xs sm:text-sm"
                                    />

                                    <button
                                        onClick={() => handleRemoveItem(item.id, item.name)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="flex justify-end">
                        <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6 w-full sm:max-w-md">
                            <h3 className="text-lg sm:text-xl font-serif font-medium text-gray-800 mb-4">
                                Order Summary
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 font-serif">
                                Total: ${total.toFixed(2)}
                            </p>
                            <button
                                onClick={handleCheckout}
                                disabled={loading || cartItems.length === 0}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 w-full"
                                aria-disabled={loading || cartItems.length === 0}
                            >
                                {loading ? "Processing..." : "Proceed to Checkout"}{" "}
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-500 font-serif mb-4 sm:mb-6">
                        Your cart is empty.
                    </p>
                    <Link
                        href="/collections"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                        Shop Now <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                </div>
            )}
        </section>
    );
}
