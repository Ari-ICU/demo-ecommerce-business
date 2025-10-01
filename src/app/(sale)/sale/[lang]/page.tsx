// app//sale/[lang]/page.tsx
import SaleProductList from "@/components/sale/SaleProductList";
import { products } from "@/data/products";


export default function SalePage() {

    // Filter products that are on sale (i.e., have an originalPrice)
    const saleProducts = products.filter(product => product.originalPrice && product.originalPrice > product.price);

    return (
        <main className="min-h-screen">
            <SaleProductList products={saleProducts}  />
        </main>
    );
}