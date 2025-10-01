"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/language/LanguageContext";

export default function AboutSection() {
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage(); // ✅ get current language

    const handleClick = () => {
        setLoading(true);
        // Simulate async action (e.g., navigation)
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-6">
                {language === "en" ? "About YourBrand" : "អំពី YourBrand"}
            </h1>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-8" />
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-8 font-serif">
                {language === "en"
                    ? "At YourBrand, we are dedicated to crafting timeless, high-quality fashion that blends elegance with comfort. Our collections are designed with meticulous attention to detail, drawing inspiration from classic styles to create pieces that remain stylish for years to come. Discover our story and join us in celebrating sophistication and craftsmanship."
                    : "នៅ YourBrand យើងផ្តោតសំខាន់លើការបង្កើតម៉ូដដែលមានគុណភាពខ្ពស់ និងមានស្ទីលដោយរួមបញ្ចូលភាពស្រស់ស្អាត និងភាពស្រួលស្រាយ។ ការប្រមូលផ្តុំរបស់យើងត្រូវបានរចនាឡើងដោយប្រុងប្រយ័ត្ន ដើម្បីបង្កើតស្ទីលដែលនៅតែទាក់ទាញរយៈពេលវែង។ ស្វែងរករឿងរ៉ាវរបស់យើង និងចូលរួមអបអរសាទរភាពឆ្នើម និងការច្នៃប្រឌិត។"}
            </p>
            <Link
                href={`/sale/${language}`}
                onClick={handleClick}
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                aria-disabled={loading}
            >
                {loading
                    ? language === "en" ? "Loading..." : "កំពុងផ្ទុក..."
                    : language === "en" ? "Shop Now" : "ទិញឥឡូវនេះ"} 
                <ArrowRight className="w-4 h-4" />
            </Link>
        </section>
    );
}
