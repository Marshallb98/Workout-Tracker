const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/api/workouts", (req, res) => {
  console.log("finding all workouts?")
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      console.log(data)
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    });
})

router.get("/api/workouts/range", (req, res) => {
  console.log("finding all workouts with range?");
  db.Workout.aggregate([
    { $limit: 7 },
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    });
});
router.post("/api/workouts", ({ body }, res) => {
  console.log(body)
  db.Workout.create({})
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router
