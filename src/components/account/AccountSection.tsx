"use client";

import Link from "next/link";
import { LogOut, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { User } from "@/types/user.type";
import { useLanguage } from "@/context/language/LanguageContext"; // ✅ import context

interface AccountSectionProps {
    user: User | null;
}

export default function AccountSection({ user }: AccountSectionProps) {
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage(); // ✅ get current language

    const handleLogout = () => {
        setLoading(true);
        // Simulate async logout action
        setTimeout(() => {
            setLoading(false);
            // In a real app, trigger actual logout (e.g., redirect to sign-in)
            // window.location.href = `/${language}/sign-in`;
        }, 1000);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                {language === "en" ? "Your Account" : "គណនីរបស់អ្នក"}
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />

            {user ? (
                <div className="flex flex-col items-center text-center">
                    <div className="bg-white rounded-md border border-gray-200 p-8 max-w-md w-full">
                        <h3 className="text-xl font-serif font-medium text-gray-800 mb-4">
                            {language === "en" ? `Welcome, ${user.name}` : `សូមស្វាគមន៍, ${user.name}`}
                        </h3>
                        <p className="text-base text-gray-600 mb-6 font-serif">
                            {language === "en" ? `Email: ${user.email}` : `អ៊ីមែល: ${user.email}`}
                        </p>
                        <div className="flex flex-col gap-4">
                            <Link
                                href={`/orders/${language}`}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                            >
                                <ShoppingBag className="w-4 h-4" /> {language === "en" ? "View Orders" : "មើលការបញ្ជាទិញ"}
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                                aria-disabled={loading}
                            >
                                {loading
                                    ? language === "en" ? "Logging Out..." : "កំពុងចេញ"
                                    : language === "en" ? "Log Out" : "ចាកចេញ"}{" "}
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500 text-base font-serif">
                    {language === "en"
                        ? "Please sign in to view your account details."
                        : "សូមចូលគណនីដើម្បីមើលព័ត៌មានគណនីរបស់អ្នក។"}
                </p>
            )}
        </section>
    );
}
