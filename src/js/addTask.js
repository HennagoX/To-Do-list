const createTaskButton = document.getElementById("createTaskButton")
const taskList = document.getElementById("taskList")

function createCard() {
    const li = document.createElement('li');
    li.className = 'taskCard';

    const h2 = document.createElement('h2');
    h2.textContent = '1.';

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

createTaskButton.addEventListener("click", (event) => {
   taskList.appendChild(createCard());
   console.log(taskList.parentElement);
})