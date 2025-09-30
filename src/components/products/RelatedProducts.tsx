"use client";

import ProductCard from "./ProductCard";
import { useEffect, useRef, useState } from "react";
import { products as allProducts } from "@/data/products";

interface RelatedProductsProps {
    currentProductId: number;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Filter out the current product and select up to 3 related products
    const relatedProducts = allProducts
        .filter((product) => product.id !== currentProductId)
        .slice(0, 3);

    // Intersection Observer for fade-in animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                Related Products
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />

            {relatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {relatedProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className={`transition-all duration-500 ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-base font-serif">
                    No related products available.
                </p>
            )}
        </section>
    );
}