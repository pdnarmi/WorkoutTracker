const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    Day:{
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type:{
                type: String,
                trim: true,
                requried: 'Enter type of exercise'
            },
            name:{
                type: String,
                trim: true,
                required: "Enter exercise name"
            },
            weight:{
                type: Number
            },
            reps:{
                type: Number
            },
            sets:{
                type: Number
            },
            distance:{
                type: Number
            }
        }
    ]
},
{
    toJSON:{
        virtuals: true
    }
});

WorkoutSchema.virtual('totalDuration').get(function(){
    return this.exercise.reduce((total, exercise)=>{
        return total + exercise.duration;
    }, 0);
});
WorkoutSchema.virtual('totalWeight').get(function(){
    return this.exercise.reduce((total, exercise)=>{
        return total + exercise.weight;
    }, 0);
});

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;