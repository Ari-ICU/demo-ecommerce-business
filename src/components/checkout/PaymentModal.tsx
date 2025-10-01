"use client";
import QRCode from "react-qr-code";
import { generateKHQRPayload } from "@/utils/payment";
import CardPaymentView from "./CardPaymentView";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js"; // npm install crypto-js

interface PaymentModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
    paymentMethod: "khqr" | "aba" | "wing" | "card";
    lang: "kh" | "en";
    // Add these for KHQR polling (get token from Bakong developer portal: https://api-bakong.nbc.gov.kh/register)
    bakongToken?: string; // Optional: Pass from parent or use env
    bakongBaseUrl?: string; // Default: 'https://api-bakong.nbc.gov.kh'
}

interface KHQRPaymentViewProps {
    amount: number;
    lang: "kh" | "en";
    onSuccess: () => void;
    bakongToken?: string;
    bakongBaseUrl?: string;
}

const KHQRPaymentView = ({ amount, lang, onSuccess, bakongToken, bakongBaseUrl = 'https://api-bakong.nbc.gov.kh' }: KHQRPaymentViewProps) => {
    const [isPolling, setIsPolling] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const formattedAmount = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const payload = generateKHQRPayload(amount);
    const md5Hash = CryptoJS.MD5(payload).toString();

    useEffect(() => {
        if (!bakongToken) {
            console.warn('Bakong token not provided. Polling disabled.');
            return;
        }

        setIsPolling(true);

        const interval = setInterval(async () => {
            try {
                const response = await fetch(`${bakongBaseUrl}/v1/check_transaction_by_md5`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${bakongToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ md5: md5Hash }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();

                if (data.responseCode === 0 && 
                    data.data?.amount === amount && 
                    data.data?.currency === 'USD' && 
                    data.data?.toAccountId === 'merchant@bakong' // Match your merchant account from generateKHQRPayload
                ) {
                    setPaymentStatus('success');
                    setIsPolling(false);
                    clearInterval(interval);
                    onSuccess();
                }
            } catch (err) {
                console.error('Polling error:', err);
                setPaymentStatus('error');
                setIsPolling(false);
                clearInterval(interval);
            }
        }, 3000); // Poll every 3 seconds

        // Stop polling after 5 minutes
        const timeout = setTimeout(() => {
            setIsPolling(false);
            clearInterval(interval);
        }, 300000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [amount, onSuccess, md5Hash, bakongToken, bakongBaseUrl]);

    if (paymentStatus === 'success') {
        return (
            <div className="flex flex-col items-center">
                <p className="text-green-600 font-semibold">{lang === "kh" ? "ការទូទាត់ជោគជ័យ!" : "Payment successful!"}</p>
            </div>
        );
    }

    if (paymentStatus === 'error') {
        return (
            <div className="flex flex-col items-center">
                <p className="text-red-600">{lang === "kh" ? "កំហុសក្នុងការផ្ទៀងផ្ទាត់" : "Verification error. Please try again."}</p>
            </div>
        );
    }

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
                    {isPolling && (
                        <p className="text-xs text-blue-600 mt-2">Polling for payment confirmation...</p>
                    )}
                </div>

                <div className="p-6 flex justify-center">
                    <div className="p-2 border border-gray-200 rounded-md shadow-inner">
                        <QRCode
                            value={payload}
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

export default function PaymentModal({ 
    open, 
    onClose, 
    onSuccess, 
    amount, 
    paymentMethod, 
    lang, 
    bakongToken, 
    bakongBaseUrl 
}: PaymentModalProps) {
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
                        <KHQRPaymentView 
                            amount={amount} 
                            lang={lang} 
                            onSuccess={handleSuccess}
                            bakongToken={bakongToken}
                            bakongBaseUrl={bakongBaseUrl}
                        />
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