// event listener
const btn = document.querySelector("button")

btn.addEventListener("click", toggle(false))

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
  .then(console.log(data))