import { getTasksDB, createTaskDB, updateTaskDB, deleteTaskDB } from './repositories/taskRepository.js';

async function getTasks() {
    return getTasksDB();
}

async function postTask() {
    const tasks = await getTasksDB();
    const position = tasks.reduce(
        (highest, task) => Math.max(highest, task.position ?? 0),
        0
    ) + 1;
    return createTaskDB(position);
}

async function updateTask(taskId, changes) {
    const tasks = await getTasksDB();
    const task = tasks.find((task) => task?.id === taskId)
    if (!task) return null;

    const updatedTask = { ...task, ...changes };

    return updateTaskDB(taskId, updatedTask.content, updatedTask.checked);
}

async function deleteTask(taskId) {
    return deleteTaskDB(taskId);
}

export { getTasks, postTask, updateTask, deleteTask };