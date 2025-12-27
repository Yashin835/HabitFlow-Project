const ValidateHabitTrackDate = (date, HabitCreatedAt) => {
    const today = new Date();

    if (isNaN(date.getTime())) {
        return { valid: false, message: "Invalid date format" };
    }

    if (date < HabitCreatedAt) {
        return { valid: false, message: "Cannot log before habit was created" };
    }

    if (date > today) {
        return { valid: false, message: "Cannot log future dates" };
    }

    return { valid: true };
};

export default ValidateHabitTrackDate;