export default function validateSchemaMiddleware(schema) {
    return (req, res, next) => {
        const validatation = schema.validate(req.body);
        if (validatation.error) {
            return res.status(400).send('Schema inválido.');
        }

        next();
    }
}