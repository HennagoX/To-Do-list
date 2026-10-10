const createTaskButton = document.getElementById("createTaskButton")
const taskList = document.getElementById("taskList")
const tasksLIMIT = 20
let tasksCount = 0


async function getTasks() {
    const response = await fetch("http://localhost:3000/getTasks")
    const data = await response.json();
    return data;
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


async function updateTask(task) {
    console.log(task)
    const response = await fetch("http://localhost:3000/updateTasks", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: task.id,
            content: task.content
        })
    })
}

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
    input.value = task.content ?? "";

    input.addEventListener("blur", () => {
        task.content = input.value;
        updateTask(task)
    })

    input.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            task.content = input.value;
            updateTask(task)
        }
    })

    const checkbox = document.createElement('input');
    checkbox.className = 'taskCheck';
    checkbox.type = 'checkbox';

    li.appendChild(h2);
    li.appendChild(input);
    li.appendChild(checkbox);

    return li;
}

createTaskButton?.addEventListener("click", async (event) => {
    if (tasksCount >= tasksLIMIT) {
        return;
    }
    // taskList.appendChild(createTaskCard());
    tasksCount += 1;
    const task = await createTask();
    if (!task) return;
    const cardTask = createTaskCard(task)
    taskList?.appendChild(cardTask);
})

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await getTasks()
        data.forEach(task => {
            if (!task) return;
            tasksCount += 1;
            const cardTask = createTaskCard(task)
            taskList?.appendChild(cardTask);
        });
    }
    catch (err) {
        console.log("Erro ao carregar tarefas: ", err)
    }

})

