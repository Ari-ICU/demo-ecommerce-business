import SaleProductList from "@/components/sale/SaleProductList";

// Simulated sale product data (replace with actual API call or database query)
const saleProducts = [
    {
        id: 1,
        name: "Classic Leather Jacket",
        price: 149.99, // Discounted price
        originalPrice: 199.99,
        image: "/images/leather-jacket.jpg",
        description: "A timeless leather jacket at a special discount.",
    },
    {
        id: 2,
        name: "Wool Blend Coat",
        price: 99.99,
        originalPrice: 149.99,
        image: "/images/wool-coat.jpg",
        description: "Elegant wool blend coat, now on sale.",
    },
    {
        id: 3,
        name: "Silk Dress Shirt",
        price: 59.99,
        originalPrice: 89.99,
        image: "/images/silk-shirt.jpg",
        description: "Smooth silk shirt at a reduced price.",
    },
    {
        id: 4,
        name: "Cashmere Sweater",
        price: 89.99,
        originalPrice: 129.99,
        image: "/images/cashmere-sweater.jpg",
        description: "Soft cashmere sweater with a great discount.",
    },
    {
        id: 5,
        name: "Tailored Trousers",
        price: 49.99,
        originalPrice: 79.99,
        image: "/images/trousers.jpg",
        description: "Tailored trousers at an unbeatable price.",
    },
    {
        id: 6,
        name: "Suede Loafers",
        price: 79.99,
        originalPrice: 109.99,
        image: "/images/loafers.jpg",
        description: "Luxurious suede loafers, now on sale.",
    },
    {
        id: 7,
        name: "Linen Blazer",
        price: 119.99,
        originalPrice: 159.99,
        image: "/images/linen-blazer.jpg",
        description: "Lightweight linen blazer with a special offer.",
    },
];

export default async function SalePage() {
    // In a real app, fetch sale products from an API or database
    // const saleProducts = await fetchSaleProducts();

    return (
        <main className="min-h-screen">
            <SaleProductList products={saleProducts} />
        </main>
    );
}
