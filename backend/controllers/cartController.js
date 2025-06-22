const mongojs = require('mongojs');
const db = mongojs("mongodb://127.0.0.1:27017/ToDo", ['categories', 'carts']);



const updateCart = (req, res) => {
    const cartId = req.params.id;
    if (!mongojs.ObjectID.isValid(cartId)) {
        return res.status(400).json({ error: "Id is not valid" });
    }

    const toUpdate = {};
    if (req.body.name) {
        toUpdate.name = req.body.name;
    }

    db.carts.update({ _id: mongojs.ObjectID(cartId) }, { $set: toUpdate }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.n == 0) {
            return res.status(404).json({ message: "Cart NOT found" });
        }
        if (result.nModified != 0) {
            return res.status(200).json({ message: "Cart updated successfully." });
        }
        res.status(500).json({ error: "Could not update the cart" });
    })
}

db.categories.insertItem(newCategory, (err, doc) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(201).json({ message: "Category created successfully", data: doc });
        }
    })

    const deleteItem = (req, res) => {
        const categoryId = req.params.id;
        if (!mongojs.ObjectID.isValid(categoryId)) {
            return res.status(400).json({ error: "Id is not valid" });
        }
    }



const fetchCartsInCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    if (!mongojs.ObjectID.isValid(categoryId)) {
        return res.status(400).json({ error: "Id is not valid" });}}