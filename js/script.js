let titles = [];
let notes = [];
let titlesDeleted = [];
let notesDeleted = [];

function init() {
  includeHTML();
  loadFromLocalStorage();
}

function loadFromLocalStorage() {
  let notesStringified = localStorage.getItem('notes');
  if (notesStringified) {
    notes = JSON.parse(notesStringified);
  }
}

function saveToLocalStorage() {
  let notesStringified = JSON.stringify(notes);
  localStorage.setItem('notes', notesStringified);
}


function toggleClass(elementArray, ClassName) {
  elementArray.forEach((e) => document.getElementById(e).classList.toggle(ClassName));
}


function getCurrentNote(id) {
  return notes.find((n) => n.id == id);
}