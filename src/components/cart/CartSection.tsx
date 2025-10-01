"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight, Plus, Minus, X } from "lucide-react"; // Added X for remove coupon
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react"; // Added useEffect
import { useCart } from "@/context/cart/CartContext";
import { coupons } from "@/data/coupons";
import { Coupon } from "@/types/coupons.type";

export default function CartSection() {
    const router = useRouter();
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

    // 🔑 Load appliedCoupon from localStorage on mount (fixes refresh reset)
    useEffect(() => {
        const saved = localStorage.getItem("appliedCoupon");
        if (saved) {
            const loadedCoupon: Coupon | null = JSON.parse(saved);
            // Re-validate on load (e.g., expiration, minAmount)
            if (loadedCoupon && validateCoupon(loadedCoupon)) {
                setAppliedCoupon(loadedCoupon);
                toast.success("Coupon loaded from previous session!");
            } else {
                localStorage.removeItem("appliedCoupon"); // Clear invalid
            }
        }
    }, []); // Empty deps: runs once on mount

    // 🔑 Helper to validate coupon (extracted for reuse on load/apply)
    const validateCoupon = (couponToValidate: Coupon): boolean => {
        if (couponToValidate.expiresAt) {
            const expires = new Date(couponToValidate.expiresAt);
            const now = new Date();
            if (now > expires) {
                toast.error("Coupon has expired");
                return false;
            }
        }
        if (couponToValidate.minAmount && total < couponToValidate.minAmount) {
            toast.error(`Minimum order amount of $${couponToValidate.minAmount} required for this coupon`);
            return false;
        }
        return true;
    };

    const handleRemoveItem = (id: number, name: string) => {
        removeFromCart(id);
        toast.success(`${name} removed from cart`, {
            style: {
                background: "#1f2937",
                color: "#ffffff",
                fontFamily: "serif",
                fontSize: "14px",
                borderRadius: "8px",
                padding: "12px",
            },
        });
    };

    const handleQuantityChange = (id: number, newQuantity: number, name: string) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
            toast.success(`${name} removed from cart`, {
                style: {
                    background: "#1f2937",
                    color: "#ffffff",
                    fontFamily: "serif",
                    fontSize: "14px",
                    borderRadius: "8px",
                    padding: "12px",
                },
            });
        } else {
            updateQuantity(id, newQuantity);
            toast.success(`Quantity updated for ${name}`, {
                style: {
                    background: "#1f2937",
                    color: "#ffffff",
                    fontFamily: "serif",
                    fontSize: "14px",
                    borderRadius: "8px",
                    padding: "12px",
                },
            });
        }
    };

    const handleCheckout = () => {
        setLoading(true);
        localStorage.setItem("appliedCoupon", JSON.stringify(appliedCoupon || null));
        setTimeout(() => {
            setLoading(false);
            toast.success("Proceeding to checkout", {
                style: {
                    background: "#1f2937",
                    color: "#ffffff",
                    fontFamily: "serif",
                    fontSize: "14px",
                    borderRadius: "8px",
                    padding: "12px",
                },
            });
            router.push("/checkout");
        }, 1000);
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let discountedTotal = total;
    if (appliedCoupon) {
        if (appliedCoupon.discountType === "percent") {
            discountedTotal -= (total * appliedCoupon.discountValue) / 100;
        } else {
            discountedTotal -= appliedCoupon.discountValue;
        }
    }

    const handleApplyCoupon = () => {
        const upperCoupon = coupon.toUpperCase();
        const foundCoupon = coupons.find((c) => c.code.toUpperCase() === upperCoupon);

        if (!foundCoupon) {
            setAppliedCoupon(null);
            localStorage.removeItem("appliedCoupon");
            toast.error("Invalid coupon code");
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
            `${foundCoupon.discountType === "percent" ? `${foundCoupon.discountValue}%` : `$${foundCoupon.discountValue}`} discount applied!`
        );
        setCoupon(""); // Clear input after success
    };

    // 🔑 New: Remove applied coupon
    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        localStorage.removeItem("appliedCoupon");
        toast.success("Coupon removed");
        setCoupon("");
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-gray-400 mb-8 sm:mb-10 text-center">
                Your Cart
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
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 640px) 80px, 96px"
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm sm:text-base font-serif font-medium text-gray-800">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                        <p className="text-xs sm:text-sm font-medium text-gray-800">
                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4">
                                    {/* Quantity controls */}
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(item.id, item.quantity - 1, item.name)
                                        }
                                        className="p-1 rounded text-black border border-gray-300 hover:bg-gray-100"
                                    >
                                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                    <span className="w-6 text-black text-center">{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(item.id, item.quantity + 1, item.name)
                                        }
                                        className="p-1 rounded text-black border border-gray-300 hover:bg-gray-100"
                                    >
                                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveItem(item.id, item.name)}
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
                                Order Summary
                            </h3>
                            {/* Coupon Input */}
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="px-4 py-2 rounded-md bg-gray-700 text-white text-sm font-medium hover:bg-gray-800"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex items-center justify-between text-xs text-green-600">
                                        <span>Applied: {appliedCoupon.code} ({appliedCoupon.discountType === "percent" ? `${appliedCoupon.discountValue}%` : `$${appliedCoupon.discountValue}`})</span>
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
                            {/* Totals */}
                            <p className="text-sm sm:text-base text-gray-600 font-serif">
                                Subtotal: ${total.toFixed(2)}
                            </p>
                            {appliedCoupon && (
                                <p className="text-sm text-green-600 font-medium">
                                    Discount Applied: -{" "}
                                    {appliedCoupon.discountType === "percent"
                                        ? `${appliedCoupon.discountValue}%`
                                        : `$${appliedCoupon.discountValue.toFixed(2)}`}
                                </p>
                            )}
                            <p className="text-base sm:text-lg font-serif font-medium text-gray-800 mt-2">
                                Total: ${discountedTotal.toFixed(2)}
                            </p>
                            <button
                                onClick={handleCheckout}
                                disabled={loading || cartItems.length === 0}
                                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed w-full"
                            >
                                {loading ? "Processing..." : "Proceed to Checkout"}{" "}
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-500 font-serif mb-4 sm:mb-6">
                        Your cart is empty.
                    </p>
                    <Link
                        href="/sale"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-800"
                    >
                        Shop Now <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                </div>
            )}
        </section>
    );
}