"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useState, useRef } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

interface ProductDetailSectionProps {
    product: Product;
}

export default function ProductDetailSection({ product }: ProductDetailSectionProps) {
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

    const handleAddToCart = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast(`${product.name} added to cart`);
            // In a real app, add product to cart (e.g., via state management)
            // addToCart({ ...product, quantity: 1 });
        }, 1000);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                Product Details
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />

            {/* Toast Notification */}
            {toast && (
                <div className="fixed top-4 right-4 z-50 bg-gray-700 text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-300 opacity-100 font-serif text-sm">
                    {toast.message}
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Image */}
                <div className="lg:w-1/2">
                    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="lg:w-1/2">
                    <h3 className="text-2xl font-serif font-medium text-gray-300 mb-4">
                        {product.name}
                    </h3>
                    <p className="text-xl font-serif font-medium text-gray-300 mb-4">
                        ${product.price.toFixed(2)}
                    </p>
                    <p className="text-base text-gray-600 mb-6 font-serif">
                        {product.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 w-full lg:w-auto"
                            aria-disabled={loading}
                        >
                            {loading ? "Adding..." : "Add to Cart"} <ShoppingCart className="w-4 h-4" />
                        </button>
                        <Link
                            href="/collections"
                            className="inline-flex items-center gap-2 text-gray-100 hover:text-gray-400 font-serif text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Collections
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
