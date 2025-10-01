// app/sale/[id]/page.tsx

import ProductDetailSection from "@/components/products/ProductDetailSection";
import RelatedProducts from "@/components/products/RelatedProducts";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

interface SaleDetailPageProps {
    params: { id: string }; // This matches your folder [id]
}

export default function SaleDetailPage({ params }: SaleDetailPageProps) {
    // Parse the URL parameter as number
    const productId = Number(params.id);

    // Find product by id
    const product = products.find((p) => p.id === productId);

    // If product not found, show 404
    if (!product) notFound();

    return (
        <main className="min-h-screen">
            <ProductDetailSection product={product} />
            <RelatedProducts currentProductId={product.id} />
        </main>
    );
}
