
//[SECTION] Dependencies and Modules
const express = require("express");
const workoutController = require("../controllers/workout");
const {verify} = require("../auth");

//[SECTION] Routing Component
const router = express.Router();


//[SECTION] Route for Adding a Workout
router.post("/addWorkout", verify,  workoutController.addWorkout)

//[SECTION] Route for Retrieving Workouts
router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts)

//[SECTION] Route for Updating Workout
router.patch("/updateWorkout/:workoutId", verify, workoutController.updateWorkout)

//[SECTION] Route for Deleting a Workout
router.delete("/deleteWorkout/:workoutId", verify,  workoutController.deleteWorkout)

//[SECTION] Route for Complete Workout Status
router.patch("/completeWorkoutStatus/:workoutId", verify, workoutController.completeWorkoutStatus)


module.exports = router;