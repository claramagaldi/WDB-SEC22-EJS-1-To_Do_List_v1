// REQUIRE //
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// APP //
const app = express();

//VARs//
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// USE //
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

// GET //
app.get("/", function(req, res) {

  let day = date.getDate();
  //let day = date.getDay();

  res.render("list", {
    listTitle: day,
    listItems: items
  });

})

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", listItems: workItems});
})

app.get("/about", function(req, res) {
  res.render("about");
})

// POST //

app.post("/", function(req, res) {

  let item = req.body.newItem;

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

})

// LISTEN //
app.listen(3000, function() {
  console.log("Server started on port 3000.");
})
