const TASKS_URL = "http://localhost:3000/api/tasks";
const USERS_URL = "http://localhost:3000/api/users";

async function readResponse(response) {
    if (!response.ok) {
        let message = `Falha na requisição (${response.status})`;
        try {
            const body = await response.json();
            if (body.message) message = body.message;
        } catch {

        }
        throw new Error(message);
    }

    if (response.status === 204) return null;
    return response.json();
}

export async function getUsers() {
    const response = await fetch(USERS_URL);
    return readResponse(response);
}

export async function createUser(name, email, password) {
    const response = await fetch(USERS_URL, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({ name: name, email: email, password: password })
    });
    return readResponse(response);
}

export async function getTasks() {
    const response = await fetch(TASKS_URL);
    return readResponse(response);
}

export async function createTask() {
    const response = await fetch(TASKS_URL, { method: "POST" });
    return readResponse(response);
}

export async function updateTask(task) {
    const response = await fetch(`${TASKS_URL}/${task.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: task.content,
            checked: task.checked
        })
    });
    return readResponse(response);
}

export async function deleteTask(id) {
    const response = await fetch(`${TASKS_URL}/${id}`, { method: "DELETE" });
    await readResponse(response);
    return true;
}