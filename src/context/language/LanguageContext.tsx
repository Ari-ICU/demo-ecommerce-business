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

    // If the first segment exists and the second segment is the current language
    if (segments.length >= 2 && (segments[1] === "en" || segments[1] === "kh")) {
        segments[1] = newLang;

        // Special handling for /sale/[lang]/[product] to change product name
        if (segments[0] === "sale" && segments.length > 2) {
            const product = products.find(
                (p) => p.name[language] === decodeURIComponent(segments[2])
            );
            if (product) {
                segments[2] = encodeURIComponent(product.name[newLang]);
            }
        }
    } else {
        // Fallback: just add language as second segment
        segments.splice(1, 0, newLang);
    }

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
