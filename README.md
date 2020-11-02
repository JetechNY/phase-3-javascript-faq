# Mod 3 FAQ

- [I Can't Access DOM Elements](#cant-access-dom-elements)
  - aka `console.log(element)` prints `null`
  - aka [#TeamDefer](#solution-1-defer) vs [#TeamDOMContentLoaded](#solution-2-domcontentloaded)
- [How Do I Create DOM Elements?](#how-do-i-create-dom-elements)
  - aka `innerHTML` vs `createElement`
- [When Do I Use innerHTML/innerText/textContent?](#when-do-i-use-innerhtmltextcontentinnertext)
- [My Callback Function Isn't Running](#my-callback-function-isnt-running)
  - aka why doesn't `.then(console.log(data))` work
- [How Do I Work With Events on Multiple Repeated Elements?](#how-do-i-work-with-events-on-multiple-repeated-elements)
  - aka the "like button" problem
  - aka [#TeamDelegation](#solution-1-event-delegation) vs [#TeamIndividualEventListener](#solution-2-individual-event-listeners)

---

## I Can't Access DOM Elements

> See [code](dom-access/example) for an example of this behavior

Problem: I'm not able to access a DOM element when I run my Javascript code. I ran my `querySelector` from the console, but when I run the same `querySelector` from my Javascript file, it comes back as `null`.

```html
<!-- index.html -->
<head>
  <script src="index.js"></script>
</head>
<body>
  <h1 id="header">Hello</h1>
</body>
```

```js
// index.js
const header = document.querySelector("#header")
console.log(header) // null
```

### Explanation

The cause of this problem is that by default, the browser will execute the code inside our `<script>` tags as soon as it reaches that line in the HTML file, before it has completed parsing the DOM. That means that any DOM elements listed below the `<script>` tab will not be immediately available from our Javascript file.

### Solution 1: defer

> See [code](dom-access/solution-defer) for solution code

The [`defer`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer) attribute will wait to run your Javascript code until after the document has been parsed, meaning the DOM will be available from your Javascript code. 

```html
<!-- index.html -->
<head>
  <script src="index.js" defer></script>
</head>
<body>
  <h1 id="header">Hello</h1>
</body>
```

```js
// index.js
const header = document.querySelector("#header")
console.log(header) // h1#header
```

### Solution 2: DOMContentLoaded

> See [code](dom-access/solution-domcontentloaded) for solution code

The [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event) event will fire after the DOM has been loaded and parsed, meaning if we listen for that event, we can run code to access elements in the DOM after this event runs.

```html
<!-- index.html -->
<head>
  <script src="index.js"></script>
</head>
<body>
  <h1 id="header">Hello</h1>
</body>
```

```js
// index.js
document.addEventListener("DOMContentLoaded", handlePageLoad)

function handlePageLoad() {
  const header = document.querySelector("#header")
  console.log(header) // null
}
```

---

## How Do I Create DOM Elements?

> See [code](creating-elements/example) for an example of this problem

The [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) give us [many ways](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces) of creating new DOM elements and positioning them within the DOM tree. There are a couple of common approaches to creating elements, each with some tradeoffs.

Let's say our goal is to take an array of objects:

```js
const candies = [
  { name: "M&Ms", likes: 5 },
  { name: "Twix", likes: 10 },
  { name: "Snickers", likes: 7 }
]
```

And create a group of DOM elements that looks like this:

```html
<ul id="candies">
  <li class="card">
    <h3>M&Ms</h3>
    <p>5 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
  <li class="card">
    <h3>Twix</h3>
    <p>10 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
  <li class="card">
    <h3>Snickers</h3>
    <p>7 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
</ul>
```

### Solution 1: .createElement

> See [code](creating-elements/solution-createelement) for an example of this solution

The [`document.createElement` method](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) lets you create any DOM element by passing in a tag name. The general steps for using this to create an element are:

1. Use `document.createElement(tagName)` to create the element
2. Assign any properties of that element you'd like (css class, id, text content)
3. Append it to a parent element

The benefits of this approach: it gives us a great degree of control over each step of DOM creation, and is very explicit. The drawbacks: it requires us to write **a lot** of code if we're creating many elements.

Here's a basic example:

```js
// 1. Use `document.createElement(tagName)` to create the element
const header = document.createElement("h1")
// 2. Assign any properties of that element you'd like (css class, id, text content)
header.className = "main-header"
header.textContent = "Welcome to my site!"
// 3. Append it to a parent element
document.body.append(header)
```

We can use this technique to create a collection of DOM elements:

```js
const candies = [
  { name: "M&Ms", likes: 5 },
  { name: "Twix", likes: 10 },
  { name: "Snickers", likes: 7 }
]

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
```


### Solution 2: .innerHTML

> See [code](creating-elements/solution-innerhtml) for an example of this solution

[`.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) is a property that lets us get or set the the HTML markup inside an element as a string. 

Using `element.innerHTML = "<p>a paragraph</p>"` will do the following:

1. From the string `"<p>a paragraph</p>"`, create a `<p>` tag with "a paragraph" inside
2. Replace any DOM elements inside of `.element` with that newly created `<p>` tag

The benefits of this approach: it's much faster for us to write than using `document.createElement()` since we can create a lot of elements quickly and declaratively. However, there are some drawbacks - here are some **important notes about `.innerHTML`**:

`.innerHTML` is a **destructive** operation, meaning that any existing elements inside the element will be removed from the page. So if you have existing elements with event listeners attached, and you use `.innerHTML += someNewElements` to "append" elements, **any existing elements will be destroyed along with their event listeners**.

There are also [security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations) to take into account when you're using `.innerHTML` in a production setting (don't worry as much about this in Mod 3).

All that aside, here's one way you can use `.innerHTML` to solve the problem above:

```js
const candies = [
  { name: "M&Ms", likes: 5 },
  { name: "Twix", likes: 10 },
  { name: "Snickers", likes: 7 }
]

function candyToHTML(candy) {
  return `
    <li class="card">
      <h3>${candy.name}</h3>
      <p>${candy.likes} Likes</p>
      <button class="like-btn">Add Like</button>
    </li>
  `
}

function addCandy(newCandy) {
  const candyHTML = candyToHTML(newCandy)
  const candyContainer = document.querySelector("#candies")
  candyContainer.innerHTML += candyHTML
}

function renderCandies(candyArray) {
  const candyHTML = candies.map(candyToHTML).join("")
  const candyContainer = document.querySelector("#candies")
  candyContainer.innerHTML = candyHTML
}
```

### Solution 3: Hybrid (createElement and innerHTML)

> See [code](creating-elements/solution-hybrid) for an example of this solution

Both approaches above have some drawbacks: `innerHTML` is destructive; and `document.createElement()` takes a long time to write. Here's a hybrid approach that offers a nice middle ground between the two. We don't have to write as much code, but we still avoid destroying all the DOM elements inside the container every time a new element is added:

```js
const candies = [
  { name: "M&Ms", likes: 5 },
  { name: "Twix", likes: 10 },
  { name: "Snickers", likes: 7 }
]

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
```

---


## When Do I Use innerHTML/textContent/innerText?

> See [code](textcontent-innerhtml/example) for examples

All three of these methods give us a way to work with the content inside of an element, represented as a string. They all have both a "reader"/"getter" and "writer"/"setter" versions, so you can access content from the DOM, or set new content in the DOM.

A quick rule of thumb:

- use `.textContent` if you only care about strings, not HTML markup
- use `.innerHTML` if you care about HTML markup
- use `.innerText` instead of `.textContent` if it's easier for you to remember (they do virtually the same thing)

The MDN articles on [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent), [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) and [innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) go into more detail, but here are some quick examples.

### innerHTML

Use this when you want to create some new DOM elements using a string. 

Using `.innerHTML` as a "reader", it will parse all of the DOM elements inside of the element and return a string. For example:

```html
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
</ul>
```

```js
const ul = document.querySelector("ul")
console.log(ul.innerHTML) 
// <li><a href="/">Home</a></li>
// <li><a href="/about">About</a></li> 
```

This returns a string representation of all the DOM elements within the `<ul>`.

Using `.innerHTML` as a "writer" will take a string, parse it for any HTML markup, and replace the current content of the element with new DOM nodes from the parsed string. For example:

```js
ul.innerHTML = ""
// <ul></ul>

ul.innerHTML = "hello"
// <ul>hello</ul>

ul.innerHTML = "<li>Hello</li>"
// <ul><li>Hello</li></ul>
```

Passing in a string with HTML tags, like the third example, will result in that string being turned into any DOM elements. So inside the `<ul>`, a new `<li>` would be created with the content of "Hello" inside of the `<li>`.

### textContent

Use this when you just want to get the text inside of a DOM element, or when you want to set some new text inside of a DOM element that doesn't include any HTML markup. `.textContent` is safer to use than `.innerHTML` since it doesn't open you up to [XSS attacks](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).

Using `.textContent` as a "reader", it will read all the text content for every child node of the element it was used on. For example:

```html
<p>5 likes</p>
```

```js
const pTag = document.querySelector("p")
console.log(pTag.textContent) // "5 likes"
```

Using `.textContent` as a "writer" will set the contents to whatever string you assign it to. It will treat any HTML tags in that string as part of the string. For example:

```js
pTag.textContent = "6 likes"
// <p>6 likes</p>

pTag.textContent = "<span>8</span> Likes"
// <p>"<span>8</span> Likes"</p>
```

Passing in a string with HTML tags, like the second example, won't result in that string being turned into any DOM elements, so you'd see the literal string of `"<span>8</span> Likes"` displayed inside the `<p>` tag.

### innerText

When used as a "writer" method, `.innerText` will do the same thing as `.textContent`. There are small differences when you use `.innerText` vs `.textContent` as a "reader". `.innerText` can be less performant, but it gives you a better result if you only need access to visible content. From MDN:

> textContent gets the content of all elements, including `<script>` and `<style>` elements. In contrast, innerText only shows “human-readable” elements.
> - textContent returns every element in the node. In contrast, innerText is aware of styling and won’t return the text of “hidden” elements.
> - Moreover, since innerText takes CSS styles into account, reading the value of innerText triggers a reflow to ensure up-to-date computed styles. (Reflows can be computationally expensive, and thus should be avoided when possible.)

Here's an example of when these differences would appear:

```html
<div id="main">
  Here's some text with a <span style="display: none;">hidden </span>message.
</div>
```

The `display: none` property will hide the text so it's not visible to the user. `.innerText` will not read this hidden text; but `.textContent` will:

```js
const main = document.querySelector("#main")

console.log(main.innerText)
// Here's some text with a message.

console.log(main.textContent)
// Here's some text with a hidden message.
```
---

## My Callback Function Isn't Running

> See [code](callbacks/example) for an example of this behavior

Problem: I have a callback set up (for an event listener, or a `.then`, etc) and it's not working; my code isn't running like I expect. 

Some examples:

```js
// index.js

// event listener
const btn = document.querySelector("button")

btn.addEventListener("click", toggle(false))

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
  .then(console.log(data))
```

### Explanation

For methods that expect a callback function to be passed in as an argument, you must pass a **function definition**. When you write a function with parentheses at the end, it is no longer a function definition, it is a **function invocation**. 

Both [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#The_event_listener_callback) and [`.then`]() expect a callback function to be passed in; in the example above, the way this code would be evaluated in Javascript is by reading the code top to bottom, and executing any functions that are being invoked and replacing them with their return values.

```js
// index.js

btn.addEventListener("click", toggle(false))
// toggle(false) is immediately invoked, before the button is clicked, turning the button blue
// toggle(false) returns undefined, so the event listener effectively would look like this:
// btn.addEventListener("click", undefined)

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
  .then(console.log(data)) 
  // console.log(data) is immediately invoked, before waiting for the response from the server
  // also, there's no variable called data, so we'd see an error
```

### Solution 1: Anonymous functions

> See [code](callbacks/solution-anonymous) for solution code

We can fix this by defining the function directly as an argument in the `.addEventListener` or `.then` method:

```js
// index.js

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
```

### Solution 2: Function Reference

> See [code](callbacks/solution-reference) for solution code

We can also pass a reference to a function that's defined elsewhere in our code as the callback (remember, we just don't want to pass a **function invocation**):

```js
// index.js

// event listener
const btn = document.querySelector("button")

// handleClick is a reference to our `handleClick` function below
btn.addEventListener("click", handleClick)

function handleClick() {
  toggle(false)
}

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
  .then(console.log)
  // console.log is a reference to the `.log` method on the `console` object
  // when the browser runs the callback for .then, it will call `console.log` with one argument: 
  // the data being returned from the previous promise
```

### Edge Case: Higher Order Functions (Bonus)

> See [code](callbacks/bonus-higher-order-function) for example

> **NOTE**: This is more advanced Javascript, so if the concepts below don't apply to your case, feel free to move on; this is just here for when you exploring higher order functions in more depth!

There are some cases when it's valid to pass a function invocation to an event handler: when the function you invoke returns *another function definition*.

In the example below, `getInputValue` returns a function definition, `handleInputChange`, which can be used for the callback for `.addEventListener`.

```html
<!-- index.html -->
<form>
  <input type="text" name="username" id="username" />
  <input type="text" name="password" id="password" />
  <button type="submit">Log In</button>
</form>
```

```js
// index.js
let currentUser = {
  username: "",
  password: "",
}

const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")

// getInputValue("") returns a function definition, so this is valid
// the handleInputChange function returned by calling getInputValue 
// will be used as the callback for the event listener
usernameInput.addEventListener("input", getInputValue("username"))
passwordInput.addEventListener("input", getInputValue("password"))


function getInputValue(name) {
  return function handleInputChange(event) {
    // try typing in the input fields and see what's logged here
    console.log({ name: name, value: event.target.value })

    currentUser[name] = event.target.value
  }
}

// after the input fields have been filled out and the form has been submitted
// currentUser should be updated with the information from the input fields 
// as the user entered them in
const form = document.querySelector("form")
form.addEventListener("submit", handleFormSubmit)

function handleFormSubmit(event) {
  event.preventDefault()
  console.log(currentUser)
}
```

---

## How Do I Work With Events on Multiple Repeated Elements?

> See [code](multiple-events/example) for an example of this behavior

Problem: we're writing some code to display a bunch of similar-looking elements on the page. Let's refer to our groups of repeated elements as a 'component'. Each component looks like this:

```html
<li class="card">
  <h3>M&Ms</h3>
  <p>5 Likes</p>
  <button class="like-btn">Add Like</button>
</li>
```

For each of the `btn.like-btn` elements on the page, we want to update the number of likes on that component. We can't run a `.querySelectorAll` and loop over the buttons to add the event listeners directly, because new components can be added to the page dynamically; so we need to find some other approach.

### Solution 1: Event Delegation

> See [code](multiple-events/solution-delegation) for solution code

[Event delegation](https://javascript.info/event-delegation) is a strategy that takes advantage of the way that events [bubble up](https://javascript.info/bubbling-and-capturing) from child elements to their parents. If we can find a parent element that's common to all the elements we want to listen to events on, we can just attach *one* event listener to that element and listen for events on all of its children.

The general steps for working with event delegation are:

1. Identify the closest common parent of all the elements you want to listen for events on
2. Attach an event listener to that parent element
3. In the event listener, write some conditional logic to determine which element triggered the event (using `event.target`)
4. Inside your condition, run whatever code you need to handle that event

```html
<ul id="candies">
  <li class="card">
    <h3>M&Ms</h3>
    <p>5 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
  <li class="card">
    <h3>Twix</h3>
    <p>10 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
  <li class="card">
    <h3>Snickers</h3>
    <p>7 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
</ul>
```

Here's how we would handle the steps above, using this HTML as an example:

```js
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
```

One of the main challenges to using this approach is we need to rely on being able to traverse the DOM to find information; it took a few steps to get from the button element to the element with the number of likes. If you're less comfortable with finding elements in the DOM, this will be a challenge.

### Solution 2: Individual Event Listeners

> See [code](multiple-events/solution-individual-listeners) for solution code

Another approach to this problem is to add an individual event listener to each element that you care about, as soon as that element is created. The general steps for this are:

1. Identify when the elements are being created
2. Find the element you want to listen for events on
3. Attach an event listener
4. Inside that event listener, use the variables you have available in scope to manipulate the DOM


```html
<ul id="candies">
  <li class="card">
    <h3>M&Ms</h3>
    <p>5 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
  <li class="card">
    <h3>Twix</h3>
    <p>10 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
  <li class="card">
    <h3>Snickers</h3>
    <p>7 Likes</p>
    <button class="like-btn">Add Like</button>
  </li>
</ul>
```

Here's how we would handle the steps above, using this HTML as an example:

```js
function renderCard(candy) {
  const li = document.createElement("li")
  li.classList.add("card")
  li.innerHTML = `
    <h3>${candy.name}</h3>
    <p>${candy.likes} Likes</p>
    <button class="like-btn">Add Like</button>  
  `

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
```

