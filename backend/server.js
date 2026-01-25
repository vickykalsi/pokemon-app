import "dotenv/config";
import express from "express";
import initDB from "./db/initDB.js";
import { protectedRouter, publicRouter } from "./routes/pokemonRoutes.js";
import cookieParser from "cookie-parser";
import authMiddlware from "./middleware/authMiddleware.js"
import cors from "cors"


const app = express();
const PORT = process.env.PORT || 3000

await initDB();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

try {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
  const data = await response.json();
  const names = data.results.map(result => result.name);
  app.get("/names", (req, res) => {
    res.status(200).json({ names });
  })
}
catch (err) {
  console.log("could not fetch all pokemon names");
}

app.use("/auth", authMiddlware, protectedRouter);
app.use("/", publicRouter);

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
})