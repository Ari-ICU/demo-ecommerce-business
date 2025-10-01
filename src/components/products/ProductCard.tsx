"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/product.type";


interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void; // optional callback
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const [adding, setAdding] = useState(false);

    const handleAddToCart = () => {
        if (onAddToCart) {
            setAdding(true);
            onAddToCart(product);
            setTimeout(() => setAdding(false), 800); // reset after animation
        }
    };

    return (
        <div className="group flex flex-col rounded-md border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 w-full bg-white">
            {/* Image Section */}
            <Link  href={`/collections/${encodeURIComponent(product.name)}`} className="relative w-full aspect-[4/3] block overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-300 ease-in-out"
                    priority={product.id === 1}
                />
            </Link>

            {/* Info Section */}
            <div className="p-5 flex flex-col gap-3">
                <h3 className="text-base sm:text-lg font-serif font-medium text-gray-800 truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium">${product.price.toFixed(2)}</p>
                {product.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={adding}
                    className="mt-4 px-6 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {adding ? "Adding..." : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}