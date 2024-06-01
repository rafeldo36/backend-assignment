import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./connect.js";
import auth from "./routes/auth.js"
import data from "./routes/data.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/v1/auth', auth);
app.use('/api/v1/data', data);

app.get("/", async (req, res) => {
  res.send("Hello");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080/")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
