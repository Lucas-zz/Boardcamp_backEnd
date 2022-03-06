import db from '../db.js';

export async function getCustomers(req, res) {
    const { cpf } = req.query;
    const { id } = req.params;

    try {
        if (!cpf && !id) {
            const { rows: customers } = await db.query(`
                SELECT * FROM customers
            `);

            return res.send(customers);
        }

        if (!cpf && id) {
            const { rows: customers } = await db.query(`
                SELECT * FROM customers WHERE id=$1
            `, [id]);

            return res.send(customers);
        }

        const { rows: customers } = await db.query(`
            SELECT * FROM customers WHERE cpf LIKE ($1)
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
    const { name, phone, cpf, birthday } = req.query;
    const { id } = req.params;

    try {
        await db.query(`
            UPDATE customer
                SET name=$1, phone=$2, cpf=$3, birthday=$4
            WHERE id=$5
        `, [name, phone, cpf, birthday, id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}