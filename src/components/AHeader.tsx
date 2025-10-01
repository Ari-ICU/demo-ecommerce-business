"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { User, ShoppingCart, Store, Search, Menu, X, Percent, Info, Globe } from "lucide-react";
import { useCart } from "@/context/cart/CartContext";

export default function AHeader() {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 🌍 Language state
    const [language, setLanguage] = useState<"en" | "kh">("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("siteLanguage") as "en" | "kh" | null;
        if (savedLang) setLanguage(savedLang);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const switchLanguage = () => {
        const newLang = language === "en" ? "kh" : "en";
        setLanguage(newLang);
        localStorage.setItem("siteLanguage", newLang);
        // ❗ If you use translations, trigger rerender or redirect here
    };

    return (
        <header className="w-full border-b border-black/5 dark:border-white/8 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: logo + nav */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Store className="w-6 h-6 text-foreground" />
                            <span className="font-bold text-lg">YourBrand</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
                            <Link href="/sale" className="flex items-center gap-2 hover:underline">
                                <Percent className="w-5 h-5" />
                                {language === "en" ? "Sale" : "បញ្ចុះតម្លៃ"}
                            </Link>
                            <Link href="/about" className="flex items-center gap-2 hover:underline">
                                <Info className="w-5 h-5" />
                                {language === "en" ? "About" : "អំពីយើង"}
                            </Link>
                        </nav>
                    </div>

                    {/* Center: search */}
                    <div className="flex-1 px-2 sm:px-4 max-w-2xl hidden md:block">
                        <form className="w-full">
                            <label htmlFor="search" className="sr-only">
                                {language === "en" ? "Search products" : "ស្វែងរកផលិតផល"}
                            </label>
                            <div className="relative">
                                <input
                                    id="search"
                                    name="search"
                                    type="search"
                                    placeholder={language === "en" ? "Search products..." : "ស្វែងរកផលិតផល..."}
                                    className="w-full rounded-full border border-black/[.08] dark:border-white/[.06] py-2 pl-4 pr-10 text-sm bg-white/80 dark:bg-black/6 focus:outline-none focus:ring-2 focus:ring-foreground"
                                />
                                <button
                                    type="submit"
                                    aria-label="Search"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-sm"
                                >
                                    <Search className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right: account + cart + language + mobile menu toggle */}
                    <div className="flex items-center gap-4">
                        {/* Language Switch */}
                        <button
                            onClick={switchLanguage}
                            className="flex items-center gap-1 text-sm hover:underline"
                        >
                            <Globe className="w-5 h-5" />
                            {language === "en" ? "EN" : "KH"}
                        </button>

                        <Link href="/account" className="hidden sm:inline-flex items-center gap-2 text-sm hover:underline">
                            <User className="w-5 h-5" />
                            <span className="hidden md:inline">{language === "en" ? "Account" : "គណនី"}</span>
                        </Link>

                        <Link href="/cart" className="relative inline-flex items-center">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full bg-foreground text-background text-xs w-5 h-5">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu toggle */}
                        <button className="lg:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-black/5 dark:border-white/8">
                        <nav className="flex flex-col p-4 gap-4 text-sm text-muted-foreground">
                            <form className="w-full">
                                <label htmlFor="mobile-search" className="sr-only">
                                    {language === "en" ? "Search products" : "ស្វែងរកផលិតផល"}
                                </label>
                                <div className="relative">
                                    <input
                                        id="mobile-search"
                                        name="mobile-search"
                                        type="search"
                                        placeholder={language === "en" ? "Search products..." : "ស្វែងរកផលិតផល..."}
                                        className="w-full rounded-full border border-black/[.08] dark:border-white/[.06] py-2 pl-4 pr-10 text-sm bg-white/80 dark:bg-black/6 focus:outline-none focus:ring-2 focus:ring-foreground"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Search"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-sm"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                            <Link href="/account" className="flex items-center gap-2 hover:underline" onClick={toggleMenu}>
                                <User className="w-5 h-5" />
                                {language === "en" ? "Account" : "គណនី"}
                            </Link>
                            <Link href="/sale" className="flex items-center gap-2 hover:underline" onClick={toggleMenu}>
                                <Percent className="w-5 h-5" />
                                {language === "en" ? "Sale" : "បញ្ចុះតម្លៃ"}
                            </Link>
                            <Link href="/about" className="flex items-center gap-2 hover:underline" onClick={toggleMenu}>
                                <Info className="w-5 h-5" />
                                {language === "en" ? "About" : "អំពីយើង"}
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
