const createTaskButton = document.getElementById("createTaskButton")
const taskList = document.getElementById("taskList")

function createTaskCard(task) {
    const li = document.createElement('li');
    li.className = 'taskCard';

    const h2 = document.createElement('h2');
    h2.textContent = task?.id ?? "?";

    const input = document.createElement('input');
    input.maxLength = 30;
    input.placeholder = 'Digite sua tarefa aqui...';
    input.className = 'taskInput';
    input.required = true;
    input.textContent = task.content ?? "";

    const checkbox = document.createElement('input');
    checkbox.className = 'taskCheck';
    checkbox.type = 'checkbox';

    li.appendChild(h2);
    li.appendChild(input);
    li.appendChild(checkbox);

    return li;
}

async function createTask() {
    const response = await fetch("http://localhost:3000/postTasks",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }
    )
    const data = await response.json();
    return data;
}

async function getTasks() {
    const response = await fetch("http://localhost:3000/getTasks")
    const data = await response.json();
    return data;
}

createTaskButton.addEventListener("click", async (event) => {
    // taskList.appendChild(createTaskCard());
    const task = await createTask();
    if (!task) return;
    const cardTask = createTaskCard(task)
    taskList.appendChild(cardTask);
})

document.addEventListener("DOMContentLoaded", () => {
    
})

getTasks()

taskList.appendChild(getTasks());