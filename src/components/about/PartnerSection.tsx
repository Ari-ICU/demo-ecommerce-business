"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Partner } from "@/types/partner.type";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons

// Sample partner data
const partners: Partner[] = [
    {
        id: 1,
        name: "Luxury Threads",
        logo: "/images/partner-luxury-threads.jpg",
        description: "Premium fabric supplier for our signature collections.",
    },
    {
        id: 2,
        name: "Artisan Crafts",
        logo: "/images/partner-artisan-crafts.jpg",
        description: "Handcrafted accessories for timeless elegance.",
    },
    {
        id: 3,
        name: "Eco Fibers",
        logo: "/images/partner-eco-fibers.jpg",
        description: "Sustainable materials for eco-conscious fashion.",
    },
];

export default function PartnerSection() {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-slide every 4s
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
            () => setCurrent((prev) => (prev + 1) % partners.length),
            4000
        );
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current]);

    return (
        <section className="py-16 px-6 max-w-5xl mx-auto relative">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                Our Partners
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />

            {/* Carousel wrapper */}
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-700"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="min-w-full flex flex-col items-center text-center rounded-md border border-gray-200 p-6 bg-white"
                        >
                            <div className="relative w-32 h-32 mb-4">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    sizes="128px"
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-base font-serif font-medium text-gray-800 mb-2">
                                {partner.name}
                            </h3>
                            {partner.description && (
                                <p className="text-sm text-gray-500">{partner.description}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {partners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full ${current === index ? "bg-gray-800" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows with Icons (hidden on mobile) */}
                <button
                    onClick={() =>
                        setCurrent((prev) => (prev - 1 + partners.length) % partners.length)
                    }
                    className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setCurrent((prev) => (prev + 1) % partners.length)}
                    className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

            </div>
        </section>
    );
}
