// Solution: Add a DOMContentLoaded event listener to the document
document.addEventListener("DOMContentLoaded", handlePageLoad)

// Write any code that needs access to DOM elements on page load in the
// callback function for the DOMContentLoaded event
function handlePageLoad() {
  const header = document.querySelector("#header")
  console.log(header) // null
}