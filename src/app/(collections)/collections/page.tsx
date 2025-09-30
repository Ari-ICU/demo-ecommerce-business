import ProductList from "@/components/products/ProductList";

// Simulated product data (replace with actual API call or database query)
const products = [
    {
        id: 1,
        name: "Classic Leather Jacket",
        price: 199.99,
        image: "https://via.placeholder.com/400x300?text=Leather+Jacket",
        description: "A timeless leather jacket crafted with premium materials.",
    },
    {
        id: 2,
        name: "Wool Blend Coat",
        price: 149.99,
        image: "https://via.placeholder.com/400x300?text=Wool+Coat",
        description: "Elegant wool blend coat for sophisticated style.",
    },
    {
        id: 3,
        name: "Silk Dress Shirt",
        price: 89.99,
        image: "https://via.placeholder.com/400x300?text=Silk+Shirt",
        description: "Smooth silk shirt for formal occasions.",
    },
    {
        id: 4,
        name: "Cashmere Sweater",
        price: 129.99,
        image: "https://via.placeholder.com/400x300?text=Cashmere+Sweater",
        description: "Soft cashmere sweater for ultimate comfort.",
    },
    {
        id: 5,
        name: "Tailored Trousers",
        price: 79.99,
        image: "https://via.placeholder.com/400x300?text=Trousers",
        description: "Perfectly tailored trousers for a sharp look.",
    },
    {
        id: 6,
        name: "Suede Loafers",
        price: 109.99,
        image: "https://via.placeholder.com/400x300?text=Loafers",
        description: "Luxurious suede loafers for everyday elegance.",
    },
    {
        id: 7,
        name: "Linen Blazer",
        price: 159.99,
        image: "https://via.placeholder.com/400x300?text=Linen+Blazer",
        description: "Lightweight linen blazer for warm weather.",
    },
];

export default async function CollectionsPage() {
    return (
        <main className=" min-h-screen">
            <ProductList products={products} />
        </main>
    );
}