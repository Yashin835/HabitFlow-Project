import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: { type: String, required: true, unique: true, },
    description: { type: String, default: "" },

    category: {
        type: String,
        enum: [
            "health",
            "fitness",
            "productivity",
            "learning",
            "mindfulness",
            "diet",
            "sleep",
            "hobby",
            "social",
            "finance",
            "none",
        ],
        default: "none",
    },

    logo: {
        type: String,
        default: "https://www.svgrepo.com/show/354202/habit.svg",
    },

    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
        default: "daily",
    },

    reminder: {
        enabled: { type: Boolean, default: false },
        time: {
            type: String, default: "",
        },
        timezone: {
            type: String, default: "",
        }
    }
    ,
    priority: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        default: 0,
    }
}, { timestamps: true });


HabitSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
})

const Habit = mongoose.models.Habit || mongoose.model("Habit", HabitSchema);

export default Habit;
