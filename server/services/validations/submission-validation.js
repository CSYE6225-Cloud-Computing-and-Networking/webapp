import Joi from 'joi';

let submissionSchema = Joi.object({
    submission_url: Joi.string().required(),
    submission_date: Joi.string().optional().allow(""),
    submission_updated: Joi.string().optional().allow("")
});

export default submissionSchema;
