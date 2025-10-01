"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Product } from "@/types/product.type";
import { CartItem } from "@/types/cart.type";
import { useCart } from "@/context/cart/CartContext";
import { useLanguage } from "@/context/language/LanguageContext"; // import your hook

interface ProductDetailSectionProps {
    product: Product;
}

export default function ProductDetailSection({ product }: ProductDetailSectionProps) {
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(product.image);
    const { addToCart } = useCart();
    const { language } = useLanguage(); // global language

    // Simulated additional images (replace with actual product images in a real app)
    const productImages = [
        product.image,
        ...(product.images || [
            "/images/product-placeholder-2.jpg",
            "/images/product-placeholder-3.jpg",
            "/images/product-placeholder-4.jpg",
        ]),
    ];

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        setLoading(true);
        const cartItem: CartItem = { 
            ...product, 
            name: product.name, 
            quantity: 1 
        };
        addToCart(cartItem);
        setTimeout(() => {
            setLoading(false);
            toast.success(
                language === "en"
                    ? `${product.name.en} added to cart ✅`
                    : `${product.name.kh} បានបន្ថែមទៅក្នុងរទេះ ✅`
            );
        }, 1000);
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                {language === "en" ? "Product Details" : "ព័ត៌មានលម្អិតផលិតផល"}
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Image with Thumbnails */}
                <div className="lg:w-1/2">
                    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                        <Image
                            src={selectedImage}
                            alt={product.name[language]}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-opacity duration-300"
                            priority
                        />
                    </div>
                    {/* Thumbnail Gallery */}
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                        {productImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(img)}
                                className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                                    selectedImage === img ? "border-gray-700" : "border-gray-200"
                                } hover:border-gray-500 transition-colors`}
                                aria-label={`View image ${index + 1} of ${product.name[language]}`}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.name[language]} thumbnail ${index + 1}`}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="lg:w-1/2">
                    <h3 className="text-2xl font-serif font-medium text-gray-200 mb-4">
                        {product.name[language]}
                    </h3>
                    
                    <div className="mb-6">
                        {product.originalPrice && discount > 0 && (
                            <span className="inline-block text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full mb-3">
                                {discount}% OFF
                            </span>
                        )}
                        <div className="flex items-baseline gap-4">
                            <p className="text-3xl font-serif font-bold text-gray-100">
                                ${product.price.toFixed(2)}
                            </p>
                            {product.originalPrice && (
                                <p className="text-xl font-serif text-gray-500 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </p>
                            )}
                        </div>
                    </div>

                    <p className="text-base text-gray-600 mb-6 font-serif">
                        {product.description?.[language]}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 w-full sm:w-auto"
                            aria-disabled={loading}
                        >
                            {loading
                                ? language === "en" ? "Adding..." : "កំពុងបន្ថែម..."
                                : language === "en" ? "Add to Cart" : "បន្ថែមទៅរទេះ"}{" "}
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                        <Link
                            href={`/${language}/sale`}
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-400 font-serif text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" /> {language === "en" ? "Back to Collections" : "ត្រឡប់ទៅកាន់ការប្រមូល"}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
