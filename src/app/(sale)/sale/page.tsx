import SaleProductList from "@/components/sale/SaleProductList";
import { products } from "@/data/products";


// Filter products that are on sale (i.e., have an originalPrice)
const saleProducts = products.filter(product => product.originalPrice && product.originalPrice > product.price);

export default async function SalePage() {


    return (
        <main className="min-h-screen">
            <SaleProductList products={saleProducts} />
        </main>
    );
}
