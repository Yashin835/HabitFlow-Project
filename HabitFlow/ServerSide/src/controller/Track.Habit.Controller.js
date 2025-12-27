import Habit from "../models/Habit.js";
import User from "../models/User.js";
import HabitTracking from "../models/Habit.Tracking.js";
import ValidateHabitTrackDate from "../utils/Validate.Habit.Track.Date.js";

const TrackHabitRecord = async (req, res) => {
    try {
        const Habitid = req.params.Habitid;
        const Userid = req.user.id;
        const { status, notes, date, LogReason } = req.body;


        const UserExist = await User.findById(Userid)

        if (!UserExist) {
            return response.json(404).json({
                message: "User Does not Exist",
                details: `User with This ${Userid} not Exist in Database`
            })
        }
        const HabitExists = await Habit.findById(Habitid);

        if (!HabitExists) {
            return res.status(404).json({
                success: false,
                message: "Habit not found",
                details: `Habit with ${Habitid} not exist in database`
            });
        }

        const isOwner = HabitExists.userId.toString() === Userid;

        if (!isOwner) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to track this habit",
                details: "User does not own this habit"
            })
        }

        const dateObj = new Date(date);
        const HabitCreatedAt = new Date(HabitExists.createdAt);
        const isValidDate = ValidateHabitTrackDate(dateObj, HabitCreatedAt);

        if (isValidDate.valid === false) {
            return res.status(400).json({
                success: false,
                message: "Invalid date for tracking habit",
                details: isValidDate.message
            });
        }

        const existingRecord = await HabitTracking.findOne({
            userId: Userid,
            habitId: Habitid,
            date: dateObj
        })


        if (existingRecord) {
            existingRecord.status = status;
            existingRecord.notes = notes || existingRecord.notes;
            existingRecord.logReason = LogReason || existingRecord.logReason;
            await existingRecord.save();

            return res.status(200).json({
                success: true,
                message: "Habit tracking record updated successfully",
                data: existingRecord
            });

        } else {
            const newHabitTracking = new HabitTracking({
                userId: Userid,
                habitId: Habitid,
                status: status,
                notes: notes,
                logReason: LogReason,
                date: dateObj
            });

            await newHabitTracking.save();

            return res.status(201).json({
                success: true,
                message: "Habit tracking record created successfully",
                data: newHabitTracking
            });
        }


    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                details: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            details: error.message,
            timestamp: new Date().toISOString()
        });

    }
};

export default TrackHabitRecord;