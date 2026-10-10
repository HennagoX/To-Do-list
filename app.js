import express from 'express';
import cors from 'cors';
import fs from "fs/promises"

let tasks = []
const tasksLIMIT = 20

const app = express();

async function getTasks() {
    const data = await fs.readFile("data/tasks.json", "utf8")
    tasks = JSON.parse(data);
    return JSON.parse(data);
}


async function postTask() {
    tasks.push({
        id: tasks.length + 1,
        content: ""
    });

    await fs.writeFile("data/tasks.json", JSON.stringify(tasks, null, 2), "utf8");
}

async function updateTask(taskId, taskContent, taskChecked) {
    const task = tasks.find((task) => task?.id === taskId)
    task.content = taskContent;
    task.checked = taskChecked;
    await fs.writeFile("data/tasks.json", JSON.stringify(tasks, null, 2), "utf8");
    return task;
}

async function deleteTask(taskId) {
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

    await fs.writeFile("data/tasks.json", JSON.stringify(tasks, null, 2), "utf8");
}

app.use(cors())

app.use(express.json());

app.get("/getTasks", async (req, res) => {
    const data = await getTasks()
    res.json(data)
})

app.post("/postTasks", async (req, res) => {
    try {
        if (tasks.length >= tasksLIMIT) res.json({ message: "Atingido o limite de 20 tarefas!" });

        const sucess = await postTask()
        res.json({
            id: tasks?.length
        })

    }
    catch (err) {
        console.error(err);
    }
})

app.patch("/updateTasks", async (req, res) => {
    try {
        const taskId = req.body.id
        const taskContent = req.body.content
        const taskChecked = req.body.checked
        const task = await updateTask(taskId, taskContent, taskChecked);

        res.json({
            id: task.id,
            content: task.content,
            checked: task.checked
        })
    }
    catch (err) {
        console.error(err);
    }
})

app.delete("/deleteTasks/:id", async (req, res) => {
    const taskId = Number(req.params.id)
    await deleteTask(taskId)
    res.status(204).end()
})

app.listen(3000, () => {
    console.log("Iniciou porta");
})
