import db from '../db.js';
import dayjs from 'dayjs';

export async function getRentals(req, res) {
    const { offset, limit } = req.query;

    const queryCustomerId = req.query.customerId;
    const queryGameId = req.query.gameId;

    try {
        const { rows: rentals } = await db.query(`
        SELECT
            rentals.*,
            customers.name AS "customerName",
            customers.id AS "customerId",
            games.id AS "gameId",
            games.name AS "gameName",
            games."categoryId"
            categories.name AS "categoryName"
        FROM rentals
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON rentals."gameId" = games.id
            JOIN categories ON games."categoryId" = categories.id
        ${queryCustomerId && `WHERE customers.id = ${parseInt(queryCustomerId)}`}
        ${queryGameId && `WHERE games.id = ${parseInt(queryGameId)}`}
        ${offset && `OFFSET ${parseInt(offset)}`}
        ${limit && `LIMIT ${parseInt(limit)}`}
    `);

        const rentalResult = rentals.map(rental => {
            const entry = {
                ...rental,
                rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
                customer: {
                    id: rental.customerId,
                    name: rental.customerName
                },
                game: {
                    id: rental.gameId,
                    name: rental.gameName,
                    categoryId: rental.categoryId,
                    categoryName: rental.categoryName
                }
            };

            delete entry.customerId;
            delete entry.customerName;

            delete entry.gameId;
            delete entry.gameName;

            delete entry.categoryId;
            delete entry.categoryName;

            return entry;
        });

        res.send(rentalResult);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    const rentDate = dayjs().format('YYYY-MM-DD');

    try {
        const { rows: pricePerDay } = await db.query(`
            SELECT games."pricePerDay" FROM games WHERE id=$1
        `, [gameId]);

        await db.query(`
            INSERT INTO
                rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, rentDate, daysRented, null, pricePerDay.pricePerDay * daysRented, null]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function returnRental(req, res) {
    const { id } = req.params;

    const returnDate = dayjs().format('YYYY-MM-DD');
    const rentDate = req.locals.rentDate;

    const originalPrice = parseInt(req.locals.originalPrice);
    const daysRented = parseInt(req.locals.daysRented);

    const pricePerDay = originalPrice / daysRented;

    const delayDays = dayjs().diff(dayjs(rentDate).add(daysRented, 'day'), 'day');

    const delayFee = delayDays > 0 ? parseInt(delayDays) * pricePerDay : 0;

    try {
        await db.query(`
            UPDATE rentals
                SET "returnDate"=$1, "delayFee"=$2
            WHERE id=$3 
        `, [returnDate, delayFee, id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;

    try {
        const result = await db.query(`
            SELECT * FROM rentals WHERE id=$1
        `, [id]);

        if (result.rowCount === 0) {
            return res.status(409).send("Id não encontrado.");
        }

        await db.query(`
            DELETE FROM rentals WHERE id=$1
        `, [id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}
