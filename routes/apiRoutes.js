const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('api/workouts', (req, res)=> {
    db.Workout.find({})
    .then(workouts => {
        res.json(workouts);
    }).catch(err=>{
        res.json(err);
    });
});

router.post('/api/workouts', (req, res) => {
    console.log(db.Workout)
    db.Workout.create({}).then(workouts => {
        res.json(workouts);
    }).catch(err=>{
        res.json(err);
    });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    console.log(body);
    db.Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      // "runValidators" will ensure new exercises meet our schema requirements
      { new: true, runValidators: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

// router.put('/api/workouts/:id', (req, res) => {
//    db.Workout.findByIdAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}})
//         .then(results=>{
//             res.json(results);
//         }).catch(err=>{
//             res.json(err);
//         });
// });

router.get('/api/workouts/range', (req, res) => {
    db.Workout.find({}).limit(7).then(workouts => {
        res.json(workouts);
    }).catch(err=>{
        res.json(err);
    });
});

module.exports = router;