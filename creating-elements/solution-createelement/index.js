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
  // <li class="card"></li>
  const cardLi = document.createElement("li")
  cardLi.classList.add("card")

  // <h3>Snickers</h3>
  const nameH3 = document.createElement("h3")
  nameH3.textContent = candyObj.name

  // <p>7 Likes</p>
  const likesPTag = document.createElement("h3")
  likesPTag.textContent = `${candyObj.likes} Likes`

  // <button class="like-btn">Add Like</button>
  const likeButton = document.createElement("button")
  likeButton.classList.add("like-btn")
  likeButton.textContent = "Add Like"
  
  // append the child elements to the card
  cardLi.append(nameH3, likesPTag, likeButton)

  // append the card to the parent
  const candyContainer = document.querySelector("#candies")
  candyContainer.append(cardLi)
}

function renderCandies(candyArray) {
  candyArray.forEach(renderCandy)
}

renderCandies(candies)