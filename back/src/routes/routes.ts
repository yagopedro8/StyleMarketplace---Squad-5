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

import {
  criarVariant,
  listarVariants,
  buscarVariant,
  atualizarVariant,
  deletarVariant,
} from "../controllers/variantController";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

import {
  createSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
} from "../controllers/saleController";

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

import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";

import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";

import {
  createUserSchema,
  updateUserSchema,
} from "../schemas/userSchema";

import {
  createSaleSchema,
  updateSaleSchema,
} from "../schemas/saleSchema";

import {
  createOrderSchema,
  updateOrderSchema,
} from "../schemas/orderSchema";

const router = Router();


// ========================
// User routes
// ========================

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


router.post(
  "/variants",
  criarVariant
);

router.get(
  "/variants",
  listarVariants
);

router.get(
  "/variants/:id",
  buscarVariant
);

router.put(
  "/variants/:id",
  atualizarVariant
);

router.delete(
  "/variants/:id",
  deletarVariant
);


// Cart routes

router.post(
  "/carts",
  criarCart
);

router.get(
  "/carts",
  listarCarts
);

router.get(
  "/carts/:id",
  buscarCart
);

router.put(
  "/carts/:id",
  atualizarCart
);

router.delete(
  "/carts/:id",
  deletarCart
);


// CartVariant routes

router.post(
  "/cart-variants",
  criarCartVariant
);

router.get(
  "/cart-variants",
  listarCartVariants
);

router.get(
  "/cart-variants/:id",
  buscarCartVariant
);

router.put(
  "/cart-variants/:id",
  atualizarCartVariant
);

router.delete(
  "/cart-variants/:id",
  deletarCartVariant
);


// Product routes

router.post(
  "/products",
  authMiddleware,
  uploadSingle,
  createProduct
);

router.get(
  "/products",
  getProducts
);

router.get(
  "/products/:id",
  getProductById
);

router.put(
  "/products/:id",
  authMiddleware,
  uploadSingle,
  updateProduct
);

router.delete(
  "/products/:id",
  authMiddleware,
  deleteProduct
);


// Sale routes

router.post(
  "/sales",
  authMiddleware,
  validate(createSaleSchema),
  createSale
);

router.get(
  "/sales",
  getSales
);

router.get(
  "/sales/:id",
  getSaleById
);

router.put(
  "/sales/:id",
  authMiddleware,
  validate(updateSaleSchema),
  updateSale
);

router.delete(
  "/sales/:id",
  authMiddleware,
  deleteSale
);

// Order routes

router.post(
  "/orders",
  authMiddleware,
  validate(createOrderSchema),
  createOrder
);

router.get(
  "/orders",
  authMiddleware,
  getOrders
);

router.get(
  "/orders/:id",
  authMiddleware,
  getOrderById
);

router.put(
  "/orders/:id",
  authMiddleware,
  validate(updateOrderSchema),
  updateOrder
);

router.delete(
  "/orders/:id",
  authMiddleware,
  deleteOrder
);

export default router;