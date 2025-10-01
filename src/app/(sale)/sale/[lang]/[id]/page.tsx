// app/sale/[lang]/[id]/page.tsx
import ProductDetailSection from "@/components/products/ProductDetailSection";
import RelatedProducts from "@/components/products/RelatedProducts";
import { notFound } from "next/navigation";
import { products } from "@/data/products";

interface SaleDetailPageProps {
    params: { id: string; lang: "en" | "kh" };
}

export default function SaleDetailPage({ params }: SaleDetailPageProps) {
    const { id, lang } = params;

    const productName = decodeURIComponent(id);

    const product = products.find(
        (p) => p.name[lang as keyof typeof p.name] === productName
    );

    if (!product) notFound();

    return (
        <main className="min-h-screen">
            <ProductDetailSection product={product} />
            <RelatedProducts currentProductId={product.id} />
        </main>
    );
}
