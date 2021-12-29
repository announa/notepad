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

/* ------------  SHOW NOTE  ------------ */

// display note container
function showNote(id) {
  console.log(id);
  let showNoteBg = document.getElementById('show_note_bg');

  showNoteBg.classList.remove('invisible');
  showNoteBg.classList.add('flex');

  renderNote(id);
}

//renders open Note
function renderNote(id) {
  let showNote = document.getElementById('show_note');

  renderTitleAndContent(id, showNote);
  renderDeleteButton(id);
  renderEditOrRestoreButton(id);

  showNote.classList.add('show_note_open');
}

// renders title and content of the open note
function renderTitleAndContent(id, showNote) {
  let currentNote = getCurrentNote(id);
  console.log(currentNote);

  showNote.innerHTML += `
  <div class="show_note_title" id=open_note${id}>${currentNote.title}</div>
  <div class="show_note_content" id=open_note${id}>${currentNote.content}</div>
  <div class="show_note_actions">
  <div class="show_note_actions_buttons" id="show_note_actions_buttons">
    </div>
    <button onclick="closeNote()">Close</button></div>
    `;
}

// renders delete button in open note
function renderDeleteButton(status, id) {
  let callFunction;
  let hoverText;

  if (status == 'saved') {
    callFunction = 'deleteNote';
    hoverText = 'Delete';
  } else {
    callFunction = 'deleteNoteDefinitely';
    hoverText = 'Delete definitly';
  }

  document.getElementById('show_note_actions_buttons').innerHTML = ` <img
  src="img/icons8-full-trash-50.png"
  alt="delete note"
  class="icon note_icon hover" onclick="${callFunction}(${id}), closeNote()"
/><span class="hover_text" id="hover_text">${hoverText}</span>`;
}

//renders edit or restore button
function renderEditOrRestoreButton(status, id) {
  if (status == 'saved') {
    document.getElementById('show_note_actions_buttons').innerHTML += `<img
     src="img/icons8-pencil-64.png"
     alt="edit note"
     class="icon note_icon hover" onclick="edit(${id}), closeNote()"/><span class="hover_text icon2" id="hover_text2">Edit</span>`;
  } else {
    document.getElementById('show_note_actions_buttons').innerHTML += `<img
     src="img/icons8-upload-96.png"
     alt="edit note"
     class="icon note_icon hover" onclick="restore(${id}), closeNote()"/><span class="hover_text icon2" id="hover_text2">Restore</span>`;
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
  console.log(id);
  return notes.find((n) => n.id == id);
}
