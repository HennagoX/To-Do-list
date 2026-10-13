import { getUsers, createUser } from "./api";

const cadastrarName = document.getElementById("cadastrarName");
const cadastrarEmail = document.getElementById("cadastrarEmail")
const cadastrarPassword = document.getElementById("cadastrarPassword")
const cadastroForm = document.getElementById("cadastroForm")

cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = cadastrarName.value.trim();
    const email = cadastrarEmail.value.trim();
    const password = cadastrarPassword.value.trim();

    if (name.length < 2 || name.length >= 188) {
        return;
    }

    if (email.length < 6 || email.length >= 249) {
        return;
    }

    if (password.length < 8 || password.length >= 60) {
        return;
    }
    
    const response = await createUser(name, email, password)
    console.log(response);
})
