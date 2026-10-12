import { getUsers, postUser } from "./repositories/userRepository";

export async function getUsers() {
    return getUsers();
}

export async function postUser(name, email, password) {
 return postUser(name, email, password)
}