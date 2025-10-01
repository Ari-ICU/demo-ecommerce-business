"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [language, setLanguage] = useState<"en" | "kh">("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("siteLanguage") as "en" | "kh" | null;
        if (savedLang) setLanguage(savedLang);
    }, []);


    return (
        <section className="flex flex-col items-center justify-center text-center min-h-screen px-6 py-24 bg-gradient-to-b from-white to-gray-100">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 tracking-tight mb-6">
                {language === "en" ? "Page Not Found" : "មិនមានទំព័រនេះទេ"}
            </h1>
            <div className="w-16 h-0.5 bg-gray-300 mb-8" />
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-8 font-serif">
                {language === "en"
                    ? "Sorry, we couldn’t find the page you’re looking for. It may have been moved or no longer exists."
                    : "សូមទោស! មិនអាចរកទំព័រដែលអ្នកកំពុងស្វែងរកបានទេ។ វាអាចត្រូវបានផ្លាស់ទី ឬមិនមានស្ថិតនៅឡើយ។"}
            </p>
            <Link
                href={`/${language}`}
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
                <ArrowLeft className="w-4 h-4" /> {language === "en" ? "Return to Home" : "ត្រលប់ទៅទំព័រដើម"}
            </Link>
        </section>
    );
}
