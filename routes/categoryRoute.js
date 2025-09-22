const  category = require("../controllers/categoryControllers");
const express = require("express");
const router = express.Router();

router.post("/category", category.createCategory);

module.exports = router;
