import express from "express";
import middleware from "../middleware/index.mjs";

const adminRouter = express.Router();

adminRouter.use(middleware.auth);
adminRouter.use(middleware.getUserTypeMiddleware("admin"));

// admin endpoints
adminRouter.get("/", (req, res) => {
  res.json({ message: "admin endpoint" });
});

export default adminRouter;
