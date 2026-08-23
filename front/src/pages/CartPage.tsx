import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  BellRing,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Footer } from "../components/Footer";
import { useCart } from "../contexts/CartContext.tsx";

const outOfStockItems = [
  {
    id: "3",
    name: "Summer Dress",
    color: "Floral Print",
    size: "S",
    price: 45.0,
  },
];
//testar calculadora
export function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const savings = cart.reduce(
    (sum, item) =>
      sum +
      ((item.oldPrice ?? item.price) - item.price) *
        item.quantity,
    0
  );

  const tax = subtotal * 0.078;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white">
      <PageHeader />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingBag className="w-5 h-5" />
          <h1 className="text-xl font-bold">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Available Items ({cart.length})
            </div>

            {cart.length === 0 ? (
              <div className="border border-[#E5E7EB] rounded-lg p-10 text-center">
                <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-[#9CA3AF]" />

                <h2 className="text-base font-semibold mb-1">
                  Your cart is empty
                </h2>

                <p className="text-sm text-[#6B7280] mb-5">
                  Add some products and they will appear here.
                </p>

                <Link
                  to="/"
                  className="inline-block bg-black text-white rounded-lg px-5 py-2.5 text-sm font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border border-[#E5E7EB] rounded-lg p-3"
                    >
                      {/* Imagem clicável */}
                      <Link
                        to={`/product/${item.id}`}
                        className="w-20 h-20 rounded-md bg-[#EDEDED] shrink-0 overflow-hidden block"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">
                            <ShoppingBag className="w-6 h-6" />
                          </div>
                        )}
                      </Link>

                      <div className="flex-1 min-w-0">
                        {/* Nome clicável */}
                        <Link
                          to={`/product/${item.id}`}
                          className="text-sm font-semibold hover:underline"
                        >
                          {item.name}
                        </Link>

                        <p className="text-xs text-[#6B7280]">
                          STYLE Premium
                        </p>

                        {(item.size || item.color) && (
                          <p className="text-xs text-[#6B7280] mb-2">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && " · "}
                            {item.color && `Color: ${item.color}`}
                          </p>
                        )}

                        <div className="inline-flex items-center gap-3 border border-[#E5E7EB] rounded-lg px-2 py-1 mb-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="hover:text-red-500 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span className="text-sm min-w-[16px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="hover:text-green-600 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex gap-4 text-xs text-[#6B7280]">
                          <button className="flex items-center gap-1 hover:text-black transition">
                            <Heart className="w-3 h-3" />
                            Save for Later
                          </button>

                          <button
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="flex items-center gap-1 hover:text-red-500 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 text-right shrink-0">
                        <strong className="text-sm">
                          $
                          {(
                            item.price * item.quantity
                          ).toFixed(2)}
                        </strong>

                        {item.oldPrice && (
                          <del className="text-xs text-[#9ca1aa]">
                            $
                            {(
                              item.oldPrice *
                              item.quantity
                            ).toFixed(2)}
                          </del>
                        )}

                        {item.discount && (
                          <span className="text-[10px] text-[#EF3340] bg-red-50 px-1.5 py-0.5 rounded">
                            {item.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-3">
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#6B7280] underline hover:text-red-500 transition"
                  >
                    Clear cart
                  </button>
                </div>
              </>
            )}

            {outOfStockItems.length > 0 && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#9ca1aa] mt-6 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#EF3340]" />
                  Out of Stock ({outOfStockItems.length})
                </div>

                <div className="flex flex-col gap-3">
                  {outOfStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border border-[#E5E7EB] rounded-lg p-3 opacity-75"
                    >
                      <div className="relative w-20 h-20 rounded-md bg-[#EDEDED]">
                        <span className="absolute bottom-1 left-1 bg-[#EF3340] text-white text-[9px] px-1.5 py-0.5 rounded">
                          Out of Stock
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-xs text-[#6B7280] mb-2">
                          Size: {item.size} · Color: {item.color}
                        </p>

                        <button className="flex items-center gap-1 bg-black text-white text-xs rounded-lg px-3 py-1.5 mb-2">
                          <BellRing className="w-3 h-3" />
                          Notify When Available
                        </button>

                        <div className="flex gap-4 text-xs text-[#6B7280]">
                          <button className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            Save for Later
                          </button>

                          <button className="flex items-center gap-1">
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <strong className="text-sm">
                          ${item.price.toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="flex flex-col gap-4">
            <div className="border border-[#E5E7EB] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">
                Promo Code
              </h3>

              <div className="flex gap-2">
                <input
                  value={promoCode}
                  onChange={(e) =>
                    setPromoCode(e.target.value)
                  }
                  placeholder="Enter promo code"
                  className="flex-1 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm outline-none"
                />

                <button className="bg-black text-white rounded-lg px-3 py-2 text-sm font-semibold">
                  Apply
                </button>
              </div>

              <p className="text-xs text-[#6B7280] mt-2">
                Try WELCOME10 for 10% off
              </p>
            </div>

            <div className="border border-[#E5E7EB] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">
                Order Summary
              </h3>

              <div className="flex justify-between text-sm text-[#454b54] mb-2">
                <span>
                  Subtotal (
                  {cart.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}{" "}
                  items)
                </span>

                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#454b54]">
                  Savings
                </span>

                <span className="text-green-600">
                  -${savings.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm text-[#454b54] mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between text-sm text-[#454b54] mb-3">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-bold border-t border-[#E5E7EB] pt-3 mb-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                disabled={cart.length === 0}
                className="w-full bg-black text-white rounded-lg py-3 text-sm font-semibold mb-2 disabled:bg-[#D1D5DB] disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center text-xs text-[#454b54] underline mb-3"
              >
                Continue Shopping
              </Link>

              <p className="flex items-center justify-center gap-1 text-[10px] text-[#6B7280]">
                <ShieldCheck className="w-3 h-3" />
                Secure checkout - your information is safe &
                encrypted
              </p>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
