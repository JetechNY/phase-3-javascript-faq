// textContent
const pTag = document.querySelector("p")
console.log(pTag.textContent) // "5 likes"

pTag.textContent = "6 likes"
// <p>6 likes</p>

pTag.textContent = "<span>8</span> Likes"
// <p>"<span>8</span> Likes"</p>


// innerHTML
const ul = document.querySelector("ul")
console.log(ul.innerHTML) 


// innerText vs textContent
const main = document.querySelector("#main")
console.log("textContent: ")
console.log(main.textContent)
console.log("innerText: ")
console.log(main.innerText)