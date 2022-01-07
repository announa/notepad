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

function enableButton(){
  let input = document.getElementById('title').value + document.getElementById('content').value;
  if(input != ''){
    document.getElementById('save_button').disabled = false;
  } else{
    document.getElementById('save_button').disabled = true;
  }
}


/* ------------  SHOW NOTE  ------------ */

// display note container
function showNote(id) {
  console.log(id);
  let currentNote = getCurrentNote(id);
  let showNoteBg = document.getElementById('show_note_bg');

  showNoteBg.classList.remove('invisible');
  showNoteBg.classList.add('flex');

  renderNote(currentNote);
}

//renders open Note
function renderNote(currentNote) {

  renderTitleAndContent(currentNote);
  renderDeleteButton(currentNote);
  renderEditOrRestoreButton(currentNote);

  document.getElementById('show_note').classList.add('show_note_open');
}

// renders title and content of the open note
function renderTitleAndContent(currentNote) {
  console.log(currentNote);

  document.getElementById('show_note').innerHTML += `
  <div class="show_note_title" id=open_note${currentNote.id}>${currentNote.title}</div>
  <div class="show_note_content" id=open_note${currentNote.id}>${currentNote.content}</div>
  <div class="show_note_actions">
  <div class="show_note_actions_buttons" id="show_note_actions_buttons">
    </div>
    <button onclick="closeNote()">Close</button></div>
    `;
}

// renders delete button in open note
function renderDeleteButton(currentNote) {
  let deleteOptions = setDeleteOptions(currentNote);

/*   if (currentNote.status == 'saved') {
    callFunction = 'deleteNote';
    hoverText = 'Delete';
  } else {
    callFunction = 'deleteNoteDefinitely';
    hoverText = 'Delete definitly';
  } */

  document.getElementById('show_note_actions_buttons').innerHTML = ` <img
  src="img/icons8-full-trash-50.png"
  alt="delete note"
  class="icon note_icon hover" onclick="${deleteOptions[0]}(${currentNote.id}), closeNote()"
/><span class="hover_text" id="hover_text">${deleteOptions[1]}</span>`;
}

//renders edit or restore button
function renderEditOrRestoreButton(currentNote) {
  if (currentNote.status == 'saved') {
    document.getElementById('show_note_actions_buttons').innerHTML += `<img
     src="img/icons8-pencil-64.png"
     alt="edit note"
     class="icon note_icon hover" onclick="edit(${currentNote.id}), closeNote()"/><span class="hover_text icon2" id="hover_text2">Edit</span>`;
  } else {
    document.getElementById('show_note_actions_buttons').innerHTML += `<img
     src="img/icons8-upload-96.png"
     alt="edit note"
     class="icon note_icon hover" onclick="restore(${currentNote.id}), closeNote()"/><span class="hover_text icon2" id="hover_text2">Restore</span>`;
  }
}

function closeNote() {
  document.getElementById('show_note').innerHTML = '';

  let showNoteBg = document.getElementById('show_note_bg');
  showNoteBg.classList.add('invisible');
}

/* ------------  EDIT  ---------------- */

function edit(id) {
  closeNote();
  setTimeout(function () {
    addNote(id);
  }, 50);
  //for editing note in the add note container and loading the notes content
}

function getCurrentNote(id) {
  return notes.find((n) => n.id == id);
}
