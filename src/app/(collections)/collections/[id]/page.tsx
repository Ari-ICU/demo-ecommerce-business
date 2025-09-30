import ProductDetailSection from "@/components/products/ProductDetailSection";
import RelatedProducts from "@/components/products/RelatedProducts";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

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
            <RelatedProducts  currentProductId={product.id} />
        </main>
    );
}
