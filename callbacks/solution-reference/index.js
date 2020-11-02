// event listener
const btn = document.querySelector("button")

// handleClick is a reference to our `handleClick` function below
btn.addEventListener("click", handleClick)

function handleClick() {
  toggle(false)
}

function toggle(value) {
  if (value) {
    btn.style.color = "red"
  } else {
    btn.style.color = "blue"
  }
}

// .then
fetch("https://randomfox.ca/floof/")
  .then(r => r.json())
  .then(console.log)
  // console.log is a reference to the `.log` method on the `console` object
  // when the browser runs the callback for .then, it will call `console.log` with one argument: 
  // the data being returned from the previous promise