import joi from 'joi';

const HabitSchema = joi.object({
    title: joi.string().min(3).max(20).required(),
    description: joi.string().max(50).optional().allow(''),
    category: joi.string().valid('health', 'fitness', 'productivity', 'learning', 'mindfulness', 'diet', 'sleep', 'hobby', 'social', 'finance', 'none').optional(),
    logo: joi.string().uri().optional(),
    frequency: joi.string().valid('daily', 'weekly', 'monthly').required(),
    priority: joi.number().integer().min(0).max(5).optional(),
    status: joi.string().valid('active', 'paused', 'completed').optional(),
    reminder: joi.object({
        enabled: joi.boolean().optional(),
        time: joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional().allow(''),
        timezone: joi.string().optional().allow('')
    }).optional()
})


export default HabitSchema;