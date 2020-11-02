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

/************ Event Delegation ************/
// 1. Identify the closest common parent of all the elements you want to listen for events on
  // 'ul#candies' is the closest common parent to the 'button.like-btn' elements
  const candiesContainer = document.querySelector("#candies")

  // 2. Attach an event listener to that parent element
    // we want to listen for all clicks in the 'ul#candies'
  candiesContainer.addEventListener("click", function(event) {
    // 3. In the event listener, write some conditional logic 
    // to determine which element triggered the event (using `event.target`)
      // event.target will tell us which element was clicked
      // we want to check if it was the 'button.like-btn'
      // .matches() will let us check if an element matches the given CSS selector
    if (event.target.matches(".like-btn")) {
      // 4. Inside your condition, run whatever code you need to handle that event
        // Now that we know the 'button.like-btn' was clicked
        // we need to find the <p> tag inside the card component
        // and increment its likes
      const card = event.target.closest(".card")
      const pTag = card.querySelector("p")
      const likes = parseInt(pTag.textContent) + 1
      pTag.textContent = `${likes} Likes`
    }
  })