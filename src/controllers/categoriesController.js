import db from '../db.js';

export async function getCategories(req, res) {
    let offset = '';
    let limit = '';

    if (req.query.offset) {
        offset = req.query.offset;
    }
    if (req.query.limit) {
        limit = req.query.limit;
    }

    try {
        const { rows: categories } = await db.query(`
            SELECT *
            FROM categories
            ${offset && `OFFSET ${parseInt(offset)}`}
            ${limit && `LIMIT ${parseInt(limit)}`}
        `);

        res.send(categories);
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