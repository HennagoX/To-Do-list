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

    const checkbox = document.createElement('input');
    checkbox.className = 'taskCheck';
    checkbox.type = 'checkbox';
    checkbox.checked = true;

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
               'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id : 1
            })
        }
    )
    const data = await response.json();
    return data;
}

createTaskButton.addEventListener("click", async (event) => {
   // taskList.appendChild(createTaskCard());
   const task = await createTask();
   const cardTask = createTaskCard(task)
   taskList.appendChild(cardTask);
})