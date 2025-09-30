interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    originalPrice?: number; // For sale products
    images?: string[]; // Array of additional images for thumbnails
}
export type { Product };