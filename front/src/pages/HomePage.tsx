import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../services/products";
import type { Product } from "../data/products";


const categories = [
  { name: "Women's Fashion", count: "150+ items" },
  { name: "Men's Fashion", count: "120+ items" },
  { name: "Accessories", count: "80+ items" },
  { name: "Shoes", count: "95+ items" },
];



export function HomePage() {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts()
        setFeaturedProducts(data.slice(0, 3))
      } catch (error) {
        console.error("Erro ao buscar produtos", error)
      }
    }
      fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <PageHeader />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#C52B3C] via-[#D82D50] to-[#C51A75] text-white text-center py-16 px-4">
        <span className="text-xs font-bold tracking-widest">
          NEW COLLECTION
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2 mb-3">
          Style Redefined
        </h1>

        <p className="max-w-xl mx-auto text-sm opacity-95 mb-6">
          Discover the latest trends in fashion. Premium quality, sustainable
          materials, timeless designs.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate("/sale")}
            className="bg-white text-[#EF3340] rounded-full px-5 py-2 text-sm font-semibold"
          >
            Shop Now →
          </button>

          <button
            onClick={() => navigate("/sale")}
            className="border border-white/60 text-white rounded-full px-5 py-2 text-sm font-semibold"
          >
            View Collection
          </button>
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 py-8 border-b border-[#E5E7EB]">
        {[
          {
            icon: Truck,
            title: "Free Shipping",
            text: "Free shipping on orders over $100",
          },
          {
            icon: RotateCcw,
            title: "Easy Returns",
            text: "30 day hassle free returns",
          },
          {
            icon: ShieldCheck,
            title: "Secure Payment",
            text: "Your payment information is safe",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex flex-col items-center text-center gap-1"
          >
            <Icon className="w-6 h-6 mb-1" />
            <strong className="text-sm">{title}</strong>
            <span className="text-xs text-[#6B7280]">{text}</span>
          </div>
        ))}
      </section>

      {/* Categorias */}
      <section className="max-w-6xl mx-auto px-6 py-10 text-center">
        <span className="text-xs font-bold text-[#6B7280] tracking-widest">
          BROWSE
        </span>

        <h2 className="text-2xl font-bold mt-1 mb-2">
          Shop by Category
        </h2>

        <p className="text-sm text-[#6B7280] mb-6">
          Explore our carefully curated collections for every style and
          occasion
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate("/sale")}
              className="border border-[#E5E7EB] rounded-lg overflow-hidden text-left hover:shadow-md transition-shadow"
            >
              <div className="h-28 bg-[#EDEDED]" />

              <div className="p-3">
                <h3 className="text-sm font-semibold">{cat.name}</h3>
                <span className="text-xs text-[#6B7280]">
                  {cat.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <span className="text-xs font-bold text-[#6B7280] tracking-widest">
          HANDPICKED
        </span>

        <h2 className="text-2xl font-bold mt-1 mb-1">
          Featured Products
        </h2>

        <p className="text-sm text-[#6B7280] mb-6">
          Handpicked favorites from our latest collection
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-[#FA3944] to-[#F21E68] text-white text-center py-12 px-4">
        <span className="text-xs opacity-80 tracking-widest">
          STAY UPDATED
        </span>

        <h2 className="text-2xl font-bold my-2">
          Join Our Newsletter
        </h2>

        <p className="max-w-md mx-auto text-sm opacity-90 mb-4">
          Subscribe to get special offers, free giveaways, and new arrival
          updates.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-2 max-w-sm mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-lg px-3 py-2 text-sm text-black outline-none"
          />

          <button
            type="submit"
            className="bg-white text-black rounded-lg px-4 py-2 text-sm font-semibold"
          >
            Subscribe
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}