"use client";

import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product.type";

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        // Simulate async action (e.g., navigation)
        setTimeout(() => setLoading(false), 1000);
    };

    // Limit to first 6 products
    const displayedProducts = products.slice(0, 6);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                Featured Products
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />

            {displayedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-base font-serif">
                    No featured products available at this time.
                </p>
            )}

            {/* See More Button */}
            {products.length > 6 && (
                <div className="flex justify-center mt-12">
                    <Link
                        href="/collections"
                        onClick={handleClick}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                        aria-disabled={loading}
                    >
                        {loading ? "Loading..." : "See More"} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </section>
    );
}