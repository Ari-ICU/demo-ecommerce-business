"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Product } from "@/types/product.type";
import { CartItem } from "@/types/cart.type";
import { useCart } from "@/context/cart/CartContext";

interface SaleProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void; // Optional callback
}

export default function SaleProductCard({ product, onAddToCart }: SaleProductCardProps) {
    const [adding, setAdding] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        setAdding(true);
        const cartItem: CartItem = { ...product, quantity: 1 };
        addToCart(cartItem);
        if (onAddToCart) {
            onAddToCart(product);
        }
        setTimeout(() => {
            setAdding(false);
            toast.success(`${product.name} added to cart ✅`);
        }, 800); // Reset after animation
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="group flex flex-col rounded-md border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 w-full bg-white">
            {/* Image Section */}
            <Link
                href={`/sale/${encodeURIComponent(product.name)}`}
                className="relative w-full aspect-[4/3] block overflow-hidden"
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-300 ease-in-out"
                    priority={product.id === 1}
                />
                {/* Discount Badge */}
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {discount}% OFF
                </div>
            </Link>

            {/* Info Section */}
            <div className="p-5 flex flex-col gap-3">
                <h3 className="text-base sm:text-lg font-serif font-medium text-gray-800 truncate">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600 font-medium">${product.price.toFixed(2)}</p>
                    {product.originalPrice !== undefined && (
                        <p className="text-sm text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </p>
                    )}
                </div>
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