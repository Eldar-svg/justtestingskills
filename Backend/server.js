const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const crypto = require("crypto");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const ADMIN_USERNAME = "111";
const ADMIN_PASSWORD = "111";
const JWT_SECRET = "111";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

// Добавляем заголовки CORS для поддержки авторизации

app.use(express.json());

const users = []; // Временное хранилище пользователей
const goods = [
  {
    id: crypto.randomUUID(),
    title: "Test Product",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    description: "Test Description",
    image: "https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg",
    check: false,
  },
];

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
    image,
    check: false, // Если image пустой, сохраняем как null
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
const Numbers = (array, page = 1, limit = 5) => {
  const startIndex = (page - 1) * limit; // Начальный индекс для среза
  const endIndex = page * limit; // Конечный индекс для среза
  const paginatedData = array.slice(startIndex, endIndex);
  totalPages = Math.ceil(array.length / limit);

  return {
    data: paginatedData,
    totalPages,
    currentPage: page,
  };
};
app.get("/goods", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const { data, totalPages, currentPage } = Numbers(goods, page, limit);

  res.json({
    goods: data,
    totalPages: totalPages,
    currentPage: currentPage,
  });
});

app.get("/ingrid", (req, res) => {
  const allIngredients = goods.map((item) =>
    Array.isArray(item.ingredients) ? item.ingredients : [item.ingredients]
  );

  const uniqueIngredients = [...new Set(allIngredients)];

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const { totalPages, currentPage } = Numbers(uniqueIngredients, page, limit);
  res.json({
    goods: paginatedIngredients.map((ingredient, index) => ({
      id: index + startIndex + 1 + "",
      ingredients: ingredient,
    })),
    totalPages: totalPages,
    currentPage: currentPage,
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

app.delete("/delete", async (req, res) => {
  goods.length = 0; // Очищаем массив
  res.json({ message: "All products deleted successfully" });
});

app.patch("/goods/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { check } = req.body; // Fix: Extract check from body

  if (typeof check !== "boolean") {
    return res.status(400).json({ error: "Check must be a boolean" });
  }

  const checkItem = goods.find((item) => item.id === id);
  if (!checkItem) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Update the item in place
  const updatedItem = { ...checkItem, check };
  const index = goods.findIndex((item) => item.id === id);
  goods[index] = updatedItem;

  res.json(updatedItem); // Return single object
});

app.patch("/all/check", verifyToken, async (req, res) => {
  console.log("Received PATCH /goods/check with body:", req.body);
  const { check } = req.body;
  if (typeof check !== "boolean") {
    return res.status(400).json({ error: "Check must be a boolean" });
  }
  try {
    console.log("Current goods:", goods);
    if (!Array.isArray(goods) || goods.length === 0) {
      console.log("No goods found, returning empty array");
      return res.status(200).json([]);
    }
    const updatedData = goods.map((item) => ({ ...item, check }));
    goods.splice(0, goods.length, ...updatedData);
    res.json(updatedData);
  } catch (error) {
    console.error("Error in /goods/check:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Проверка, загружены ли переменные окружения
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
