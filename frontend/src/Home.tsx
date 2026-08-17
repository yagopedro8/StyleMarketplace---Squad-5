import { useMemo, useState } from "react";
import {
  Heart,
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
  ChevronDown,
  Grid3X3,
  List,
  Star,
  SlidersHorizontal,
  ArrowRight,
  Check,
} from "lucide-react";

type Category =
  | "All"
  | "Tops"
  | "Bottoms"
  | "Dresses"
  | "Shoes"
  | "Accessories";

type Product = {
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

const products: Product[] = [
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
    image: "/products/camiseta-slim.png",
      
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
  /* Colocar imagem ou ignorar  */
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
];

const categories: Category[] = [
  "All",
  "Tops",
  "Bottoms",
  "Dresses",
  "Shoes",
  "Accessories",
];

const sizes = ["XS", "S", "M", "L", "XL", "6", "8", "10", "11", "28", "30", "32", "34"];

function Home() {
  const [category, setCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "Rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [category, search, sort]);

  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  }

  function addToCart() {
    setCartCount((count) => count + 1);
  }

  function toggleSize(size: string) {
    setSelectedSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size]
    );
  }

  function loadMore() {
    setVisibleProducts((current) => current + 3);
  }

  function handleSubscribe() {
    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  }

  return (
    <div className="app">
      <div className="top-bar">
        Free shipping on orders over $100 | New arrivals daily
      </div>

      <header className="header">
        <div className="header-inner">
          <button
            className="mobile-menu-button icon-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <a className="logo" href="/">
            <span className="logo-mark">S</span>
            <span>STYLE</span>
          </a>

          <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
            <a href="#new">New In</a>
            <a href="#women">Women</a>
            <a href="#men">Men</a>
            <a href="#sale">Sale</a>
          </nav>

          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setVisibleProducts(6);
              }}
            />
          </div>

          <div className="header-actions">
            <button className="icon-button" aria-label="Favorites">
              <Heart size={18} />
            </button>

            <button className="user-button" aria-label="Account">
              <UserRound size={16} />
              <span>JD</span>
            </button>

            <button className="cart-button" aria-label="Shopping bag">
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="sale">
          <div className="hero-content">
            <span className="hero-kicker">LIMITED TIME ONLY</span>
            <h1>MEGA SALE</h1>
            <p>
              Up to 70% off on selected items. Limited time offer - don't miss
              out!
            </p>

            <div className="hero-actions">
              <button>Free shipping on all sale items</button>
              <button>Extra 10% off for members</button>
            </div>
          </div>
        </section>

        <section className="sale-stats">
          <div>
            <strong>70%</strong>
            <span>Max Discount</span>
          </div>

          <div>
            <strong>500+</strong>
            <span>Items on Sale</span>
          </div>

          <div>
            <strong>48h</strong>
            <span>Time Left</span>
          </div>

          <div>
            <strong>Free</strong>
            <span>Shipping</span>
          </div>
        </section>

        <section className="shop-section">
          <div className="mobile-filter-bar">
            <button
              onClick={() => setFiltersOpen((open) => !open)}
              className="filter-mobile-button"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <span>{filteredProducts.length} products</span>
          </div>

          <aside className={`filters ${filtersOpen ? "mobile-open" : ""}`}>
            <div className="filters-header">
              <h2>Filters</h2>

              <button
                className="close-filters"
                onClick={() => setFiltersOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="filter-group">
              <h3>Category</h3>

              {categories.slice(1).map((item) => (
                <label className="radio-option" key={item}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() => {
                      setCategory(item);
                      setVisibleProducts(6);
                    }}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h3>Size</h3>

              <div className="size-grid">
                {sizes.map((size) => (
                  <label className="size-option" key={size}>
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => toggleSize(size)}
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              className="clear-filters"
              onClick={() => {
                setCategory("All");
                setSelectedSizes([]);
                setSearch("");
              }}
            >
              Clear filters
            </button>
          </aside>

          <div className="products-area">
            <div className="products-heading">
              <div>
                <span className="section-eyebrow">CURATED FOR YOU</span>
                <h2>Sale Items</h2>
                <p>{filteredProducts.length} products found</p>
              </div>

              <div className="products-controls">
                <div className="sort-select">
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                  <ChevronDown size={15} />
                </div>

                <button className="view-button active" aria-label="Grid view">
                  <Grid3X3 size={16} />
                </button>

                <button className="view-button" aria-label="List view">
                  <List size={17} />
                </button>
              </div>
            </div>

            {displayedProducts.length > 0 ? (
              <div className="product-grid">
                {displayedProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image-wrapper">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />

                      <span className="discount-badge">
                        -{product.discount}%
                      </span>

                      <span className="product-badge">{product.badge}</span>

                      <button
                        className={`favorite-button ${
                          favorites.includes(product.id) ? "liked" : ""
                        }`}
                        onClick={() => toggleFavorite(product.id)}
                        aria-label={`Favorite ${product.name}`}
                      >
                        <Heart
                          size={17}
                          fill={
                            favorites.includes(product.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>

                    <div className="product-info">
                      <div className="product-meta">
                        <span>{product.category}</span>

                        <div className="rating">
                          <Star size={12} fill="currentColor" />
                          <strong>{product.rating}</strong>
                          <small>({product.reviews})</small>
                        </div>
                      </div>

                      <h3>{product.name}</h3>

                      <div className="price-row">
                        <strong>${product.price}</strong>
                        <del>${product.oldPrice}</del>
                        <span>
                          Save ${product.oldPrice - product.price}
                        </span>
                      </div>

                      <button className="add-cart-button" onClick={addToCart}>
                        <ShoppingBag size={15} />
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Search size={32} />
                <h3>No products found</h3>
                <p>Try another search or clear your filters.</p>
              </div>
            )}

            {visibleProducts < filteredProducts.length && (
              <button className="load-more" onClick={loadMore}>
                Load More Products
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-content">
            <span className="newsletter-kicker">STAY IN THE LOOP</span>
            <h2>Don't Miss Future Sales!</h2>
            <p>
              Subscribe to our newsletter and be the first to know about
              exclusive sales and special offers.
            </p>

            {subscribed ? (
              <div className="success-message">
                <Check size={18} />
                You're subscribed! Welcome to STYLE.
              </div>
            ) : (
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <button onClick={handleSubscribe}>Subscribe</button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 STYLE Marketplace</span>
        <span>Fashion made simple.</span>
      </footer>
    </div>
  );
}

export default Home;