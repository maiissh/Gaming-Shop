const express = require("express");
const router = express.Router();

const {
  createCategory,
  deleteCategory,
  fetchCategories
} = require("../controllers/categoryController");

router.get("/", fetchCategories);

router.post("/", createCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
