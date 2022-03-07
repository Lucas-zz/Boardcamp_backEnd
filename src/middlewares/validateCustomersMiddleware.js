import db from '../db.js';

export async function validateCustomer(req, res, next) {
    const { cpf } = req.body;
    const { id } = req.params;

    try {
        const cpfExists = await db.query(`
            SELECT id FROM customers WHERE cpf=$1
        `, [cpf]);

        const idExists = await db.query(`
            SELECT id FROM customers WHERE id=$1
        `, [id]);

        if (idExists.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (cpfExists.rowCount > 0) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function validateUpdateCustomer(req, res, next) {
    const { cpf } = req.body;
    const { id } = req.params;

    try {
        const checkCpf = await db.query(`
            SELECT * FROM customers WHERE cpf=$1 AND id!=$2
        `, [cpf, id]);

        if (checkCpf.rowCount > 0 && checkCpf.rows[0].id != id) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}