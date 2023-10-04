import Joi from 'joi';

let assignmentSchema = Joi.object({
    name: Joi.string().required(),
    points: Joi.number().min(1).max(10).required(),
    num_of_attemps: Joi.number().integer().min(1).max(100).required(),
    deadline: Joi.string().required().isoDate(),
    assignment_created: Joi.string().optional().allow(""),
    assignment_updated: Joi.string().optional().allow("")
});

export default assignmentSchema;
