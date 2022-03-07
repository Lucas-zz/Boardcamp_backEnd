import db from '../db.js';

export async function getGames(req, res) {
    const { name } = req.query;
    let offset = '';
    let limit = '';

    if (req.query.offset) {
        offset = req.query.offset;
    }
    if (req.query.limit) {
        limit = req.query.limit;
    }

    try {
        if (!name) {
            const { rows: games } = await db.query(`
                SELECT
                    games.*,
                    categories.name AS "categoryName"
                FROM games
                    JOIN categories ON games."categoryId"=categories.id
                ${offset && `OFFSET ${parseInt(offset)}`}
                ${limit && `LIMIT ${parseInt(limit)}`}
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
            ${offset && `OFFSET ${parseInt(offset)}`}
            ${limit && `LIMIT ${parseInt(limit)}`}
        `, [`${name}%`]);

        res.send(games);
    } catch (error) {
        console.log(error);
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
        `, [name, image, parseInt(stockTotal), parseInt(categoryId), parseInt(pricePerDay)]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}