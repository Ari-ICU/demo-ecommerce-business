"use client";
import QRCode from "react-qr-code";
import { generateKHQRPayload } from "@/utils/payment";
import CardPaymentView from "./CardPaymentView";
import toast from "react-hot-toast";

interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
    paymentMethod: "khqr" | "aba" | "wing" | "card";
    lang: "kh" | "en";
}

interface KHQRPaymentViewProps {
    amount: number;
    lang: "kh" | "en";
    onSuccess: () => void;
}

const KHQRPaymentView = ({ amount, lang, onSuccess }: KHQRPaymentViewProps) => {
    const formattedAmount = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-xs bg-white rounded-xl shadow-xl overflow-hidden mb-6 border border-gray-200">
                <div className="relative h-6 p-2 bg-red-600">
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-red-700 [clip-path:polygon(0%_0%,_100%_0%,_100%_100%)]"></div>
                    <div className="absolute top-0 left-0 text-white text-xs font-semibold p-1">
                        KHQR
                    </div>
                </div>

                <div className="p-4 border-b border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">
                        {lang === "kh" ? "ចំនួនទឹកប្រាក់" : "Payment Amount"}
                    </p>
                    <p className="text-3xl font-extrabold text-gray-900 text-center tracking-tight">
                        ${formattedAmount}
                    </p>
                </div>

                <div className="p-6 flex justify-center">
                    <div className="p-2 border border-gray-200 rounded-md shadow-inner">
                        <QRCode
                            value={generateKHQRPayload(amount)}
                            size={180}
                            level="M"
                        />
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 text-center">
                {lang === "kh"
                    ? `ស្កេន QR Code ខាងលើដើម្បីទូទាត់ $${amount.toFixed(2)} តាមរយៈកម្មវិធីធនាគារណាមួយ`
                    : `Scan the KHQR Code above to complete the payment of $${amount.toFixed(2)} using any bank app.`}
            </p>
        </div>
    );
};

export default function PaymentModal({ open, onClose, onSuccess, amount, paymentMethod, lang }: PaymentModalProps) {
    if (!open) return null;

    // 🔹 Unified success handler
    const handleSuccess = () => {
        onSuccess();
        toast.success(lang === "kh" ? "ការទូទាត់បានជោគជ័យ" : "Payment successful!");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 relative shadow-2xl transform transition-all scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                    aria-label={lang === "kh" ? "បិទ" : "Close"}
                >
                    <span className="text-3xl font-light leading-none">&times;</span>
                </button>

                <h4 className="text-xl font-bold mb-6 text-center text-gray-800">
                    {lang === "kh" ? "ទូទាត់" : "Make Payment"}
                </h4>

                <div className="text-center">
                    {paymentMethod === "khqr" && (
                        <KHQRPaymentView amount={amount} lang={lang} onSuccess={handleSuccess} />
                    )}

                    {paymentMethod === "aba" && (
                        <>
                            <p className="mb-6 text-gray-600">
                                {lang === "kh" ? "កំពុងផ្ទេរទៅ ABA Pay..." : "Redirecting to ABA Pay..."}
                            </p>
                        </>
                    )}

                    {paymentMethod === "wing" && (
                        <>
                            <p className="mb-6 text-gray-600">
                                {lang === "kh" ? "កំពុងផ្ទេរទៅ Wing..." : "Redirecting to Wing..."}
                            </p>
                        </>
                    )}

                    {paymentMethod === "card" && (
                        <>
                            <CardPaymentView lang={lang} onPay={handleSuccess} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
