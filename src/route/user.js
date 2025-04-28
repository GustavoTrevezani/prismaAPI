import Router from "express";
import { PrismaClient } from "../../generated/prisma";

const router = Router();
const prisma = new PrismaClient();

// 🔵 Create - POST /users
router.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// 🟢 Read - GET /users
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});
// 🟢 Read - GET one by ID /user
router.get("/user/:id", async (req, res) => {
  try {
    const users = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// 🟡 Update - PUT /users/:id
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID do usuário pode estar errado" });
  }

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    return res.status(400).json({ error: "Nome pode estar errado" });
  }

  if (
    email !== undefined &&
    (typeof email !== "string" || email.trim() === "")
  ) {
    return res.status(400).json({ error: "Email pode estar errado" });
  }

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });
    res.json(user);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "ID do usuário pode estar errado" });
    }
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// 🔴 Delete - DELETE /users/:id
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

export default router;
