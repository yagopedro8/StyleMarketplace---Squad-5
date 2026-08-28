import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { products, toCartItem } from "../data/products";
import { useCart } from "../contexts/CartContext.tsx";

const colors = [
  { name: "Black", value: "#111827" },
  { name: "Blue", value: "#2f4bd6" },
  { name: "Grey", value: "#b7bcc4" },
];

const sizes = ["XS", "S", "M", "L", "XL"];

const tabs = ["Description", "Specifications", "Reviews"] as const;

export function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(
    (p) => String(p.id) === productId
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">
            Product not found
          </h1>

          <button
            onClick={() => navigate("/sale")}
            className="bg-black text-white rounded-lg px-5 py-2 text-sm font-semibold"
          >
            Back to Sale
          </button>
        </div>
      </div>
    );
  }

  const currentProduct = product;

  const relatedProducts = products
    .filter(
      (p) =>
        p.category === currentProduct.category &&
        p.id !== currentProduct.id
    )
    .slice(0, 3);

  const [selectedColor, setSelectedColor] = useState(
    colors[0].name
  );

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const [activeTab, setActiveTab] = useState<
    (typeof tabs)[number]
  >(tabs[0]);

  function handleAddToCart() {
    addToCart(
      {
        ...toCartItem(currentProduct),
        color: selectedColor,
        size: selectedSize,
      },
      quantity
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <p className="text-xs text-[#6B7280] mb-4">
          <Link to="/" className="text-[#454b54]">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/sale" className="text-[#454b54]">
            {currentProduct.category}
          </Link>{" "}
          / {currentProduct.name}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Galeria */}
          <div>
            <div className="relative h-80 md:h-96 rounded-lg bg-[#EDEDED] overflow-hidden">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />

              <span className="absolute top-2 left-2 bg-[#EF3340] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                -{currentProduct.discount}%
              </span>

              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-md bg-[#EDEDED] overflow-hidden border-2 border-transparent"
                >
                  <img
                    src={currentProduct.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-[#6B7280] tracking-widest">
                {currentProduct.badge}
              </span>

              <span className="text-[10px] bg-gray-100 text-[#454b54] px-2 py-1 rounded-full">
                {currentProduct.category}
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-2">
              {currentProduct.name}
            </h1>

            <div className="flex items-center gap-1 text-xs text-[#6B7280] mb-3">
              <Star className="w-3 h-3 fill-[#F6BA00] text-[#F6BA00]" />

              <strong className="text-black">
                {currentProduct.rating}
              </strong>

              ({currentProduct.reviews} reviews)
            </div>

            <div className="flex items-center gap-2 mb-1">
              <strong className="text-[#EF3340] text-xl">
                ${currentProduct.price}
              </strong>

              <del className="text-sm text-[#9ca1aa]">
                ${currentProduct.oldPrice}
              </del>

              <span className="text-[10px] text-[#EF3340] bg-red-50 px-1.5 py-0.5 rounded">
                Save $
                {currentProduct.oldPrice -
                  currentProduct.price}
              </span>
            </div>

            <p className="text-xs text-green-600 mb-4">
              In Stock
            </p>

            {/* Cores */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">
                Color: {selectedColor}
              </h3>

              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    type="button"
                    key={c.name}
                    onClick={() =>
                      setSelectedColor(c.name)
                    }
                    style={{ background: c.value }}
                    className={`w-6 h-6 rounded-full border-2 border-white ${
                      selectedColor === c.name
                        ? "ring-2 ring-black"
                        : "ring-1 ring-[#E5E7EB]"
                    }`}
                  />
                ))}
              </div>
            </div>

            /*Conferir se o tamanho não bugou denovo*/
            {/* Tamanho */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">
                  Size
                </h3>

                <button
                  type="button"
                  className="text-xs text-[#454b54] underline"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() =>
                      setSelectedSize(s)
                    }
                    className={`w-9 h-8 rounded-md border text-xs ${
                      selectedSize === s
                        ? "bg-black text-white border-black"
                        : "border-[#E5E7EB]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantidade */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold mb-2">
                Quantity
              </h3>

              <div className="inline-flex items-center gap-3 border border-[#E5E7EB] rounded-lg px-3 py-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(1, q - 1)
                    )
                  }
                >
                  -
                </button>

                <span className="text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-lg py-3 text-sm font-semibold"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                className="flex-1 border border-black rounded-lg py-3 text-sm font-semibold"
              >
                Buy Now
              </button>

              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center border border-[#E5E7EB] rounded-lg"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Benefícios */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#E5E7EB] pt-4">
              {[
                {
                  icon: Truck,
                  title: "Free Shipping",
                },
                {
                  icon: RotateCcw,
                  title: "Easy Returns",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Payment",
                },
              ].map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="flex flex-col items-center text-center gap-1"
                >
                  <Icon className="w-5 h-5" />

                  <strong className="text-xs">
                    {title}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex gap-6 border-b border-[#E5E7EB]">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm border-b-2 ${
                  activeTab === tab
                    ? "border-black font-semibold"
                    : "border-transparent text-[#6B7280]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-4 text-sm text-[#454b54] leading-relaxed">
            {activeTab === "Description" && (
              <p>
                {currentProduct.name} faz parte da nossa
                coleção {currentProduct.category} —{" "}
                {currentProduct.badge}. Avaliado em{" "}
                {currentProduct.rating} por{" "}
                {currentProduct.reviews} clientes.
              </p>
            )}

            {activeTab === "Specifications" && (
              <p>Specifications coming soon.</p>
            )}

            {activeTab === "Reviews" && (
              <p>Reviews coming soon.</p>
            )}
          </div>
        </div>

        {/* Relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">
              You Might Also Like
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
