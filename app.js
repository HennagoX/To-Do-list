import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.json());

app.get("/getTasks", () => {
    console.log("A");
})

app.post("/postTasks", (req, res) => {
    console.log(req);
    const body = req?.body;
    const task = body?.task;
    console.log(task);
    res.json({
        id : 67,
    })
})

app.listen(3000, () => {
    console.log("Iniciou porta");
})
