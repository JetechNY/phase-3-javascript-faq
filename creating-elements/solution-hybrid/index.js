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
  renderCandy(newCandy)
})

// creating elements
function renderCandy(candyObj) {
  // Create the outermost element with .createElement
  const cardLi = document.createElement("li")
  cardLi.classList.add("card")

  // Create the inner elements with .innerHTML
  cardLi.innerHTML = `
    <h3>${candyObj.name}</h3>
    <p>${candyObj.likes} Likes</p>
    <button class="like-btn">Add Like</button>
  `

  // append the card to the parent
  const candyContainer = document.querySelector("#candies")
  candyContainer.append(cardLi)
}

function renderCandies(candyArray) {
  candyArray.forEach(renderCandy)
}

renderCandies(candies)