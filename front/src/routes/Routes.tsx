import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SignInPage } from "../pages/SignInPage";
import { SignUpPage } from "../pages/SignUpPage";
import { HomePage } from "../pages/HomePage";
import { SalePage } from "../pages/SalePage";
import { CartPage } from "../pages/CartPage";
import { ProductPage } from "../pages/ProductPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}