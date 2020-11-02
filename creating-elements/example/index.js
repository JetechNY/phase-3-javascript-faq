// data
const candies = [
  { name: "M&Ms", likes: 5 },
  { name: "Twix", likes: 10 },
  { name: "Snickers", likes: 7 }
]

// elements
const form = document.querySelector("#add-candy")
const container = document.querySelector("#candies")

// event listeners
form.addEventListener("submit", function(event) {
  event.preventDefault()
  const newCandy = {
    name: event.target.candy.value,
    likes: 0
  }
  addCandy(newCandy)
})
