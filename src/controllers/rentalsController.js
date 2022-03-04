import db from '../db.js';
import dayjs from 'dayjs';

export async function getRentals(req, res) {

}

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    const rentDate = dayjs().format('yyyy-MM-dd');

    try {
        const { rows: pricePerDay } = await db.query(`
            SELECT games."pricePerDay" FROM games WHERE id=$1
        `, [gameId]);

        await db.query(`
            INSERT INTO
                rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFree")
                VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, rentDate, daysRented, null, pricePerDay.pricePerDay * daysRented, null]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function returnRental(req, res) {

}

export async function deleteRental(req, res) {
    const { id } = req.params;

    try {
        await db.query(`
            DELETE FROM rentals WHERE id=$1
        `, [id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}