"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/context/cart/CartContext";
import { locationData } from "@/data/checkout";
import { Coupon } from "@/types/coupons.type";

type FormData = {
    fullName: string;
    phone: string;
    city: string;
    district: string;
    delivery: string;
    paymentMethod?: string;
};

export default function CheckoutSection() {
    const { cartItems } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        phone: "",
        city: "",
        district: "",
        delivery: "",
        paymentMethod: "",
    });
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("appliedCoupon");
        if (saved) {
            setAppliedCoupon(JSON.parse(saved));
        }
    }, []);

    const availableDistricts = useMemo(() => {
        if (!formData.city) return [];
        return locationData[formData.city as keyof typeof locationData]?.districts || [];
    }, [formData.city]);

    const availableDeliveryOptions = useMemo(() => {
        if (!formData.city) return [];
        return locationData[formData.city as keyof typeof locationData]?.delivery || [];
    }, [formData.city]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "city") {
            setFormData((prev) => ({ ...prev, district: "", delivery: "" }));
        }
    };

    const handleConfirmOrder = () => {
        const { fullName, phone, city, district, delivery, paymentMethod } = formData;
        if (!fullName || !phone || !city || !district || !delivery || !paymentMethod) {
            toast.error("Please fill out all fields");
            return;
        }
        const orderData = { ...formData, cartItems, appliedCoupon };
        localStorage.setItem("checkoutOrder", JSON.stringify(orderData));
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Order confirmed successfully!");
        }, 1000);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let discountedTotal = subtotal;
    if (appliedCoupon) {
        if (appliedCoupon.discountType === "percent") {
            discountedTotal -= (subtotal * appliedCoupon.discountValue) / 100;
        } else {
            discountedTotal -= appliedCoupon.discountValue;
        }
    }

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-400 mb-10 text-center">
                Checkout
            </h2>
            <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-12" />
            {cartItems.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Order Summary */}
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-serif font-medium text-gray-400 mb-4">
                            Order Summary
                        </h3>
                        <div className="bg-white rounded-md border border-gray-200 p-6 mb-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0"
                                >
                                    <div className="relative w-16 h-16">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="64px"
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base font-serif font-medium text-gray-800">{item.name}</h4>
                                        <p className="text-sm text-gray-600">
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                        <p className="text-sm font-medium text-gray-800">
                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <p className="text-base font-serif font-medium text-gray-800 mt-4">
                                Subtotal: ${subtotal.toFixed(2)}
                            </p>
                            {appliedCoupon && (
                                <p className="text-sm text-green-600 font-medium">
                                    Discount Applied: -{" "}
                                    {appliedCoupon.discountType === "percent"
                                        ? `${appliedCoupon.discountValue}%`
                                        : `$${appliedCoupon.discountValue.toFixed(2)}`}
                                </p>
                            )}
                            <p className="text-base font-serif font-medium text-gray-800 mt-2">
                                Order Total: ${discountedTotal.toFixed(2)}
                            </p>
                            {/* Payment Method */}
                            <div className="mt-6">
                                <label htmlFor="paymentMethod" className="block text-sm font-serif text-gray-600 mb-1">
                                    Payment Method
                                </label>
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={formData.paymentMethod || ""}
                                    onChange={handleInputChange}
                                    className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                >
                                    <option value="">Select Payment Method</option>
                                    <option value="khqr">Bakong KHQR</option>
                                    <option value="card">Credit / Debit Card</option>
                                    <option value="cod">Cash on Delivery</option>
                                </select>
                            </div>
                        </div>
                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 text-gray-300 hover:text-gray-800 font-serif text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Cart
                        </Link>
                    </div>
                    {/* Checkout Form */}
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-serif font-medium text-gray-400 mb-4">
                            Shipping & Billing Details
                        </h3>
                        <div className="bg-white rounded-md border border-gray-200 p-6">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-serif text-gray-600 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-serif text-gray-600 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                        placeholder="012 345 678"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-serif text-gray-600 mb-1">
                                        City / Province
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                    >
                                        <option value="">Select City / Province</option>
                                        {Object.keys(locationData).map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="district" className="block text-sm font-serif text-gray-600 mb-1">
                                        District / ស្រុក
                                    </label>
                                    <select
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                        className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                        disabled={!formData.city}
                                    >
                                        <option value="">Select District</option>
                                        {availableDistricts.map((district) => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="delivery" className="block text-sm font-serif text-gray-600 mb-1">
                                        Delivery Method
                                    </label>
                                    <select
                                        id="delivery"
                                        name="delivery"
                                        value={formData.delivery}
                                        onChange={handleInputChange}
                                        className="w-full text-black p-2 border border-gray-300 rounded text-sm font-serif"
                                        disabled={!formData.city}
                                    >
                                        <option value="">Select Delivery Method</option>
                                        {availableDeliveryOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleConfirmOrder}
                                    disabled={loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 w-full mt-4"
                                >
                                    {loading ? "Processing..." : "Confirm Order"} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-base text-gray-500 font-serif mb-6">Your cart is empty.</p>
                    <Link
                        href="/collections"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-700 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                        Shop Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </section>
    );
}