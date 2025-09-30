"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-24 bg-gradient-to-b from-white to-gray-100">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 tracking-tight mb-6">
                Page Not Found
            </h1>
            <div className="w-16 h-0.5 bg-gray-300 mb-8" />
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-8 font-serif">
                Sorry, we couldn’t find the page you’re looking for. It may have been moved or no longer exists.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
                <ArrowLeft className="w-4 h-4" /> Return to Home
            </Link>
        </section>
    );
}