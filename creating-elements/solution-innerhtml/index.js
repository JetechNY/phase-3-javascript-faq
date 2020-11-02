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

// creating elements
function candyToHTML(candy) {
  // takes in an object and returns a string
  return `
    <li class="card">
      <h3>${candy.name}</h3>
      <p>${candy.likes} Likes</p>
      <button class="like-btn">Add Like</button>
    </li>
  `
}

function addCandy(newCandy) {
  // turn the candy object to an HTML string
  const candyHTML = candyToHTML(newCandy)
  
  // "append" the html to the end of the container
  container.innerHTML += candyHTML
  // NOTE: innerHTML += is a DESTRUCTIVE operation
  // remember, += is the same as:
  // container.innerHTML = container.innerHTML + candyHTML

  // the browser will destroy all the DOM elements inside the container
  // and create new ones given the string from container.innerHTML + candyHTML
}

function renderCandies(candyArray) {
  // use .map to generate an array of strings of HTML for each candy
  // use .join to join the array to one long string
  const candyHTML = candyArray.map(candyToHTML).join("")
  
  // set the innerHTML of the container
  container.innerHTML = candyHTML
}

renderCandies(candies)