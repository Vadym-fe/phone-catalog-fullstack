import express from 'express';
import cors from "cors";
import productsRouter from "./routes/products.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
const PORT = 4200;

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: 'Phone Catalog API is running!' });
});

app.use('/api/products', productsRouter);

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
