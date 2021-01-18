const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

router.get('/api/workouts', (req, res) => {
    Workout.find({}).then(workouts => {res.json(workouts)})
        .catch(err => {res.json(err)});
});

router.post('/api/workouts', ({body}, res) => {
    Workout.create({body}).then(workouts => {res.json(workouts)})
        .catch(err => {res.json(err)});
});

router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: [req.body]}})
         .then(results => {res.json(results)})
            .catch(err => {res.json(err)});
});

router.get('/api/workouts/range', (req, res) => {
    Workout.find({}).then(workouts => {res.json(workouts)})
        .catch(err => {res.json(err)});
});

module.exports = router;