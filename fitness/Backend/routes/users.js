// routes/users.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "secret_example";
const db = require("../db/sqlite"); // később létrehozzuk

// --- Register ---
router.post("/register", async (req, res) => {
      try {
            const { email, password } = req.body;
            if (!email || !password)
                  return res
                        .status(400)
                        .json({ error: "Hiányzó email vagy jelszó" });

            const saltRounds = 10;
            const password_hash = await bcrypt.hash(password, saltRounds);

            const sql =
                  "INSERT INTO users (email, password_hash) VALUES (?, ?)";
            await db.runAsync(sql, [email, password_hash]);
            res.json({ success: true });
      } catch (err) {
            if (err && err.message.includes("UNIQUE")) {
                  return res
                        .status(400)
                        .json({ error: "Ez az email már regisztrálva van." });
            }
            console.error(err);
            res.status(500).json({ error: "Szerverhiba" });
      }
});

// --- Login ---
router.post("/login", async (req, res) => {
      try {
            const { email, password } = req.body;
            if (!email || !password)
                  return res
                        .status(400)
                        .json({ error: "Hiányzó email vagy jelszó" });

            const user = await db.getAsync(
                  "SELECT * FROM users WHERE email = ?",
                  [email]
            );
            if (!user)
                  return res.status(401).json({ error: "Érvénytelen adatok" });

            const ok = await bcrypt.compare(password, user.password_hash);
            if (!ok)
                  return res.status(401).json({ error: "Érvénytelen adatok" });

            const token = jwt.sign(
                  { userId: user.id, email: user.email },
                  JWT_SECRET,
                  { expiresIn: "7d" }
            );
            res.json({ token });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Szerverhiba" });
      }
});

module.exports = router;
