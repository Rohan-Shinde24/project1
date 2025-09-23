const  category = require("../controllers/categoryControllers");
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const express = require("express");
const router = express.Router();

router.post("/category", authMiddleware, adminMiddleware, category.createCategory);
router.get("/allcategory", authMiddleware, adminMiddleware, category.getAllCategory);
router.put("/updatecategory", authMiddleware, adminMiddleware, category.updateCategory);
router.put("/deletecategory",  authMiddleware,adminMiddleware, category.deleteCategory);
router.get("/alldeletecategory", authMiddleware, adminMiddleware, category.allDeleteCategory);

module.exports = router;
