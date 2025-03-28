const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const crypto = require("crypto");
const morgan = require("morgan");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
app.use(morgan("combined"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// Добавляем заголовки CORS для поддержки авторизации
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());

const users = []; // Временное хранилище пользователей
const goods = [];

// Middleware для проверки токена
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Регистрация пользователя
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: crypto.randomUUID(),
    username,
    password: hashedPassword,
    role,
  };
  users.push(newUser);

  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

// Добавление товаров
app.post("/goods", verifyToken, async (req, res) => {
  const { title, description, image, ingredients } = req.body;

  if (!title || !description || !ingredients) {
    return res
      .status(400)
      .json({ message: "Title, description, and ingredients are required" });
  }

  const existingGoods = goods.find((item) => item.title === title);
  if (existingGoods) {
    return res.status(400).json({ message: "Item already exists" });
  }

  const newGoods = {
    id: crypto.randomUUID(),
    title,
    ingredients,
    description,
    image, // Если image пустой, сохраняем как null
  };

  goods.push(newGoods);
  res.status(201).json({ message: "Item added successfully", goods: newGoods });
});

// Получение данных текущего пользователя

// Логин пользователя
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Проверка админа
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { id: "admin", username, role: "admin" },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res
      .status(200)
      .json({ message: "Admin logged in", role: "admin", token });
  }

  // Проверка обычного пользователя
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token, role: user.role });
});

// Получение списка пользователей (для тестов)
app.get("/register", (req, res) => {
  res.json(users);
});

app.get("/login", (req, res) => {
  res.json(users);
});

app.get("/current-user", verifyToken, (req, res) => {
  console.log("Request to /current-user received, user:", req.user);

  if (req.user.role === "admin") {
    return res.json({ username: req.user.username, role: "admin" });
  }

  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ username: user.username, role: user.role });
});

app.get("/goods", (req, res) => {
 
  const page = parseInt(req.query.page) || 1; // Текущая страница
  const limit = parseInt(req.query.limit) || 5; // Количество товаров на странице
  const startIndex = (page - 1) * limit; // Начальный индекс для среза
  const endIndex = page * limit; // Конечный индекс для среза

  // Пагинация с учетом текущей страницы и лимита
  const paginatedProducts = goods.slice(startIndex, endIndex); // Пагинация, срез товаров
  
  // Отправка данных с пагинацией
  res.json({
    goods: paginatedProducts,
    totalPages: Math.ceil(goods.length / limit), // Правильное использование массива goods
    currentPage: page,
  });
  
});

app.get("/goods/:id", async (req, res) => {
  const { id } = req.params;
  const product = goods.find((item) => item.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// Обновление продукта по ID
app.put("/goods/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  // Находим продукт в базе данных или массиве (в твоем случае это, возможно, просто массив)
  let product = goods.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Обновляем данные продукта
  product = { ...product, ...updatedProduct };

  // Здесь ты можешь записывать обновленные данные обратно в базу данных
  // Например, если у тебя это просто массив, то можно обновить элемент в массиве
  const productIndex = goods.findIndex((item) => item.id === id);
  goods[productIndex] = product;

  // Отправляем обновленные данные клиенту
  res.json(product);
});

app.delete("/goods/:id", async (req, res) => {
  const { id } = req.params;

  const product = goods.findIndex((item) => item.id === id);

  if (product === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Обновляем данные продукта
  goods.splice(product, 1);
  res.json(product);
});





// Проверка, загружены ли переменные окружения
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
