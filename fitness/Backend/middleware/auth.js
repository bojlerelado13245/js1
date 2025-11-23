// middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "secret_example";

function authMiddleware(req, res, next) {
      const auth = req.headers.authorization;
      if (!auth) return res.status(401).json({ error: "Nincs token" });
      const parts = auth.split(" ");
      if (parts.length !== 2 || parts[0] !== "Bearer")
            return res.status(401).json({ error: "Hibás token" });

      jwt.verify(parts[1], JWT_SECRET, (err, payload) => {
            if (err)
                  return res.status(401).json({ error: "Érvénytelen token" });
            req.user = { id: payload.userId, email: payload.email };
            next();
      });
}

module.exports = authMiddleware;
