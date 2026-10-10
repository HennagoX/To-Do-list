import express from 'express';
import cors from 'cors';

const tasks = []

const app = express();

app.use(cors())

app.use(express.json());

app.get("/getTasks", (req, res) => {
    res.json(tasks)
})

app.post("/postTasks", (req, res) => {
    tasks.push({
        id: tasks?.length + 1,
        content: "",
    })
    res.json({
        id: tasks?.length,
    })
})

app.patch("/updateTasks", (req, res) => {
    const taskId = req.body.id
    const taskContent = req.body.content
    const taskChecked = req.body.checked
    const task = tasks.find((task) => task.id === taskId)
    task.content = taskContent;
    task.checked = taskChecked;
    res.json({
        id: task.id,
        content: task.content,
        checked : task.checked
    })
})

app.delete("/deleteTasks/:id", (req, res) => {
    const taskId = Number(req.params.id)
    const index = tasks.findIndex((task) => task.id === taskId)

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        })
    }

    tasks.splice(index, 1)
    tasks.forEach((task, taskIndex) => {
        task.id = taskIndex + 1
    })
    res.status(204).end()
})

app.listen(3000, () => {
    console.log("Iniciou porta");
})
