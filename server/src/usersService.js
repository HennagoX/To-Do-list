import { getUsersDB, postUserDB } from "./repositories/userRepository.js";
import bcrypt from "bcrypt";   

export async function getUsers() {
    return getUsersDB();
}

export async function postUser(name, email, password) {
    console.log(name);
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await postUserDB(name, email, hashPassword)
    return user
}