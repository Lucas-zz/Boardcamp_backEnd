import db from "../db.js";

export async function validateRental(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;

    if (parseInt(daysRented) <= 0) {
        return res.sendStatus(400);
    };

    try {
        const gameExists = await db.query(`
            SELECT * FROM games WHERE id=$1
        `, [gameId]);

        if (gameExists.rowCount === 0) {
            return res.sendStatus(400);
        };

        const customerExists = await db.query(`
            SELECT * FROM customers WHERE id=$1
        `, [customerId]);

        if (customerExists.rowCount === 0) {
            return res.sendStatus(400);
        };

        const gameDetails = await db.query(`
            SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" is null
        `, [gameId]);

        const gameStock = gameExists.rows[0].stockTotal;
        const gameRentals = gameDetails.rowCount;

        if (gameStock - gameRentals === 0) {
            return res.sendStatus(400);
        };

        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function validateCheckOutRental(req, res, next) {
    const { id } = req.params;

    try {
        const rental = await db.query(`
            SELECT * FROM rentals WHERE id=$1
        `, [id]);

        if (rental.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (rental.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }

        req.locals = rental.rows[0];

        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}