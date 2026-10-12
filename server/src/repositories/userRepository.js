import connection from "./connection";

export function getUsers() {
    const users = connection.query("SELECT * FROM users")
    return users.rows
}

export function postUser(name, email, password) {
    const users = connection.query("INSERT INTO users(name, email, password) VALUES  ($1, $2, $3)", 
        [name, email, password])
}