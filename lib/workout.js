const nextId = require("./next-id");

class Workout {
  constructor(date, exercise, weight, sets, reps) {
    this.id = nextId();
    this.date = date;
    this.exercise = exercise;
    this.weight = weight;
    this.sets = sets;
    this.reps = reps;
  }
}

module.exports = Workout;