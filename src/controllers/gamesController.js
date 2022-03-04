import db from '../db.js';

export async function getGames(req, res) {
    const { name } = req.query;

    try {
        if (!name) {
            const { rows: games } = await db.query(`
                SELECT
                    games.*,
                    categories.name AS "categoryName"
                FROM games
                    JOIN categories ON games."categorieId"=categorie.id
            `);

            return res.send(games);
        }

        const { rows: games } = await db.query(`
            SELECT
                games.*,
                categories.name AS "categoryName"
            FROM games
            WHERE LOWER (name) LIKE LOWER ($1)
                JOIN categories ON games."categoryId"=category.id
        `, [`${name}%`]);

        res.send(games);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function createGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await db.query(`
            INSERT INTO
                games (name, image, "stockTotal", "categoryId", "pricePerDay")
                VALUES ($1, $2, $3, $4, $5)
        `, [name, image, parseInt(stockTotal), categoryId, parseInt(pricePerDay)]);

        req.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}