import { Router } from "express";
import { PrismaClient } from "../../generated/prisma"; // ou ajuste se necessário
import { title } from "process";

const router = Router();
const prisma = new PrismaClient();

// 🔵 Criar um novo Post
router.post("/posts", async (req, res) => {
  const { title, content, authorId } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Título do post pode estar errado" });
  }
  if (!authorId || isNaN(Number(authorId))) {
    return res.status(400).json({ error: "ID do autor pode estar errado" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(authorId),
      },
    });

    res.status(201).json(post);
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({ error: "ID do autor não encontrado" });
    }
    res.status(500).json({ error: "Erro ao criar post" });
  }
});

// 🟢 Read - GET /users
router.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: { author: true },
    });
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar post" });
  }
});

router.put("/posts/:id", async (req, res) => {
  const { title, content, authorId } = req.body;
  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res.status(400).json({ error: "Nome pode estar errado" });
  }
  if (
    content !== undefined &&
    (typeof content !== "string" || content.trim() === "")
  ) {
    return res.status(400).json({ error: "Nome pode estar errado" });
  }
  if (
    authorId !== undefined &&
    (typeof authorId !== "string" || authorId.trim() === "")
  ) {
    return res.status(400).json({ error: "Nome pode estar errado" });
  }

  const UpdateData = {};
  if (title !== undefined) UpdateData.title = title;
  if (content !== undefined) UpdateData.content = title;
  if (authorId !== undefined) UpdateData.authorId = title;

  try {
    const post = await prisma.post.update({
      where: { id: Number(req.params.id) },
      data: UpdateData,
    });
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar post" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Post não encontrado" });
    }
    res.status(500).json({ error: "Erro ao deletar post" });
  }
});

export default router;
