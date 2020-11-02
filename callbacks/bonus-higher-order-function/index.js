let currentUser = {
  username: "",
  password: "",
}

const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")

// getInputValue("") returns a function definition, so this is valid
// the handleInputChange function returned by calling getInputValue will be used as the callback for the event listener
usernameInput.addEventListener("input", getInputValue("username"))
passwordInput.addEventListener("input", getInputValue("password"))


function getInputValue(name) {
  return function handleInputChange(event) {
    // try typing in the input fields and see what's logged here
    console.log({ 
      name: name, 
      value: event.target.value 
    })

    currentUser[name] = event.target.value
  }
}

// after the input fields have been filled out and the form has been submitted, currentUser should be updated with the information from the input fields as the user entered them in
const form = document.querySelector("form")
form.addEventListener("submit", handleFormSubmit)

function handleFormSubmit(event) {
  event.preventDefault()
  console.log(currentUser)
}