"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useState, useRef } from "react";
import { Product } from "@/types/product.type";

interface ProductDetailSectionProps {
    product: Product;
}


export default function ProductDetailSection({ product }: ProductDetailSectionProps) {
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
    const [selectedImage, setSelectedImage] = useState(product.image);
    const toastId = useRef(0);

    // Simulated additional images (replace with actual product images in a real app)
    const productImages = [
        product.image,
        ...(product.images || [
            "/images/product-placeholder-2.jpg",
            "/images/product-placeholder-3.jpg",
            "/images/product-placeholder-4.jpg",
        ]),
    ];

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
        <div className="">
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
                    {/* Product Image with Thumbnails */}
                    <div className="lg:w-1/2">
                        <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                            <Image
                                src={selectedImage}
                                alt={product.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-opacity duration-300"
                                priority
                            />
                        </div>
                        {/* Thumbnail Gallery */}
                        <div className="flex gap-2 mt-4 overflow-x-auto">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                                        selectedImage === img ? "border-gray-700" : "border-gray-200"
                                    } hover:border-gray-500 transition-colors`}
                                    aria-label={`View image ${index + 1} of ${product.name}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-1/2">
                        <h3 className="text-2xl font-serif font-medium text-gray-200 mb-4">
                            {product.name}
                        </h3>
                        <p className="text-xl font-serif font-medium text-gray-200 mb-4">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="text-base text-gray-600 mb-6 font-serif">
                            {product.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 w-full sm:w-auto"
                                aria-disabled={loading}
                            >
                                {loading ? "Adding..." : "Add to Cart"} <ShoppingCart className="w-4 h-4" />
                            </button>
                            <Link
                                href="/collections"
                                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-400 font-serif text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to Collections
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
