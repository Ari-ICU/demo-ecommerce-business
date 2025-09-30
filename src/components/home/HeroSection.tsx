"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
    const [loading, setLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Placeholder image URLs (replace with actual image URLs)
    const slides = [
        "https://via.placeholder.com/1920x1080?text=Slide+1",
        "https://via.placeholder.com/1920x1080?text=Slide+2",
        "https://via.placeholder.com/1920x1080?text=Slide+3",
    ];

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleClick = () => {
        setLoading(true);
        // Simulate async action (e.g., navigation or API call)
        setTimeout(() => setLoading(false), 1000);
    };

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 min-h-[80vh] overflow-hidden">
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ backgroundImage: `url(${slide})` }}
                    />
                ))}
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800/40 to-gray-100/60" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-white tracking-tight mb-6">
                    Welcome to <span className="text-gray-200">YourBrand</span>
                </h1>
                <div className="w-16 h-0.5 bg-gray-300 mb-8 mx-auto" />
                <p className="text-base md:text-lg text-gray-200 max-w-3xl mb-8 font-serif">
                    Discover the latest collections, exclusive sales, and timeless styles crafted just for you.
                </p>
                <Link
                    href="/collections"
                    onClick={handleClick}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-disabled={loading}
                >
                    {loading ? "Loading..." : "Shop Now"} <ArrowRight className="w-4 h-4" />
                </Link>
                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentSlide ? "bg-gray-200" : "bg-gray-400/50 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}