import ProductList from "@/components/products/ProductList";
import { products } from "@/data/products";

export default async function CollectionsPage() {
    return (
        <main className=" min-h-screen">
            <ProductList products={products} />
        </main>
    );
}