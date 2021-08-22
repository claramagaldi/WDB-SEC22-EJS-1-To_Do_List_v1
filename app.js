// REQUIRE //
const express = require("express");
const bodyParser = require("body-parser");

// APP //
const app = express();

//VARs//
let items = ["Buy Food", "Cook Food", "Eat Food"];

// USE //
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

// GET //
app.get("/", function(req, res) {

  let today = new Date();
  let currentDay = today.getDay();
  let day = "";

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  day = today.toLocaleDateString("en-us", options);

  res.render("list", {
    kindOfDay: day,
    listItems: items
  });

})

app.post("/", function(req, res) {

  let item = req.body.newItem;
  items.push(item);

  res.redirect("/");

})

// LISTEN //
app.listen(3000, function() {
  console.log("Server started on port 3000.");
})
