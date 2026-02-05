import { Router } from "express";
import * as database from "../database/db.js";
const router = Router();

router.get("/", (req, res) => {
      res.send("Hello from the feladat Router!");
});

router.get("/telepules", (req, res) => {
      const telepules = req.query.telepules;

      if (!telepules) {
            return res
                  .status(400)
                  .json({ error: "Telepules parameter is required" });
      }

      const diaks = database.TelepulesToDiak(telepules);
      res.json(diaks);
});

router.get("/tanora", (req, res) => {
      const asd = database.angolTanora();
      res.json(asd);
});

router.get("/9-matematika-fizika", (req, res) => {
      const asd = database.matekfizika9();
      res.json(asd);
});
export default router;
