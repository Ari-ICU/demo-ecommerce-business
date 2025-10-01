"use client";

import SaleProductCard from "../sale/SaleProductCard";
import { Product } from "@/types/product.type";

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
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
                        <SaleProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-base font-serif">
                    No featured products available at this time.
                </p>
            )}
        </section>
    );
}