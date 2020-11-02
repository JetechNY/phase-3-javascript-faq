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

  /************ Individual Event Listeners ************/ 
  // 1. Identify when the elements are being created
    // the buttons are being created inside this function
  
  // 2. Find the element you want to listen for events on
    // here's our button element
  const button = li.querySelector("button")

  // 3. Attach an event listener
  button.addEventListener("click", function() {
    // 4. Inside that event listener
    // use the variables you have available in scope to manipulate the DOM

      // we have access to the candy object from the outer scope of this function
      // we want to update that object to increase its likes
    candy.likes++
      // we also have access to the 'li.card' element from the outer scope of this function
      // we can find the <p> tag and update its text content
    li.querySelector("p").textContent = `${candy.likes} Likes`
  })


  document.querySelector("#candies").append(li)
}

// for each candy object, add a card
candies.forEach(renderCard)