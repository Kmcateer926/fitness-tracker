const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: { type: Date, default: Date.now() },

    exercises: [
      {
        type: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
        duration: {
          type: Number,
        },
        distance: {
          type: Number,
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
      },
    ],
  },
//   {
//     toJSON: { virtuals: true },
//   }
);

WorkoutSchema.virtual('totalDuration').get(function() {
    let totalTime = 0
    for (let i = 0; i < this.exercises.length; i++){
        totalTime += this.exercises[i].duration;
    }
    return totalTime;
  });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
