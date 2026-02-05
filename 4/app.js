import express from "express";
import asd from "./routes/feladatRouter.js";
const app = express();
app.use(express.json());
app.use("/", asd);
app.use((req, res, next) => {
      next();
});

app.listen(3321, () => {
      console.log("Server is running on port 3321");
});
