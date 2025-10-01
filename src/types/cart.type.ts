interface CartItem {
    id: number;
    name: { en: string; kh: string }; 
    price: number;
    image: string;
    quantity: number;
}
export type { CartItem };