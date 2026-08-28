import { Router } from "express";
import { uploadSingle } from "../config/uploader";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
} from "../controllers/userController";

import { criarVariant, listarVariants, buscarVariant, atualizarVariant, deletarVariant } from "../controllers/variantController";

import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";

import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/userSchema";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";

import {
  createSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
} from "../controllers/saleController";

import {
  createSaleSchema,
  updateSaleSchema,
} from "../schemas/saleSchema";
import {  
  criarCart,
  listarCarts,
  buscarCart,
  atualizarCart,
  deletarCart,
} from "../controllers/cartController";

import {
  criarCartVariant,
  listarCartVariants,
  buscarCartVariant,
  atualizarCartVariant,
  deletarCartVariant,
} from "../controllers/cartVariantController";

const router = Router();

import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";

import {
  createOrderSchema,
  updateOrderSchema,
} from "../schemas/orderSchema";

// User routes

router.post(
  "/users",
  validate(createUserSchema),
  createUser
);

router.get(
  "/users",
  authMiddleware,
  getUsers
);

router.get(
  "/users/:id",
  authMiddleware,
  getUserById
);

router.put(
  "/users/:id",
  authMiddleware,
  validate(updateUserSchema),
  updateUser
);

router.delete(
  "/users/:id",
  authMiddleware,
  deleteUser
);

// Auth

router.post(
  "/login",
  login
);

// Variant routes
router.post("/variants", criarVariant);
router.get("/variants", listarVariants);
router.get("/variants/:id", buscarVariant);
router.put("/variants/:id", atualizarVariant);
router.delete("/variants/:id", deletarVariant);

// Cart routes
router.post("/carts", criarCart);
router.get("/carts", listarCarts);
router.get("/carts/:id", buscarCart);
router.put("/carts/:id", atualizarCart);
router.delete("/carts/:id", deletarCart);

// CartVariant routes
router.post("/cart-variants", criarCartVariant);
router.get("/cart-variants", listarCartVariants);
router.get("/cart-variants/:id", buscarCartVariant);
router.put("/cart-variants/:id", atualizarCartVariant);
router.delete("/cart-variants/:id", deletarCartVariant);

export default router;