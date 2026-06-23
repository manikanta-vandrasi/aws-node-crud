const router = require("express").Router();
const db = require("../db");

router.post("/", async (req, res) => {
    const { name, email } = req.body;

    const result = await db.query(
        "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
        [name, email]
    );

    res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
    const result = await db.query(
        "SELECT * FROM users"
    );

    res.json(result.rows);
});

router.put("/:id", async (req, res) => {
    const { name } = req.body;

    const result = await db.query(
        "UPDATE users SET name=$1 WHERE id=$2 RETURNING *",
        [name, req.params.id]
    );

    res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
    await db.query(
        "DELETE FROM users WHERE id=$1",
        [req.params.id]
    );

    res.json({
        message: "Deleted"
    });
});

module.exports = router;