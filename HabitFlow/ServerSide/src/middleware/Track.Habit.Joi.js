import Joi from "joi";

const UpdateHabitStatus = Joi.object({
    status: Joi.string().valid('skipped', 'pending', 'completed').required(),
    notes: Joi.string().allow('', null).max(500).optional(),
    date: Joi.date().required().iso(),
    logReason: Joi.string().allow('', null).max(20).optional(),
}).unknown(false)

export default UpdateHabitStatus;