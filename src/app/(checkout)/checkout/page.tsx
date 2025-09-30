import CheckoutSection from "@/components/checkout/CheckoutSection";

// Simulated cart data (replace with actual cart data from state management or API)
const cartItems = [
    {
        id: 1,
        name: "Classic Leather Jacket",
        price: 149.99,
        image: "/images/leather-jacket.jpg",
        quantity: 1,
    },
    {
        id: 2,
        name: "Wool Blend Coat",
        price: 99.99,
        image: "/images/wool-coat.jpg",
        quantity: 2,
    },
    {
        id: 3,
        name: "Silk Dress Shirt",
        price: 59.99,
        image: "/images/silk-shirt.jpg",
        quantity: 1,
    },
];

export default function CheckoutPage() {
    // In a real app, fetch cart data from state management (e.g., Redux, Zustand) or API
    // const cartItems = await getCartItems();

    return (
        <main className="min-h-screen">
            <CheckoutSection initialItems={cartItems} />
        </main>
    );
}
