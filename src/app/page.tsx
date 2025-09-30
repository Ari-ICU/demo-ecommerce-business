"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts products={[
        {
          id: 1,
          name: "Classic White T-Shirt",
          price: 19.99,
          image: "/images/products/white-tshirt.jpg",
          description: "A timeless classic white t-shirt made from 100% organic cotton.",
        },
        {
          id: 2,
          name: "Blue Denim Jeans",
          price: 49.99,
          image: "/images/products/denim-jeans.jpg",
          description: "Comfortable and stylish blue denim jeans with a modern fit.",
        },
        {
          id: 3,
          name: "Red Sneakers",
          price: 89.99,
          image: "/images/products/red-sneakers.jpg",
          description: "Vibrant red sneakers that combine comfort and style for everyday wear.",
        },
      ]} />
    </main>
  );
}
