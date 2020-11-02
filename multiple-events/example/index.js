// candy data
const candies = [
  {
    name: "M&Ms",
    likes: 5
  },
  {
    name: "Twix",
    likes: 10
  },
  {
    name: "Snickers",
    likes: 7
  }
]

// add candies from form
document.querySelector("#add-candy").addEventListener("submit", function(event) {
  event.preventDefault()
  const newCandy = {
    name: event.target.candy.value,
    likes: 0
  }
  renderCard(newCandy)
})

// add a card for one candy object
function renderCard(candy) {
  const li = document.createElement("li")
  li.classList.add("card")
  li.innerHTML = `
    <h3>${candy.name}</h3>
    <p>${candy.likes} Likes</p>
    <button class="like-btn">Add Like</button>  
  `
  document.querySelector("#candies").append(li)
}

// for each candy object, add a card
candies.forEach(renderCard)