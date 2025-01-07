// jwt-auth-server/server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Для парсинга JSON в теле запросов

let users = []; // Хранилище пользователей (для примера)

const JWT_SECRET = process.env.JWT_SECRET;

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Хешируем пароль перед сохранением
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully' });
});

// Логин пользователя
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Генерация JWT токена
  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: '1h', // Токен будет действовать 1 час
  });

  res.json({ token });
});

// Защищенный маршрут (требуется токен)
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Миддлвар для проверки JWT
function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
