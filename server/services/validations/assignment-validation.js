import Joi from 'joi';

let assignmentSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    points: Joi.number().min(1).max(10).required(),
    num_of_attemps: Joi.number().integer().min(1).max(100).required(),
    deadline: Joi.string().required(),
});

export default assignmentSchema;
