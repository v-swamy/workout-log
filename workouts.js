const express = require("express");
const morgan = require("morgan");

const app = express();
const host = "localhost";
const port = 3000;

const Workout = require("./lib/workout");
const workouts = require("./lib/seed-data");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sortWorkouts = workouts => {
  return workouts.slice().sort((workoutA, workoutB) => {
    return new Date(workoutA.date) - new Date(workoutB.date);
  });
};

app.get("/", (req, res) => {
  res.redirect("/workouts");
});

app.get("/workouts", (req, res) => {
  res.render("workouts", {
    workouts: sortWorkouts(workouts) });
});

app.get("/workouts/new", (req, res) => {
  res.render("new-workout", {
    path: "/workouts",
  });
});

app.get("/workouts/:workoutId/edit", (req, res) => {
  let workoutId = +req.params.workoutId;
  let workout = workouts.find(workout => workout.id === workoutId);
  res.render("edit-workout", {
    ...workout,
    path: `/workouts/${workout.id}/edit` });
});

app.post("/workouts", (req, res) => {
  let workout = new Workout(...(Object.values(req.body)));
  workouts.push(workout);
  res.redirect("/workouts");
});

app.post("/workouts/:workoutId/edit", (req, res) => {
  let workoutId = +req.params.workoutId;
  let workout = workouts.find(workout => workout.id === workoutId);
  Object.assign(workout, req.body);
  res.redirect("/workouts");
});

app.post("/workouts/:workoutId/destroy", (req, res) => {
  let workoutId = +req.params.workoutId;
  let index = workouts.findIndex(workout => workout.id === workoutId);
  workouts.splice(index, 1);
  res.redirect("/workouts");
});

// Listener
app.listen(port, host, () => {
  console.log(`Workout Log is listening on port ${port} of ${host}...`);
});