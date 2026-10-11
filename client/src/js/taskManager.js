import { getTasks, createTask, updateTask, deleteTask } from "./api.js"

const createTaskButton = document.getElementById("createTaskButton")
const taskList = document.getElementById("taskList")
const searchInput = document.getElementById("searchInput")

const tasksLimit = 20

const tasks = []

function createTaskCard(task) {
    const li = document.createElement('li');
    li.id = `taskCard${task.id}`
    li.className = 'taskCard';

    const h2 = document.createElement('h2');
    h2.textContent = "?";


    const input = document.createElement('input');
    input.maxLength = 30;
    input.placeholder = 'Digite sua tarefa aqui...';
    input.className = 'taskInput';
    input.required = true;
    input.value = task.content ?? "";

    const inputContainer = document.createElement("div")
    inputContainer.className = "inputContainer"
    if (task.checked) {
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


    async function saveContent() {
        const previousContent = task.content ?? "";
        const nextContent = input.value;
        if (nextContent === previousContent) return;

        task.content = nextContent;
        try {
            await updateTask(task);
        } catch (err) {
            task.content = previousContent;
            input.value = previousContent;
            console.error("Erro ao atualizar tarefa:", err);
        }
    }

    input.addEventListener("blur", saveContent);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") input.blur();
    });

    btnExcluir.type = "button";
    btnExcluir.setAttribute("aria-label", "Excluir tarefa");
    btnExcluir.addEventListener("click", async () => {
        try {
            await deleteTask(task.id);
            li.remove()
            const taskIndex = tasks.findIndex((currentTask) => currentTask.id === task.id)
            if (taskIndex !== -1) tasks.splice(taskIndex, 1)
            updateTaskOrder();
            updateCreateButtonState();
        }
        catch (err) {
            console.error("Erro ao excluir tarefa:", err)
        }
    })

    checkbox.addEventListener("change", async () => {
        const previousChecked = task.checked ?? false;
        task.checked = checkbox.checked;
        inputContainer.classList.toggle("checked", checkbox.checked)
        input.disabled = checkbox.checked
        try {
            await updateTask(task);
        } catch (err) {
            task.checked = previousChecked;
            checkbox.checked = previousChecked;
            inputContainer.classList.toggle("checked", previousChecked);
            input.disabled = previousChecked;
            console.error("Erro ao atualizar tarefa:", err);
        }
    })

    li.appendChild(h2);
    li.appendChild(inputContainer);
    li.appendChild(checkbox);
    li.appendChild(btnExcluir);
    return li;
}

function updateCreateButtonState() {
    if (createTaskButton) createTaskButton.disabled = tasks.length >= tasksLimit;
}

function updateTaskOrder() {
    tasks.forEach((task, index) => {
        const card = document.getElementById(`taskCard${task.id}`);
        const position = card?.querySelector("h2");
        if (position) position.textContent = index + 1;
    });
}

createTaskButton?.addEventListener("click", async (event) => {
    if (tasks.length >= tasksLimit) return;

    createTaskButton.disabled = true;
    try {
        const task = await createTask();
        tasks.push(task);
        taskList?.appendChild(createTaskCard(task));
        updateTaskOrder();
        applySearch();
    } catch (err) {
        console.error("Erro ao criar tarefa:", err);
    } finally {
        updateCreateButtonState();
    }
})

async function loadTasks() {
    try {
        const data = await getTasks()
        data.forEach(task => {
            if (!task) return;
            tasks.push(task)
            taskList?.appendChild(createTaskCard(task));
        });
        updateTaskOrder();
        updateCreateButtonState();
        applySearch();
    }
    catch (err) {
        console.error("Erro ao carregar tarefas: ", err)
    }
}

function applySearch() {
    const searchTerm = searchInput?.value.toLowerCase().trim() ?? "";
    tasks.forEach((task, originalIndex) => {
        const taskCard = document.getElementById(`taskCard${task.id}`);
        const originalContent = (task.content ?? "").trim().toLowerCase()
        if (!taskCard) return;

        taskCard.style.display = originalContent.includes(searchTerm) ? "" : "none";
    });
}

searchInput?.addEventListener("input", applySearch);

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadTasks, { once: true });
} else {
    loadTasks();
}