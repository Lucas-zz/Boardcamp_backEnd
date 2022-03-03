import joi from 'joi';

const clientSchema = joi.object({
    name: joi.string().required(),
    phone: joi.number().required(),
    cpf: joi.number().required(),
    birthday: joi.date(),
});

export default clientSchema;