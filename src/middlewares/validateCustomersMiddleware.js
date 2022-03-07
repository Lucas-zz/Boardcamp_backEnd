import db from '../db.js';

export async function validateCustomer(req, res, next) {
    const { cpf } = req.body

    try {
        const cpfExists = await db.query(`
            SELECT * FROM customers WHERE cpf=$1
        `, [cpf]);

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
        const { rows: checkCpf } = await db.query(`
            SELECT * FROM customers WHERE cpf=$1
        `, [cpf]);

        if (checkCpf && checkCpf.id != id) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        return res.status(500).send(error);
    }
}