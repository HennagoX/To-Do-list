const createTaskButton = document.getElementById("createTaskButton")
const taskList = document.getElementById("taskList")

const tasksLIMIT = 20
let tasksCount = 0

const tasks = []

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
    const response = await fetch("http://localhost:3000/updateTasks", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: task.id,
            content: task.content,
            checked: task.checked
        })
    })
}

async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/deleteTasks/${id}`, {
        method: "DELETE"
    })

    if (response.status === 204) return;

    if (!response.ok) {
        throw new Error('Erro ao excluir tarefa')
    }

    return true;

}

function createTaskCard(task) {
    const li = document.createElement('li');
    li.className = 'taskCard';

    const h2 = document.createElement('h2');
    h2.textContent = Number(task?.id) ?? "?";


    const input = document.createElement('input');
    input.maxLength = 30;
    input.placeholder = 'Digite sua tarefa aqui...';
    input.className = 'taskInput';
    input.required = true;
    input.value = task.content ?? "";

    const inputContainer = document.createElement("div")
    inputContainer.className = "inputContainer"
    if (task.checked){
    inputContainer.classList.add("checked")
    input.disabled = true
    }
    inputContainer.appendChild(input);

    const checkbox = document.createElement('input');
    checkbox.className = 'taskCheck';
    checkbox.checked = task.checked ?? false;
    checkbox.type = 'checkbox';

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn-excluir";
    btnExcluir.innerHTML = `    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-trash preview-icon">
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>`


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

    btnExcluir.addEventListener("click", async (event) => {
        try {
            const sucess = await deleteTask(task.id)
            if (sucess === false) { throw new Error("Não foi possível deletar a tarefa!") }
            li.remove()
            const taskIndex = tasks.findIndex((currentTask) => currentTask.id === task.id)
            if (taskIndex !== -1) tasks.splice(taskIndex, 1)
            tasksCount = tasks.length
            tasks.forEach((currentTask, index) => {
                currentTask.id = index + 1
            })
            taskList.querySelectorAll(".taskCard").forEach((value, index) => {
                const idText = value.querySelector("h2");
                idText.textContent = index + 1
            })
        }
        catch (err) {
            console.error(err)
        }
    })

    checkbox.addEventListener("change", (event) => {
        task.checked = checkbox.checked;
        updateTask(task)
        inputContainer.classList.toggle("checked", checkbox.checked)
            input.disabled = checkbox.checked
    })

    li.appendChild(h2);
    li.appendChild(inputContainer);
    li.appendChild(checkbox);
    li.appendChild(btnExcluir);
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
    tasks.push(task)
    taskList?.appendChild(cardTask);
})

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await getTasks()
        data.forEach(task => {
            if (!task) return;
            tasksCount += 1;
            const cardTask = createTaskCard(task)
            tasks.push(task)
            taskList?.appendChild(cardTask);
        });
    }
    catch (err) {
        console.error("Erro ao carregar tarefas: ", err)
    }

})

