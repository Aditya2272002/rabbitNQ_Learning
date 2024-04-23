import express from  'express';
import axios from 'axios'
import { Producer } from './producer';

const app = express();
const producer = new Producer();

app.use(express.json());

app.post("/sendLog", async (req, res, next) => {
  await producer.publishMessage(req.body.logType, req.body.message);
  res.send();
});

app.listen(3000, () => {
  console.log("Server started on 3000 !");
});