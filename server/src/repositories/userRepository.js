import connection from "./connection.js";

export async function getUsersDB() {
    const users = await connection.query("SELECT * FROM users")
    return users.rows
}

export async function postUserDB(name, email, password) {
   return await connection.query("INSERT INTO users(name, email, password) VALUES  ($1, $2, $3)", 
        [name, email, password])
}