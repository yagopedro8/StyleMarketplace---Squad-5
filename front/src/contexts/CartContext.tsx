import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getLoggedUserId } from "../utils/jwt";
import { getBackendProducts, getBackendVariants } from "../services/catalog";
import {
  getCarts,
  createCart,
  getCartById,
  addCartVariant,
  updateCartVariant,
  removeCartVariant,
  type CartDetail,
} from "../services/cart";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
  color?: string;
  size?: string;
  oldPrice?: number;
  discount?: string;
  quantity: number;
  variantId?: number;
};

type CartContextType = {
  cart: CartProduct[];
  cartCount: number;
  addToCart: (
    product: Omit<CartProduct, "quantity">,
    quantity?: number
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

function mapCartDetail(detail: CartDetail): CartProduct[] {
  return detail.cartVariants.map((cv) => ({
    id: String(cv.id),
    name: cv.variant.product.name,
    price: cv.variant.product.salePrice ?? cv.variant.product.price,
    oldPrice: cv.variant.product.salePrice
      ? cv.variant.product.price
      : undefined,
    image: cv.variant.product.photoUrl ?? undefined,
    color: cv.variant.color,
    size: cv.variant.size,
    quantity: cv.quantity,
    variantId: cv.variantId,
  }));
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const savedCart = localStorage.getItem("style-cart");

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  });

  const [userId, setUserId] = useState<number | null>(() =>
    getLoggedUserId()
  );
  const [cartId, setCartId] = useState<number | null>(null);
  const [variantByName, setVariantByName] = useState<
    Map<string, number>
  >(new Map());

  useEffect(() => {
    function handleAuthChanged() {
      setUserId(getLoggedUserId());
    }

    window.addEventListener("auth-changed", handleAuthChanged);
    return () =>
      window.removeEventListener("auth-changed", handleAuthChanged);
  }, []);

  useEffect(() => {
    if (!userId) {
      setCartId(null);
      return;
    }

    async function bootstrap(id: number) {
      const [products, variants] = await Promise.all([
        getBackendProducts(),
        getBackendVariants(),
      ]);

      const map = new Map<string, number>();
      for (const product of products) {
        const variant = variants.find((v) => v.productId === product.id);
        if (variant) map.set(product.name, variant.id);
      }
      setVariantByName(map);

      const carts = await getCarts();
      const existing = carts.find((c) => c.userId === id);
      const userCart = existing ?? (await createCart(id));
      setCartId(userCart.id);

      const detail = await getCartById(userCart.id);
      setCart(mapCartDetail(detail));
    }

    bootstrap(userId).catch((err) => console.error(err));
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      localStorage.setItem("style-cart", JSON.stringify(cart));
    }
  }, [cart, userId]);

  async function refreshCart(id: number) {
    const detail = await getCartById(id);
    setCart(mapCartDetail(detail));
  }

  async function addToCart(
    product: Omit<CartProduct, "quantity">,
    quantity = 1
  ) {
    if (userId && cartId) {
      const variantId = variantByName.get(product.name);

      if (variantId) {
        const existing = cart.find(
          (item) => item.variantId === variantId
        );

        if (existing) {
          await updateCartVariant(
            Number(existing.id),
            existing.quantity + quantity
          );
        } else {
          await addCartVariant(cartId, variantId, quantity);
        }

        await refreshCart(cartId);
        return;
      }
    }

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    });
  }

  async function removeFromCart(id: string) {
    const item = cart.find((i) => i.id === id);

    if (userId && cartId && item?.variantId) {
      await removeCartVariant(Number(id));
      await refreshCart(cartId);
      return;
    }

    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  async function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    const item = cart.find((i) => i.id === id);

    if (userId && cartId && item?.variantId) {
      await updateCartVariant(Number(id), quantity);
      await refreshCart(cartId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  }

  async function clearCart() {
    if (userId && cartId) {
      await Promise.all(
        cart.map((item) => removeCartVariant(Number(item.id)))
      );
      await refreshCart(cartId);
      return;
    }

    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart precisa estar dentro de CartProvider"
    );
  }

  return context;
}
