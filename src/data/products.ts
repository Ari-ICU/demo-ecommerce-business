// src/data/products.ts
import { Product } from "@/types/product.type";

export const products: Product[] = [
    {
        id: 1,
        name: { en: "Classic Sneakers", kh: "ស្បែកជើងក្លាសសិក" },
        price: 89.99,
        originalPrice: 120.0,
        image: "/products/sneakers.jpg",
        description: {
            en: "Timeless sneakers designed for comfort and style.",
            kh: "ស្បែកជើងគុណភាពខ្ពស់ សម្រាប់ការលៃតម្រូវនិងរចនាបថ។"
        },
    },
    {
        id: 2,
        name: { en: "Leather Backpack", kh: "កាបូបស្បែក" },
        price: 129.5,
        originalPrice: 180.0,
        image: "/products/backpack.jpg",
        description: {
            en: "Durable leather backpack for everyday use.",
            kh: "កាបូបស្បែកធន់ទ្រាំ សម្រាប់ប្រើប្រាស់ប្រចាំថ្ងៃ។"
        },
    },
    {
        id: 3,
        name: { en: "Wireless Earbuds", kh: "កាសត្រចៀកឥតខ្សែរ" },
        price: 59.0,
        originalPrice: 80.0,
        image: "/products/earbuds.jpg",
        description: {
            en: "Crystal-clear sound and all-day battery life.",
            kh: "សម្លេងច្បាស់លាស់ និងថាមពលថ្មរហូតថ្ងៃ។"
        },
    },
    {
        id: 4,
        name: { en: "Classic Watch", kh: "នាឡិការក្លាសសិក" },
        price: 199.99,
        originalPrice: 250.0,
        image: "/products/watch.jpg",
        description: {
            en: "Elegant watch with premium leather strap.",
            kh: "នាឡិការស្រស់ស្អាត មានខ្សែស្បែកគុណភាពខ្ពស់។"
        },
    },
    {
        id: 5,
        name: { en: "Sunglasses", kh: "កញ្ចក់ពាក់ភ្នែក" },
        price: 49.99,
        originalPrice: 70.0,
        image: "/products/sunglasses.jpg",
        description: {
            en: "UV protection and sleek design for everyday wear.",
            kh: "ការពារកម្តៅ UV និងរចនាបថស្អាតសម្រាប់ពាក់ប្រចាំថ្ងៃ។"
        },
    },
    {
        id: 6,
        name: { en: "Sports Cap", kh: "មួកកីឡា" },
        price: 25.0,
        originalPrice: 35.0,
        image: "/products/cap.jpg",
        description: {
            en: "Lightweight and comfortable cap for active lifestyle.",
            kh: "មួកស្រាល និងសមស្របសម្រាប់ស្ទីលជីវិតសកម្ម។"
        },
    },
    {
        id: 7,
        name: { en: "Denim Jacket", kh: "អាវដេនិម" },
        price: 89.99,
        originalPrice: 130.0,
        image: "/products/denim-jacket.jpg",
        description: {
            en: "Classic denim jacket with a modern fit.",
            kh: "អាវដេនិមបែបប្រពៃណី មានការតម្រូវទាន់សម័យ។"
        },
    },
    {
        id: 8,
        name: { en: "Running Shoes", kh: "ស្បែកជើងរត់" },
        price: 110.0,
        originalPrice: 150.0,
        image: "/products/running-shoes.jpg",
        description: {
            en: "High-performance running shoes for all terrains.",
            kh: "ស្បែកជើងរត់មានប្រសិទ្ធភាពខ្ពស់ សម្រាប់ដីគ្រប់ប្រភេទ។"
        },
    },
];
