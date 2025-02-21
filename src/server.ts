import express, { Request, Response } from "express";
import booksRoutes from "./routes/book.routes";
import authorRoutes from "./routes/author.routes";
import userRoutes from "./routes/user.routes"
import loansRoutes from "./routes/loan.routes"


const app = express();
const port = 3000;

app.use(express.json());

app.use("/books", booksRoutes);
app.use("/authors", authorRoutes);
app.use("/users", userRoutes);
app.use("/loans", loansRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
