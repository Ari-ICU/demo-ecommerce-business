"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function AboutSection() {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        // Simulate async action (e.g., navigation)
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-6">
                About YourBrand
            </h1>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-8" />
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8 font-serif">
                At YourBrand, we are dedicated to crafting timeless, high-quality fashion that blends elegance with comfort. 
                Our collections are designed with meticulous attention to detail, drawing inspiration from classic styles 
                to create pieces that remain stylish for years to come. Discover our story and join us in celebrating 
                sophistication and craftsmanship.
            </p>
            <Link
                href="/collections"
                onClick={handleClick}
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                aria-disabled={loading}
            >
                {loading ? "Loading..." : "Shop Now"} <ArrowRight className="w-4 h-4" />
            </Link>
        </section>
    );
}
