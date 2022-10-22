import express, { Request, Response } from 'express';
import {addData, getData} from './db';
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());
// req.query.url string
app.get('/get', async (req: Request, res: Response) => {
    const nowData = req.query;
  res.json(await getData(nowData.link as string));
});

app.get('/report', async (req: Request, res: Response) => {
    const nowData = req.query;
    await addData(nowData);
    res.json(nowData);
});

app.listen(port, () => {
    console.log("server start!");
});
