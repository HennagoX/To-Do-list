import express from 'express';
import cors from 'cors';
import fs from "fs/promises"

let tasks = []

const app = express();

async function getTasks() {
    const data = await fs.readFile("tasks.json", "utf8")
    tasks = JSON.parse(data);
    return JSON.parse(data);
}

async function postTask() {
    const data = await fs.readFile("tasks.json", "utf8")
    tasks = JSON.parse(data)
    tasks.push({
        id: tasks?.length + 1,
        content: ""
    })
    console.log(tasks)
    const sucess = await fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2), "utf8")
    return sucess
}

app.use(cors())

app.use(express.json());

app.get("/getTasks", async (req, res) => {
    const data = await getTasks()
    console.log(data)
    res.json(data)
})

app.post("/postTasks", async (req, res) => {
    try {
        if (tasks.length >= 20) res.json({ message: "Atingido o limite de 20 tarefas!" });

        const sucess = await postTask()
console.log(sucess)
        res.json({
            id: tasks?.length
        })

    }
    catch (err) {
        console.error(err);
    }
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
        checked: task.checked
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
