"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { products } from "@/data/products"; // Import products for name lookup

type Language = "en" | "kh";

interface LanguageContextType {
    language: Language;
    switchLanguage: () => void;
    setLanguage: (lang: Language) => void; // <-- add this
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("siteLanguage") as Language | null;
        if (savedLang) setLanguage(savedLang);
    }, []);

    const switchLanguage = () => {
    const newLang: Language = language === "en" ? "kh" : "en";
    setLanguage(newLang);
    localStorage.setItem("siteLanguage", newLang);

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
        // Root page "/" → just add language
        router.push(`/${newLang}`);
        return;
    }

    // Home page like "/en" or "/kh"
    if (segments.length === 1 && (segments[0] === "en" || segments[0] === "kh")) {
        segments[0] = newLang;
        router.push("/" + segments.join("/"));
        return;
    }

    // Other pages
    if (segments.length >= 2 && (segments[1] === "en" || segments[1] === "kh")) {
        segments[1] = newLang;

        // Special handling for /sale/[lang]/[product]
        if (segments[0] === "sale" && segments.length > 2) {
            const product = products.find(
                (p) => p.name[language] === decodeURIComponent(segments[2])
            );
            if (product) {
                segments[2] = encodeURIComponent(product.name[newLang]);
            }
        }
        router.push("/" + segments.join("/"));
        return;
    }

    // Fallback for other pages without language
    segments.unshift(newLang);
    router.push("/" + segments.join("/"));
};



    return (
        <LanguageContext.Provider value={{ language, switchLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};


// Hook to use in components
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};