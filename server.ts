import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("nexus.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS agendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/agendas", (req, res) => {
    try {
      const agendas = db.prepare("SELECT * FROM agendas ORDER BY created_at DESC").all();
      res.json(agendas.map((a: any) => ({
        ...a,
        data: JSON.parse(a.data)
      })));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch agendas" });
    }
  });

  app.post("/api/agendas", (req, res) => {
    const { title, date, data } = req.body;
    try {
      const info = db.prepare("INSERT INTO agendas (title, date, data) VALUES (?, ?, ?)").run(
        title,
        date,
        JSON.stringify(data)
      );
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to save agenda" });
    }
  });

  app.delete("/api/agendas/:id", (req, res) => {
    const { id } = req.params;
    try {
      db.prepare("DELETE FROM agendas WHERE id = ?").run(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete agenda" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
