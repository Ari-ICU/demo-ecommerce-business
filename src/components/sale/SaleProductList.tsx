"use client";

import SaleProductCard from "./SaleProductCard";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product.type";
import { useLanguage } from "@/context/language/LanguageContext";

interface SaleProductListProps {
    products: Product[];
}

export default function SaleProductList({ products }: SaleProductListProps) {
    const [displayCount, setDisplayCount] = useState(6);
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage(); // Fallback to context if needed, but prefer prop

    const currentLang =  language; 

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

    const title = currentLang === "en" ? "Sale Collection" : "ការបញ្ចេញមុន"; // Adjust translation as needed
    const noProductsMsg = currentLang === "en" ? "No sale products available at this time." : "មិនមានផលិតផលសាល់នៅពេលនេះទេ។";
    const viewMoreText = currentLang === "en" ? "View More" : "មើលបន្ថែម";
    const loadingText = currentLang === "en" ? "Loading..." : "កំពុងផ្ទុក...";

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                {title}
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
                    {noProductsMsg}
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
                        {loading ? loadingText : viewMoreText} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </section>
    );
}