console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");

let addBtn1 = document.getElementById("addBtn1");
addBtn1.addEventListener("click", function (e){
    let addTxt = document.getElementById("addTxt");
    text = addTxt.value;
    text = text.toUpperCase();
    addTxt.value= text;
    // console.log(text);
})
let addBtn2 = document.getElementById("addBtn2");

addBtn2.addEventListener("click", function (e){
    let addTxt = document.getElementById("addTxt");
    text = addTxt.value;
    text = text.toLowerCase();
    addTxt.value= text;
    // console.log(text);
})
let toBinary = document.getElementById("toBinary");

toBinary.addEventListener("click", function (e){
    let addTxt = document.getElementById("addTxt");
    text = addTxt.value;
    output = [];
    for(let i=0; i<text.length; i++){
        let bin = text[i].charCodeAt().toString(2);
        output.push(Array(9-bin.length).join('0') + bin);
    }

    addTxt.value= output.join(" ");

    // console.log(addTxt.value);
})

let addBtn3 = document.getElementById("toText");
addBtn3.addEventListener("click", function (e){
    let addTxt = document.getElementById("addTxt");
    text = addTxt.value;
    const res = text.split(' ').map(b => parseInt(b, 2)).map(num => String.fromCharCode(num)).join("");
    addTxt.value= res;
    // console.log(text);
})

let addBtn4 = document.getElementById("toClear");
addBtn4.addEventListener("click", function (e){
    let addTxt = document.getElementById("addTxt");
    addTxt.value = "";

    // console.log(text);
})

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  //   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

