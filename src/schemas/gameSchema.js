import joi from 'joi';

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().pattern(/^(?:http(s)?:\/\/)?/).required(),
    stockTotal: joi.string().required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.string().required(),
});

export default gameSchema;