export async function getTasks() {
    const response = await fetch("http://localhost:3000/api/tasks")
    const data = await response.json();
    return data;
}

export async function createTask() {
    const response = await fetch("http://localhost:3000/api/tasks",
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

export async function updateTask(task) {
    const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: task.content,
            checked: task.checked
        })
    })
}

export async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE"
    })

    if (response.status === 204) return;

    if (!response.ok) {
        throw new Error('Erro ao excluir tarefa')
    }

    return true;

}