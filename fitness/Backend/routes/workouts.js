// routes/workouts.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const db = require("../db/sqlite");

// --- CRUD végpontok ---
router.use(authMiddleware);

// CREATE
router.post("/", async (req, res) => {
      try {
            const { date, duration, notes, exercises } = req.body;
            if (!date || !duration)
                  return res
                        .status(400)
                        .json({ error: "date és duration kötelező" });

            const r = await db.runAsync(
                  "INSERT INTO workouts (user_id, date, duration, notes) VALUES (?, ?, ?, ?)",
                  [req.user.id, date, duration, notes || null]
            );
            const workoutId = r.lastID;

            if (Array.isArray(exercises)) {
                  const stmt = db.db.prepare(
                        "INSERT INTO exercises (workout_id, name, reps, sets, weight) VALUES (?, ?, ?, ?, ?)"
                  );
                  exercises.forEach((ex) =>
                        stmt.run(
                              workoutId,
                              ex.name,
                              ex.reps || null,
                              ex.sets || null,
                              ex.weight || null
                        )
                  );
                  stmt.finalize();
            }

            const created = await db.getAsync(
                  "SELECT * FROM workouts WHERE id = ?",
                  [workoutId]
            );
            res.status(201).json({ workout: created });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Szerverhiba" });
      }
});

// READ ALL
router.get("/", async (req, res) => {
      try {
            const workouts = await db.allAsync(
                  "SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC",
                  [req.user.id]
            );
            for (const w of workouts) {
                  const ex = await db.allAsync(
                        "SELECT * FROM exercises WHERE workout_id = ?",
                        [w.id]
                  );
                  w.exercises = ex;
            }
            res.json({ workouts });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Szerverhiba" });
      }
});

// READ ONE
router.get("/:id", async (req, res) => {
      try {
            const id = req.params.id;
            const w = await db.getAsync(
                  "SELECT * FROM workouts WHERE id = ? AND user_id = ?",
                  [id, req.user.id]
            );
            if (!w) return res.status(404).json({ error: "Nem található" });
            w.exercises = await db.allAsync(
                  "SELECT * FROM exercises WHERE workout_id = ?",
                  [w.id]
            );
            res.json({ workout: w });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Szerverhiba" });
      }
});

// UPDATE
router.put("/:id", async (req, res) => {
      try {
            const id = req.params.id;
            const { date, duration, notes, exercises } = req.body;
            const w = await db.getAsync(
                  "SELECT * FROM workouts WHERE id = ? AND user_id = ?",
                  [id, req.user.id]
            );
            if (!w) return res.status(404).json({ error: "Nem található" });

            await db.runAsync(
                  "UPDATE workouts SET date = ?, duration = ?, notes = ? WHERE id = ?",
                  [date || w.date, duration || w.duration, notes || w.notes, id]
            );

            await db.runAsync("DELETE FROM exercises WHERE workout_id = ?", [
                  id,
            ]);
            if (Array.isArray(exercises)) {
                  const stmt = db.db.prepare(
                        "INSERT INTO exercises (workout_id, name, reps, sets, weight) VALUES (?, ?, ?, ?, ?)"
                  );
                  exercises.forEach((ex) =>
                        stmt.run(
                              id,
                              ex.name,
                              ex.reps || null,
                              ex.sets || null,
                              ex.weight || null
                        )
                  );
                  stmt.finalize();
            }

            const updated = await db.getAsync(
                  "SELECT * FROM workouts WHERE id = ?",
                  [id]
            );
            updated.exercises = await db.allAsync(
                  "SELECT * FROM exercises WHERE workout_id = ?",
                  [id]
            );
            res.json({ workout: updated });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Szerverhiba" });
      }
});

// DELETE
router.delete("/:id", async (req, res) => {
      try {
            const id = req.params.id;
            const w = await db.getAsync(
                  "SELECT * FROM workouts WHERE id = ? AND user_id = ?",
                  [id, req.user.id]
            );
            if (!w) return res.status(404).json({ error: "Nem található" });

            await db.runAsync("DELETE FROM workouts WHERE id = ?", [id]);
            res.json({ success: true });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Szerverhiba" });
      }
});

// STATS
router.get("/stats", async (req, res) => {
      try {
            const totalRow = await db.getAsync(
                  "SELECT SUM(duration) AS total_minutes FROM workouts WHERE user_id = ?",
                  [req.user.id]
            );
            const total_minutes = totalRow.total_minutes || 0;

            const weekly = await db.allAsync(
                  `
      SELECT date(date) as day, SUM(duration) as minutes
      FROM workouts
      WHERE user_id = ? AND date >= date('now','-6 days')
      GROUP BY day
      ORDER BY day ASC
    `,
                  [req.user.id]
            );

            res.json({ total_minutes, weekly });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Szerverhiba" });
      }
});

module.exports = router;
