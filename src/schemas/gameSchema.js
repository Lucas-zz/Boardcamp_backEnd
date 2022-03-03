import joi from 'joi';

const gameSchema = joi.object({
    name: joi.string().required(),
    pricePerDay: joi.number().required(),
});

export default gameSchema;