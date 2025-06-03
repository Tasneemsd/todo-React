const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Todo = require('./models/Todo');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a new todo
app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const newTodo = new Todo({ title });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// Toggle completion
app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// Render health check
app.get('/', (req, res) => {
  res.send("Todo Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
