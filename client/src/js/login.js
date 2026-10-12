const showRegisterButton = document.getElementById("showRegisterButton")
const showLoginButton = document.getElementById("showLoginButton")
const authPanel = document.getElementById("authPanel")
const registerPrompt = document.getElementById("registerPrompt")
const loginPrompt = document.getElementById("loginPrompt")
const loginSide = document.getElementById("loginSide")
const registerSide = document.getElementById("registerSide")

showRegisterButton.addEventListener("click", () => {
    authPanel.classList.add("registerMode")
    registerPrompt.hidden = true
    loginPrompt.hidden = false
    loginSide.hidden = true
    registerSide.hidden = false
})

showLoginButton.addEventListener("click", () => {
    authPanel.classList.remove("registerMode")
    registerPrompt.hidden = false
    loginPrompt.hidden = true
    loginSide.hidden = false
    registerSide.hidden = true
})