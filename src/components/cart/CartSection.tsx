"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { CartItem } from "@/types/cart.type";

interface CartSectionProps {
    initialItems: CartItem[];
}

export default function CartSection({ initialItems }: CartSectionProps) {
    const router = useRouter();
    const [items, setItems] = useState<CartItem[]>(initialItems);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
    const toastId = useRef(0);

    // Show toast notification
    const showToast = (message: string) => {
        toastId.current += 1;
        setToast({ message, id: toastId.current });
        setTimeout(() => {
            setToast((current) => (current?.id === toastId.current ? null : current));
        }, 3000); // Toast disappears after 3 seconds
    };

    const handleRemoveItem = (id: number, name: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        showToast(`${name} removed from cart`);
    };

    const handleQuantityChange = (id: number, newQuantity: number, name: string) => {
        if (newQuantity < 1) return; // Prevent negative or zero quantities
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
        showToast(`Quantity updated for ${name}`);
    };

    const handleCheckout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast("Proceeding to checkout");
            router.push("/checkout"); // Redirect to checkout page
        }, 1000);
    };


    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                Your Cart
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-4 right-4 z-50 bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-300 opacity-100 font-serif text-sm">
                    {toast.message}
                </div>
            )}

            {items.length > 0 ? (
                <div className="flex flex-col gap-8">
                    {/* Cart Items */}
                    <div className="flex flex-col gap-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-6 rounded-md border border-gray-200 p-4 bg-white"
                            >
                                <div className="relative w-24 h-24">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="96px"
                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-serif font-medium text-gray-800">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        ${item.price.toFixed(2)} x {item.quantity}
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        Total: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center text-black gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                item.id,
                                                parseInt(e.target.value) || 1,
                                                item.name
                                            )
                                        }
                                        className="w-16 p-2 border border-gray-300 rounded text-center text-sm"
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(item.id, item.name)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="flex justify-end">
                        <div className="bg-white rounded-md border border-gray-200 p-6 max-w-md w-full">
                            <h3 className="text-xl font-serif font-medium text-gray-800 mb-4">
                                Order Summary
                            </h3>
                            <p className="text-base text-gray-600 mb-6 font-serif">
                                Total: ${total.toFixed(2)}
                            </p>
                            <button
                                onClick={handleCheckout}
                                disabled={loading || items.length === 0}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 w-full"
                                aria-disabled={loading || items.length === 0}
                            >
                                {loading ? "Processing..." : "Proceed to Checkout"}{" "}
                                <ArrowRight className="w-4 h-4" />
                            </button>
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
