import db from '../db.js';

export async function getCustomers(req, res) {
    const { id } = req.params;

    let offset = '';
    let limit = '';
    let cpf = '';

    if (req.query.offset) {
        offset = req.query.offset;
    }
    if (req.query.limit) {
        limit = req.query.limit;
    }
    if (req.query.cpf) {
        cpf = req.query.cpf;
    }

    try {
        if (!cpf && !id) {
            const { rows: customers } = await db.query(`
                SELECT *
                FROM customers
                ${offset && `OFFSET ${parseInt(offset)}`}
                ${limit && `LIMIT ${parseInt(limit)}`}
            `);

            return res.send(customers);
        }

        if (!cpf && id) {
            const { rows: customers } = await db.query(`
                SELECT *
                FROM customers
                WHERE id=$1
                ${offset && `OFFSET ${parseInt(offset)}`}
                ${limit && `LIMIT ${parseInt(limit)}`}
            `, [id]);

            if (!customers) {
                return res.sendStatus(404);
            }

            return res.send(customers);
        }

        const { rows: customers } = await db.query(`
            SELECT *
            FROM customers
            WHERE cpf LIKE ($1)
            ${offset && `OFFSET ${parseInt(offset)}`}
            ${limit && `LIMIT ${parseInt(limit)}`}
        `, [`${cpf}%`]);

        res.send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await db.query(`
            INSERT INTO
                customers (name, phone, cpf, birthday)
                VALUES ($1, $2, $3, $4)
        `, [name, phone, cpf, birthday]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    const formatBirthday = birthday.split("T")[0];

    try {
        await db.query(`
            UPDATE customer
                SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE id=$5
        `, [name, phone, cpf, formatBirthday, id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}