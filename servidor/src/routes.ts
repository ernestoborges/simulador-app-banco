import { Router } from "express"
import GetUserDataController from "./app/controllers/GetUserDataController";
import GetUserTransactionsController from "./app/controllers/GetUserTransactionsController";
import LoginAuthController from "./app/controllers/LoginAuthController";
import TransactionController from "./app/controllers/TransactionController";
import UserController from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddleware";
import GetUserController from "./app/controllers/GetUsersController";

const router = Router();

// criar usuario
router.post("/register", UserController.store)

// nova transação
router.post("/transaction", authMiddleware, TransactionController.execute)

//buscar transações
router.get("/transaction", authMiddleware, GetUserTransactionsController.index)

//login
router.post("/login", LoginAuthController.authenticate)

// verificação de token
router.get("/user", authMiddleware, GetUserDataController.index)

router.get("/users", GetUserController.index)



export default router;