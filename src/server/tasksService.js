import fs from "node:fs/promises";

let tasks = []
const tasksFile = new URL("../../data/tasks.json", import.meta.url)

async function getTasks() {
    const data = await fs.readFile(tasksFile, "utf8")
    tasks = JSON.parse(data);
    return tasks;
}

async function postTask() {
    const task = {
        id: tasks.length + 1,
        content: "",
        checked: false
    };
    tasks.push(task);

    await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), "utf8");
    return task;
}

async function updateTask(taskId, changes) {
    const task = tasks.find((task) => task?.id === taskId)
    if (!task) return null;

    if (Object.hasOwn(changes, "content")) task.content = changes.content;
    if (Object.hasOwn(changes, "checked")) task.checked = changes.checked;
    await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), "utf8");
    return task;
}

async function deleteTask(taskId) {
    const index = tasks.findIndex((task) => task.id === taskId)

    if (index === -1) return false;

    tasks.splice(index, 1)
    tasks.forEach((task, taskIndex) => {
        task.id = taskIndex + 1
    })

    await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), "utf8");
    return true;
}

export { getTasks, postTask, updateTask, deleteTask };