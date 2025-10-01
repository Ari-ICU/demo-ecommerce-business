// components/CardPaymentView.tsx
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface CardPaymentViewProps {
    lang: "kh" | "en";
    onPay: () => void;
}

const CardPaymentView = ({ lang, onPay }: CardPaymentViewProps) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardholderName, setCardholderName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation (can be enhanced)
        if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
            alert(lang === "kh" ? "សូមបំពេញព័ត៌មានទាំងអស់" : "Please fill all fields");
            return;
        }
        onPay();
    };

    const labels = lang === "kh" ? {
        cardNumber: "លេខកាត",
        expiryDate: "កាលបរិច្ឆេទផុតកំណត់ (MM/YY)",
        cvv: "CVV",
        cardholderName: "ឈ្មោះម្ចាស់កាត",
        payWithCard: "ទូទាត់ជាមួយកាត"
    } : {
        cardNumber: "Card Number",
        expiryDate: "Expiry Date (MM/YY)",
        cvv: "CVV",
        cardholderName: "Cardholder Name",
        payWithCard: "Pay with Card"
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    {labels.cardNumber}
                </label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))}
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        {labels.expiryDate}
                    </label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2'))}
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        {labels.cvv}
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                        maxLength={3}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
            </div>
            <div>
                <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                    {labels.cardholderName}
                </label>
                <input
                    type="text"
                    id="cardholderName"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
            </div>
            <button
                type="submit"
                className="flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-700 transition w-full"
            >
                {labels.payWithCard}
                <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
        </form>
    );
};

export default CardPaymentView;