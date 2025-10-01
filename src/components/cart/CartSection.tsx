"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight, Plus, Minus, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart/CartContext";
import { useLanguage } from "@/context/language/LanguageContext";
import { coupons } from "@/data/coupons";
import { Coupon } from "@/types/coupons.type";

export default function CartSection() {
    const router = useRouter();
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let discountedTotal = total;
    if (appliedCoupon) {
        discountedTotal =
            appliedCoupon.discountType === "percent"
                ? total - (total * appliedCoupon.discountValue) / 100
                : total - appliedCoupon.discountValue;
    }

    // Load appliedCoupon from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("appliedCoupon");
        if (saved) {
            const loadedCoupon: Coupon | null = JSON.parse(saved);
            if (loadedCoupon && validateCoupon(loadedCoupon)) {
                setAppliedCoupon(loadedCoupon);
                toast.success(
                    language === "en"
                        ? "Coupon loaded from previous session!"
                        : "កូបុងត្រូវបានផ្ទុកពីប្រព័ន្ធមុន!"
                );
            } else {
                localStorage.removeItem("appliedCoupon");
            }
        }
    }, []);

    const validateCoupon = (couponToValidate: Coupon) => {
        if (couponToValidate.expiresAt) {
            const expires = new Date(couponToValidate.expiresAt);
            if (new Date() > expires) {
                toast.error(language === "en" ? "Coupon has expired" : "កូបុងបានផុតកំណត់");
                return false;
            }
        }
        if (couponToValidate.minAmount && total < couponToValidate.minAmount) {
            toast.error(
                language === "en"
                    ? `Minimum order amount of $${couponToValidate.minAmount} required for this coupon`
                    : `តម្លៃអប្បបរមា $${couponToValidate.minAmount} ត្រូវការសម្រាប់កូបុងនេះ`
            );
            return false;
        }
        return true;
    };

    const handleQuantityChange = (id: number, newQuantity: number, name: string) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
            toast.success(
                language === "en" ? `${name} removed from cart` : `${name} ត្រូវបានដកចេញពីរទេះ`
            );
        } else {
            updateQuantity(id, newQuantity);
            toast.success(
                language === "en"
                    ? `Quantity updated for ${name}`
                    : `ចំនួនត្រូវបានធ្វើបច្ចុប្បន្នសម្រាប់ ${name}`
            );
        }
    };

    const handleRemoveItem = (id: number, name: string) => {
        removeFromCart(id);
        toast.success(
            language === "en" ? `${name} removed from cart` : `${name} ត្រូវបានដកចេញពីរទេះ`
        );
    };

    const handleApplyCoupon = () => {
        const upperCoupon = coupon.toUpperCase();
        const foundCoupon = coupons.find((c) => c.code.toUpperCase() === upperCoupon);

        if (!foundCoupon) {
            setAppliedCoupon(null);
            localStorage.removeItem("appliedCoupon");
            toast.error(language === "en" ? "Invalid coupon code" : "កូដកូបុងមិនត្រឹមត្រូវ");
            return;
        }

        if (!validateCoupon(foundCoupon)) {
            setAppliedCoupon(null);
            localStorage.removeItem("appliedCoupon");
            return;
        }

        setAppliedCoupon(foundCoupon);
        localStorage.setItem("appliedCoupon", JSON.stringify(foundCoupon));
        toast.success(
            language === "en"
                ? `${foundCoupon.discountType === "percent" ? `${foundCoupon.discountValue}%` : `$${foundCoupon.discountValue}`} discount applied!`
                : `កាតព្វកិច្ចបានអនុវត្ត!`
        );
        setCoupon("");
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        localStorage.removeItem("appliedCoupon");
        toast.success(language === "en" ? "Coupon removed" : "កូបុងត្រូវបានដកចេញ");
        setCoupon("");
    };

    const handleCheckout = () => {
        setLoading(true);
        localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon || null));
        setTimeout(() => {
            setLoading(false);
            toast.success(language === "en" ? "Proceeding to checkout" : "កំពុងទៅកាន់ការទូទាត់");
            router.push(`/checkout/${language}`);
        }, 1000);
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-gray-400 mb-8 sm:mb-10 text-center">
                {language === "en" ? "Your Cart" : "រទេះរបស់អ្នក"}
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-8 sm:mb-12" />
            {cartItems.length > 0 ? (
                <div className="flex flex-col gap-6 sm:gap-8">
                    {/* Cart Items */}
                    <div className="flex flex-col gap-4 sm:gap-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-md border border-gray-200 p-4 bg-white"
                            >
                                <div className="flex-1 flex items-center gap-4 sm:gap-6">
                                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name[language]}
                                            fill
                                            sizes="(max-width: 640px) 80px, 96px"
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Link
                                            href={`/sale/${language}/${encodeURIComponent(item.name[language])}`}
                                            className="text-sm sm:text-base font-serif font-medium text-gray-800 hover:underline"
                                        >
                                            {item.name[language]}
                                        </Link>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                        <p className="text-xs sm:text-sm font-medium text-gray-800">
                                            {language === "en" ? "Total" : "សរុប"}: ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.name[language])}
                                        className="p-1 rounded text-black border border-gray-300 hover:bg-gray-100"
                                    >
                                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                    <span className="w-6 text-black text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.name[language])}
                                        className="p-1 rounded text-black border border-gray-300 hover:bg-gray-100"
                                    >
                                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveItem(item.id, item.name[language])}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        aria-label={`Remove ${item.name}`}
                                    >
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="flex justify-end">
                        <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6 w-full sm:max-w-md">
                            <h3 className="text-lg sm:text-xl font-serif font-medium text-gray-800 mb-4">
                                {language === "en" ? "Order Summary" : "សង្ខេបការកម្មង់"}
                            </h3>
                            {/* Coupon Input */}
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder={language === "en" ? "Enter coupon code" : "បញ្ចូលកូដកូបុង"}
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-800"
                                    >
                                        {language === "en" ? "Apply" : "អនុវត្ត"}
                                    </button>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex items-center justify-between text-xs text-green-600">
                                        <span>
                                            {language === "en" ? "Applied" : "បានអនុវត្ត"}: {appliedCoupon.code} (
                                            {appliedCoupon.discountType === "percent"
                                                ? `${appliedCoupon.discountValue}%`
                                                : `$${appliedCoupon.discountValue}`}
                                            )
                                        </span>
                                        <button
                                            onClick={handleRemoveCoupon}
                                            className="text-green-600 hover:text-green-800 p-1"
                                            aria-label="Remove coupon"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 font-serif">
                                {language === "en" ? "Subtotal" : "សរុប"}: ${total.toFixed(2)}
                            </p>
                            {appliedCoupon && (
                                <p className="text-sm text-green-600 font-medium">
                                    {language === "en" ? "Discount Applied" : "ការបញ្ចុះតម្លៃ"}:{" "}
                                    {appliedCoupon.discountType === "percent"
                                        ? `${appliedCoupon.discountValue}%`
                                        : `$${appliedCoupon.discountValue.toFixed(2)}`}
                                </p>
                            )}
                            <p className="text-base sm:text-lg font-serif font-medium text-gray-800 mt-2">
                                {language === "en" ? "Total" : "សរុប"}: ${discountedTotal.toFixed(2)}
                            </p>

                            <button
                                onClick={handleCheckout}
                                disabled={loading || cartItems.length === 0}
                                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed w-full"
                            >
                                {loading
                                    ? language === "en"
                                        ? "Processing..."
                                        : "កំពុងដំណើរការ..."
                                    : language === "en"
                                        ? "Proceed to Checkout"
                                        : "ទៅកាន់ការទូទាត់"}{" "}
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-500 font-serif mb-4 sm:mb-6">
                        {language === "en" ? "Your cart is empty." : "រទេះរបស់អ្នកគ្មានផលិតផល។"}
                    </p>
                    <Link
                        href={`/sale/${language}`}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-800"
                    >
                        {language === "en" ? "Shop Now" : "ទិញឥឡូវ"} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                </div>
            )}
        </section>
    );
}
