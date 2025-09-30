"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import { products } from "@/data/products";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <FeaturedProducts products={products} />
    </main>
  );
}
