import CheckoutSection from "@/components/checkout/CheckoutSection";

export default function CheckoutPage() {
    // In a real app, fetch cart data from state management (e.g., Redux, Zustand) or API
    // const cartItems = await getCartItems();

    return (
        <main className="min-h-screen">
            <CheckoutSection />
        </main>
    );
}
