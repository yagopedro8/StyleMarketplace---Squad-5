import { Router } from "express";

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

const router = Router();

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

// Product routes
router.post(
  "/products",
  authMiddleware,
  validate(createProductSchema),
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
  validate(updateProductSchema),
  updateProduct
);

router.delete(
  "/products/:id",
  authMiddleware,
  deleteProduct
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

export default router;