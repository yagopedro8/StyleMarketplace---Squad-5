import express from 'express';
import configDotenv from './config/dotenv';
// import cors from 'cors';
import routes from './routes/routes';

configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});

// no server.ts
import path from "node:path";

app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "..", "uploads"))
);
    