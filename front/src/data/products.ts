import type { CartProduct } from "../contexts/CartContext.tsx";

export type Category =
  | "All"
  | "Tops"
  | "Bottoms"
  | "Dresses"
  | "Shoes"
  | "Accessories";

export type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
};

export const categories: Category[] = [
  "All",
  "Tops",
  "Bottoms",
  "Dresses",
  "Shoes",
  "Accessories",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Camisa Original",
    category: "Tops",
    price: 120,
    oldPrice: 200,
    discount: 40,
    rating: 4.8,
    reviews: 156,
    badge: "Luxo",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Vestido vermelho",
    category: "Dresses",
    price: 49,
    oldPrice: 89,
    discount: 45,
    rating: 4.6,
    reviews: 91,
    badge: "Promocao de verao",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Tenis de corrida",
    category: "Shoes",
    price: 84,
    oldPrice: 140,
    discount: 40,
    rating: 4.5,
    reviews: 234,
    badge: "Sports Sale",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Jaqueta DUNA",
    category: "Tops",
    price: 68,
    oldPrice: 110,
    discount: 38,
    rating: 4.7,
    reviews: 122,
    badge: "Mais vendidos",
    image:
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Camiseta Slim fit",
    category: "Tops",
    price: 54,
    oldPrice: 90,
    discount: 40,
    rating: 4.4,
    reviews: 76,
    badge: "ESGOTADO",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Bolsa de couro",
    category: "Accessories",
    price: 72,
    oldPrice: 120,
    discount: 40,
    rating: 4.9,
    reviews: 188,
    badge: "Mais vendidos",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Moletom Oversised",
    category: "Tops",
    price: 44,
    oldPrice: 75,
    discount: 41,
    rating: 4.6,
    reviews: 103,
    badge: "Novo produto",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Camisa do mengao",
    category: "Tops",
    price: 58,
    oldPrice: 95,
    discount: 39,
    rating: 4.5,
    reviews: 87,
    badge: "ESGOTADO",
    image: "/products/camisa-mengao.png",
  },
  {
    id: 9,
    name: "Relogio basico",
    category: "Accessories",
    price: 95,
    oldPrice: 160,
    discount: 41,
    rating: 4.8,
    reviews: 204,
    badge: "Nunca mais se atrase!",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Calca Jeans Reta",
    category: "Bottoms",
    price: 89,
    oldPrice: 140,
    discount: 36,
    rating: 4.5,
    reviews: 112,
    badge: "Classico",
    image:
      "https://images.unsplash.com/photo-1659167099846-a0dbfc52aa2d?auto=format&fit=crop&w=800&q=80",
  },
];

export function toCartItem(product: Product): Omit<CartProduct, "quantity"> {
  return {
    id: String(product.id),
    name: product.name,
    price: product.price,
    image: product.image,
    oldPrice: product.oldPrice,
    discount: `-${product.discount}%`,
  };
}