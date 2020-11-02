// event listener
const btn = document.querySelector("button")

btn.addEventListener("click", function() { 
  // anonymous function using `function` keyword
  toggle(false)
})

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
  .then(data => {
    // anonymous function using arrow function syntax
    console.log(data)
  })