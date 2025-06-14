const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let lessons = [];
let idCounter = 1;

app.get('/lessons', (req, res) => {
  res.json(lessons);
});

app.post('/lessons', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Введите название' });

  const newLesson = { id: idCounter++, title, description };
  lessons.push(newLesson);
  res.status(201).json(newLesson);
});

app.delete('/lessons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  lessons = lessons.filter(lesson => lesson.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
