import db from '../db.js';

export async function getCategories(req, res) {
    try {
        const result = await db.query(`
            SELECT * FROM categories
        `);

        res.send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function createCategory(req, res) {
    const category = req.body;

    try {
        await db.query(`
            INSERT INTO
                categories (name)
                VALUES ($1)
        `, [category.name]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}