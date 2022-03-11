import db from '../db.js';

export async function validateGame(req, res, next) {
    const { name, stockTotal, pricePerDay, categoryId } = req.body;

    if (parseInt(stockTotal) <= 0 || parseInt(pricePerDay) <= 0) {
        return res.sendStatus(400);
    }

    try {
        const nameAlreadyExists = await db.query(`
            SELECT id FROM games WHERE name=$1
        `, [name]);

        const hasCategory = await db.query(`
            SELECT id FROM categories WHERE id=$1
        `, [categoryId]);

        if (nameAlreadyExists.rowCount > 0) {
            return res.sendStatus(409);
        }

        if (hasCategory.rowCount === 0) {
            return res.sendStatus(400);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}