const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
    .limit(7)
    .then((workouts) => {
      res.json(workouts)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.get('/api/workouts', (req, res) => {
  db.Workout.find({})
    .sort({ day: -1 })
    .limit(1)
    .then((dbWorkout) => {
      res.json(dbWorkout)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.put('/api/workouts/:id', (req, res) => {
  let urlData = req.params
  let data = req.body
  db.Workout.updateOne(
    { _id: urlData.id },
    {
      $push: {
        exercises: [
          {
            type: data.type,
            name: data.name,
            duration: data.duration,
            distance: data.distance,
            weight: data.weight,
            reps: data.reps,
            sets: data.sets,
          },
        ],
      },
    },
  )
    .then((dbUpdate) => {
      res.json(dbUpdate)
    })
    .catch((err) => {
      res.json(err)
    })
})

router.post('/api/workouts', (req, res) => {
  let data = req.body

  db.Workout.create({
    day: new Date().setDate(new Date().getDate()),
  })
    .then((dbUpdate) => {
      res.json(dbUpdate)
    })
    .catch((err) => {
      res.json(err)
    })
})

module.exports = router
