import db from '../db.js';

export async function getCategories(req, res) {
    const { offset, limit } = req.query;

    try {
        const result = await db.query(`
            SELECT *
            FROM categories
            ${offset && `OFFSET ${parseInt(offset)}`}
            ${limit && `LIMIT ${parseInt(limit)}`}
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