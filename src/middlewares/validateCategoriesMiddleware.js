import db from '../db.js';

export async function validateCategory(req, res, next) {
    const { name } = req.body;

    if (!name) {
        return res.sendStatus(400);
    }

    try {
        const { rows: categoryExists } = await db.query(`
            SELECT * FROM categories WHERE name=$1
        `, [name]);

        if (!categoryExists) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}