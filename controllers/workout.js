
//[SECTION] Dependencies and Modules
const Workout = require("../models/Workout");
const auth = require('../auth');

const { errorHandler } = auth;


// [SECTION] Create Workout
module.exports.addWorkout = (req, res) => {
    
	let newWorkout = new Workout({
		userId: req.user.id,
		name : req.body.name,
		duration : req.body.duration
	});

	return newWorkout.save()
	.then((workout) => res.status(201).send(workout))
	.catch(error => errorHandler(error, req, res)); 
}


// [SECTION] Retrieve Workouts
module.exports.getMyWorkouts = (req, res) => {

	return Workout.find({})
	.then(workout => {
		if (workout.length === 0){
			res.status(404).send({ error: 'No workouts found' });
		} else{
			res.status(200).send({ workout })
		}

	})	
	.catch(error => errorHandler(error, req, res));
}

// [SECTION] Updating Workout
module.exports.updateWorkout = (req, res) => {

    let updatedWorkout = {
        name: req.body.name,
        duration: req.body.duration
    };

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, { new: true })
    .then(workout => {
        if (workout) {
            res.status(200).send({ 
                message: 'Workout updated successfully', 
                updatedWorkout: workout  
            });
        } else {
            res.status(404).send({ error: 'Workout not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};



// [SECTION] Delete Workout
module.exports.deleteWorkout = (req, res) => {

	return Workout.deleteOne({ _id: req.params.workoutId })
	.then((deleteStatus) => {
		if (deleteStatus.deletedCount === 1) {
			res.status(200).send({ message: 'Workout deleted successfully' });
		} else {
			res.status(404).send({ error: 'Workout not found' });
		}
	})
	.catch(error => errorHandler(error, req, res));
};


// [SECTION] Complete Workout Status
module.exports.completeWorkoutStatus = (req, res) => {

	let updatedWorkout = {
		status: 'completed'
	}

	return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout)
	.then((workout) => {
		if (!workout){
			res.status(404).send({ error: 'Workout not found' });
		} else{
			res.status(200).send({ 
	    	message: 'Workout status updated successfully', 
	    	updatedWorkout: workout 
	    })
		}
	})
	.catch(error => errorHandler(error, req, res));
}

