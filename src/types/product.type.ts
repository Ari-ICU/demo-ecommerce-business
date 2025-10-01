export interface Product {
    id: number;
    name: { en: string; kh: string };
    price: number;
    originalPrice?: number;
    image: string;
    description?: { en: string; kh: string };
    images?: string[]; // additional images for gallery
}