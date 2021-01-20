const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('api/workouts', (req, res)=> {
    db.Workout.find({})
    .then(workout => {
        res.json(workout);
    }).catch(err=>{
        res.json(err);
    });
});

router.post('/api/workouts', (req, res) => {
    db.Workout.create({}).then(workouts => {
        res.json(workouts);
    }).catch(err=>{
        res.json(err);
    });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    db.Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.get('/api/workouts/range', (req, res) => {
    db.Workout.find({}).limit(7).then(workouts => {
        res.json(workouts);
    }).catch(err=>{
        res.json(err);
    });
});

module.exports = router;