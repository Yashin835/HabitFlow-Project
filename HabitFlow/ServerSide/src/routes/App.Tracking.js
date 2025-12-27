import express from 'express';
const router = express.Router();
import AuthenticateUser from '../middleware/Authenticate.User.js';
import ValidateSchema from '../middleware/Schema.Validator.js';
import UpdateHabitStatus from '../middleware/Track.Habit.Joi.js';
router.post('/habit/status/:Habitid', AuthenticateUser, ValidateSchema(UpdateHabitStatus));