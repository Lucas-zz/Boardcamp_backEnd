import db from '../db.js';

export async function validateGame(req, res, next) {
    const { name, stockTotal, pricePerDay } = req.body;

    if (parseInt(stockTotal) <= 0 || parseInt(pricePerDay) <= 0) {
        return res.sendStatus(400);
    }

    try {
        const { rows: nameAlreadyExists } = await db.query(`
            SELECT * FROM games WHERE name=$1
        `, [name]);

        if (nameAlreadyExists) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}