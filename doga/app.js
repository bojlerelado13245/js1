const express = require("express");
const app = express();
const PORT = 3311;

app.use(express.json());

let products = [
      { id: 1, name: "Alma", price: 300, amount: 50 },
      { id: 2, name: "Banán", price: 450, amount: 30 },
];

app.get("/api/products", (req, res) => {
      res.json(products);
});

app.post("/api/products", (req, res) => {
      const { name, price, amount } = req.body;

      if (!name || price == null || amount == null) {
            return res.status(400).json({ error: "missing data" });
      }

      const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            name,
            price,
            amount,
      };

      products.push(newProduct);
      res.status(201).json(newProduct);
});

app.put("/api/car/:id", (req, res) => {
      const id = parseInt(req.params.id);
      const { name, price, amount } = req.body;

      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
            return res.status(404).json({ error: "product not found" });
      }

      products[index] = { id, name, price, amount };
      res.json(products[index]);
});

app.listen(PORT, () => {
      console.log(`szalad: ${PORT}`);
});
