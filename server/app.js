import { getTasks, postTask, updateTask, deleteTask } from './src/tasksService.js';
import { getUsers, postUser } from './src/usersService.js';

import { taskSchema, updateTaskSchema } from "./src/schemas/taskSchema.js";
import { userSchema } from "./src/schemas/userSchema.js";

import express from 'express';
import cors from 'cors';

const tasksLIMIT = 20

const app = express();

app.use(cors())

app.use(express.json());

app.get("/api/users", async (req, res) => {
    try {
        const data = await getUsers()
        res.json(data)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao consultar tarefas" });
    }
})

app.post("/api/users", async (req, res) => {
    console.log(req.body);
    const body = req?.body;
    const name = body?.name;
    const email = body?.email;
    const password = body?.password;

    userSchema.parse(body);

    const user = await postUser(name, email, password)
    if (!user) res.json({ sucess: false });
    res.json({ sucess: true })
})

app.get("/api/tasks", async (req, res) => {
    const data = await getTasks()
    res.json(data)
})

app.post("/api/tasks", async (req, res) => {
    try {
        const tasks = await getTasks();
        if (tasks.length >= tasksLIMIT) {
            return res.status(409).json({ message: "Atingido o limite de 20 tarefas!" });
        }

        const task = await postTask();
        return res.status(201).json(task);

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao criar tarefa" });
    }
})

app.patch("/api/tasks/:id", async (req, res) => {
    try {
        updateTaskSchema.parse(req?.body);
        const taskId = Number(req.params.id)
        const task = await updateTask(taskId, req.body);
        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }

        return res.json({
            id: task.id,
            content: task.content,
            checked: task.checked
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao atualizar tarefa" });
    }
})

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const taskId = Number(req.params.id)
        const deleted = await deleteTask(taskId)
        if (!deleted) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        return res.status(204).end()
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao excluir tarefa" });
    }
})

app.listen(3000, () => {
    console.log("Iniciou na porta : 3000");
})
