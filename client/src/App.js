import React, { useState, useEffect } from 'react';
const tg = window.Telegram.WebApp;

tg.ready(); // говорим Telegram, что всё загружено

tg.expand(); // разворачиваем на весь экран

function App() {
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const API_URL = 'http://localhost:4000/lessons';

  // Загружаем уроки при старте
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setLessons(data))
      .catch((err) => console.error('Ошибка при загрузке:', err));
  }, []);

  const addLesson = () => {
    if (!title.trim()) return;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((newLesson) => {
        setLessons((prev) => [...prev, newLesson]);
        setTitle('');
        setDescription('');
      })
      .catch((err) => console.error('Ошибка при добавлении:', err));
  };

  const deleteLesson = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
      })
      .catch((err) => console.error('Ошибка при удалении:', err));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>📚 Мои уроки (с сервером)</h2>

      <input
        placeholder="Название урока"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />

      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      ></textarea>

      <button onClick={addLesson} style={{ padding: '10px 15px', marginBottom: '20px' }}>
        ➕ Добавить урок
      </button>

      {lessons.map((lesson) => (
        <div key={lesson.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <strong>{lesson.title}</strong>
          <p>{lesson.description}</p>
          <button onClick={() => deleteLesson(lesson.id)}>❌ Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default App;
