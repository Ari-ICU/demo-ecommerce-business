"use client";

import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product.type";
interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    const [displayCount, setDisplayCount] = useState(6);
    const [loading, setLoading] = useState(false);

    const handleViewMore = () => {
        setLoading(true);
        // Simulate async action (e.g., fetching more products)
        setTimeout(() => {
            setDisplayCount((prev) => prev + 6);
            setLoading(false);
        }, 1000);
    };

    // Slice products based on displayCount
    const displayedProducts = products.slice(0, displayCount);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                All Products
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
                    No products available at this time.
                </p>
            )}

            {/* View More Button */}
            {displayCount < products.length && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={handleViewMore}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                        aria-disabled={loading}
                    >
                        {loading ? "Loading..." : "View More"} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </section>
    );
}
