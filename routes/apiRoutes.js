const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]).then((workout) => {
      res.json(workout);
    });
  });

  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then((workout) => {
      res.json(workout);
    });
  });

  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true }
    )
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((stats) => {
        res.json(stats);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};