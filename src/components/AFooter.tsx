"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto border-t border-border bg-background/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    {/* Brand / About */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">YourBrand</h3>
                        <p className="text-muted-foreground">
                            Premium products crafted with care. Discover style, comfort, and innovation.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/collections" className="hover:underline">
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link href="/sale" className="hover:underline">
                                    Sale
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:underline">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Customer Service</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/account" className="hover:underline">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="hover:underline">
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:underline">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:underline">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-3">Stay Updated</h3>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-3 py-2 rounded-md border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 sm:mt-0">
                        <Link href="/privacy" className="hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:underline">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
