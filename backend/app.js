const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));

var todos = [
  { id: "1", text: "this is a test todo 1", checked: false },
  { id: "2", text: "this is a test todo 2", checked: true },
];

app.get("/todos", function (req, res) {
  res.json(todos);
});

app.post("/todo", function (req, res) {
  var random = Math.floor(Math.random() * 1000);
  todos.push({ id: random.toString(), text: req.body.text, checked: false });
  res.json({ ok: true });
});

app.put("/todo/:id", function (req, res) {
  const id = req.params.id;
  var newTodo = {};
  todos.forEach((todo) => {
    if (todo.id === id) {
      todo.checked = req.body.checked ? true : false;
      newTodo = todo;
    }
  });
  res.json({ todo: newTodo });
});

app.delete("/todo/:id", function (req, res) {
  const id = req.params.id;

  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
