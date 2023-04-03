let addToy = false;

const toyUrl = "http://localhost:3000/toys/";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  submitButton = document.getElementsByName("submit")[0]
  submitButton.addEventListener("click", createNewToy);
});

function createNewToy(event) {
  event.preventDefault()
  console.log(event)
  let list = []
  fetch(toyUrl)
    .then(response => response.json())
    .then(data => { 
      list = data 
      list.push({
        "id": list.length + 1,
        "name": document.getElementsByName("name")[0].textContent,
        "image": document.getElementsByName("image")[0].textContent,
        "likes": 0
      })
      const configurationObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(list),
      };
      let resp = fetch(toyUrl, configurationObject)
        .then(function (response) {
          return response.json();
        })
        .then(function (object) {
          console.log("Toy added")
        })
    })

}

document.addEventListener("DOMContentLoaded", () => {
  fetch(toyUrl)
    .then(response => response.json())
    .then(data => renderList(data))
});

function renderList(toys) {
  console.log(toys)
  const toysDiv = document.getElementById("toy-collection");
  for (const index in toys) {
    const toy = toys[index]
    let div = document.createElement("div")
    div.className = "card"
    let h2 = document.createElement("h2")
    h2.innerHTML = toy.name
    div.appendChild(h2)
    let img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"
    div.appendChild(img)

    // P here
    let P = document.createElement("P")
    P.innerHTML = toy.likes + " Likes"
    img.className = "toy-avatar"
    div.appendChild(P)
    //Button here
    let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerHTML = "Like ❤️"
    likeButton.id = toy.id
    //likeButton.addEventListener("click", Like)
    div.appendChild(likeButton)
    toysDiv.appendChild(div);
  }
}
