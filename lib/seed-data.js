const Workout = require("./workout");

let workout1 = new Workout("04/27/2023", "Squat", "225", "5", "5");
let workout2 = new Workout("04/24/2023", "Squat", "225", "5", "6");
let workout3 = new Workout("04/25/2023", "Squat", "230", "3", "4");
let workout4 = new Workout("04/28/2023", "Squat", "230", "5", "5");
let workout5 = new Workout("04/22/2023", "Squat", "250", "1", "1");

module.exports = [workout1, workout2, workout3, workout4, workout5];