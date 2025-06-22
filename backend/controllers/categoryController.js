const mongojs = require('mongojs');
const db = mongojs("mongodb://127.0.0.1:27017/ToDo", ['categories', 'carts']);

const fetchCategories = (req, res) => {
    db.categories.find((err, docs) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json({ message: "Categories fetched successfully", data: docs });
        }
    })
}

const createCategory = (req, res) => {
    const newCategory = {
        name: req.body.name,
    }

    db.categories.insert(newCategory, (err, doc) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(201).json({ message: "Category created successfully", data: doc });
        }
    })
}

const deleteCategory = (req, res) => {
    const categoryId = req.params.id;
    if (!mongojs.ObjectID.isValid(categoryId)) {
        return res.status(400).json({ error: "Id is not valid" });
    }

    db.carts.find({ category_id: mongojs.ObjectID(categoryId) }, (err, docs) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (docs.length != 0) {
            return res.status(400).json({ message: "Category NOT empty!" });
        }
        db.categories.remove({ _id: mongojs.ObjectID(categoryId) }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }
            if (result.n == 0) {
                return res.status(404).json({ message: "Category NOT found!" });
            }
            res.status(200).json({ message: "Category deleted successfully." });
        })
    })
}

module.exports = { createCategory, deleteCategory, fetchCategories }