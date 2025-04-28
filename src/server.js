import express from "express";
import userRoutes from "./route/user.js";
import postRoutes from "./route/post.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Usa as rotas do user
app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
