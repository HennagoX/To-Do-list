import express from 'express';
import cors from 'cors';

const tasks = [
   {id : 1, content: ""}
]
    

const app = express();

app.use(cors())

app.use(express.json());

app.get("/getTasks", (req, res) => {
    res.json(tasks)
})

app.post("/postTasks", (req, res) => {
    tasks.push({
        id : tasks?.length + 1,
        content: "",
    })
    res.json({
        id : tasks?.length,
    })
})

app.listen(3000, () => {
    console.log("Iniciou porta");
})
