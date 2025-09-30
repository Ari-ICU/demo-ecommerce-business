import ProductDetailSection from "@/components/products/ProductDetailSection";
import { notFound } from "next/navigation";

// Simulated product data (replace with actual API call or database query)
const products = [
    {
        id: 1,
        name: "Classic Leather Jacket",
        price: 149.99,
        image: "/images/leather-jacket.jpg",
        description: "A timeless leather jacket crafted with premium materials, offering durability and style for any occasion.",
    },
    {
        id: 2,
        name: "Wool Blend Coat",
        price: 99.99,
        image: "/images/wool-coat.jpg",
        description: "Elegant wool blend coat designed for warmth and sophistication, perfect for cooler seasons.",
    },
    {
        id: 3,
        name: "Silk Dress Shirt",
        price: 59.99,
        image: "/images/silk-shirt.jpg",
        description: "Smooth silk shirt ideal for formal occasions, combining comfort with a refined look.",
    },
    {
        id: 4,
        name: "Cashmere Sweater",
        price: 89.99,
        image: "/images/cashmere-sweater.jpg",
        description: "Soft cashmere sweater offering ultimate comfort and a luxurious feel.",
    },
    {
        id: 5,
        name: "Tailored Trousers",
        price: 49.99,
        image: "/images/trousers.jpg",
        description: "Perfectly tailored trousers for a sharp, professional appearance.",
    },
    {
        id: 6,
        name: "Suede Loafers",
        price: 79.99,
        image: "/images/loafers.jpg",
        description: "Luxurious suede loafers designed for everyday elegance and comfort.",
    },
    {
        id: 7,
        name: "Linen Blazer",
        price: 119.99,
        image: "/images/linen-blazer.jpg",
        description: "Lightweight linen blazer, ideal for warm weather and casual sophistication.",
    },
];

interface ProductDetailPageProps {
    params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    // In a real app, fetch product data from an API or database
    const product = products.find((p) => p.id === parseInt(params.id));

    if (!product) {
        notFound(); // Trigger 404 if product not found
    }

    return (
        <main className="min-h-screen">
            <ProductDetailSection product={product} />
        </main>
    );
}
