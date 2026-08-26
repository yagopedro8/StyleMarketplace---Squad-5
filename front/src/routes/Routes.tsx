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
        <Route element={<SignInPage />} path="/signin" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<HomePage />} path="/home" />
        <Route element={<SalePage />} path="/sale" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<ProductPage />} path="/product/:productId" />
      </Routes>
    </Router>
  );
}