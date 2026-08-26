import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext.tsx";
import { toCartItem, type Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      <button
        className="relative h-44 w-full bg-[#EDEDED] block"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-[#EF3340] text-white text-[10px] font-bold px-2 py-1 rounded-full">
          -{product.discount}%
        </span>
      </button>
      <button
        onClick={() => setIsFavorite((f) => !f)}
        className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
        style={{ marginTop: "-38px" }}
      >
        <Heart className="w-4 h-4" fill={isFavorite ? "#EF3340" : "none"} color={isFavorite ? "#EF3340" : "currentColor"} />
      </button>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] bg-gray-100 text-[#454b54] px-2 py-0.5 rounded">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-[#6B7280]">
            <Star className="w-3 h-3 fill-[#F6BA00] text-[#F6BA00]" />
            <strong className="text-black">{product.rating}</strong>
          </span>
        </div>
        <button onClick={() => navigate(`/product/${product.id}`)} className="text-left w-full">
          <h3 className="text-sm font-semibold truncate mb-2">{product.name}</h3>
        </button>
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-[#EF3340] text-base">${product.price}</strong>
          <del className="text-xs text-[#9ca1aa]">${product.oldPrice}</del>
        </div>
        <button
          onClick={() => addToCart(toCartItem(product))}
          className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 text-sm font-semibold"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}