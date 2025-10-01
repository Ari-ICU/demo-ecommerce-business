"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language/LanguageContext";

export default function Footer() {
    const { language } = useLanguage(); // ✅ global language

    return (
        <footer className="mt-auto border-t border-border bg-background/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    {/* Brand / About */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">YourBrand</h3>
                        <p className="text-muted-foreground">
                            {language === "en"
                                ? "Premium products crafted with care. Discover style, comfort, and innovation."
                                : "ផលិតផលគុណភាព ដែលបានផលិតដោយប្រុងប្រយ័ត្ន។ ស្វែងរករចនាបថ, សម្រស់ និងភាពច្នៃប្រឌិត។"}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">
                            {language === "en" ? "Quick Links" : "តំណរយ៉ាងឆាប់រហ័ស"}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`/${language}/sale`} className="hover:underline">
                                    {language === "en" ? "Sale" : "បញ្ចុះតម្លៃ"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${language}/about`} className="hover:underline">
                                    {language === "en" ? "About Us" : "អំពីយើង"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${language}/contact`} className="hover:underline">
                                    {language === "en" ? "Contact" : "ទំនាក់ទំនង"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">
                            {language === "en" ? "Customer Service" : "សេវាកម្មអតិថិជន"}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`/${language}/account`} className="hover:underline">
                                    {language === "en" ? "My Account" : "គណនីរបស់ខ្ញុំ"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${language}/orders`} className="hover:underline">
                                    {language === "en" ? "Orders" : "ការកម្មង់"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${language}/shipping`} className="hover:underline">
                                    {language === "en" ? "Shipping & Returns" : "ការដឹកជញ្ជូន និងការបង្វិល"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${language}/faq`} className="hover:underline">
                                    {language === "en" ? "FAQ" : "សំណួរញឹកញាប់"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">
                            {language === "en" ? "Stay Updated" : "ទទួលបានព័ត៌មានថ្មីៗ"}
                        </h3>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder={language === "en" ? "Enter your email" : "បញ្ចូលអ៊ីមែលរបស់អ្នក"}
                                className="flex-1 px-3 py-2 rounded-md border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
                            >
                                {language === "en" ? "Subscribe" : "ជាវ"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
                    <p>
                        {language === "en"
                            ? `© ${new Date().getFullYear()} YourBrand. All rights reserved.`
                            : `© ${new Date().getFullYear()} YourBrand. សិទ្ធិគ្រប់យ៉ាងបានរក្សា។`}
                    </p>
                    <div className="flex gap-4 mt-2 sm:mt-0">
                        <Link href={`/${language}/privacy`} className="hover:underline">
                            {language === "en" ? "Privacy Policy" : "គោលការណ៍ឯកជនភាព"}
                        </Link>
                        <Link href={`/${language}/terms`} className="hover:underline">
                            {language === "en" ? "Terms of Service" : "លក្ខខណ្ឌសេវា"}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
