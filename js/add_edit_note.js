/* -------------  ADD NOTE AREA  -------------- */

function addNote(id) {
  openEditor();

  if (id) {
    let noteToEdit = getCurrentNote(id);
    document.getElementById('title').value = noteToEdit.title;
    document.getElementById('content').value = noteToEdit.content;
    document.getElementById('save_button').onclick = function () {
      saveNote(noteToEdit);
    };
  } else {
    document.getElementById('save_button').onclick = function () {
      saveNote();
    };
  }
}

function openEditor() {
  toggleClass(['add_note_symbol', 'content', 'title', 'actions'], 'd-none');
  toggleClass(['add_note'], 'hover');
  document.getElementById('add_note').classList.add('add_note_open');
  document.getElementById('save_button').disabled = 'true';
  addCloseEventToOtherElements();
}

function addCloseEventToOtherElements() {
  document.onclick = function () {
    closeEditorFromOtherElements(event);
  };
}

function closeEditorFromOtherElements(event) {
  let otherElements = [];
  let parentElements = Array.from(document.querySelectorAll('.note'));
  parentElements.push(document.getElementById('delete_all'))
  parentElements.forEach(p => {
    otherElements.push(p);
    let children = Array.from(p.querySelectorAll('*'));
    children.forEach((c) => otherElements.push(c));
  });
 
  if (otherElements.includes(event.target)) {
    closeEditor();
  }
}

function removeCloseEventFromOtherElements() {
  document.onclick = '';
}

function closeEditor() {
  console.log('close editor');
  ['title', 'content'].forEach((e) => document.getElementById(e).value = '');
  toggleClass(['content', 'title', 'actions'], 'd-none');
  toggleClass(['add_note'], 'hover');
  document.getElementById('add_note').classList.remove('add_note_open');

  setTimeout(function () {
    document.getElementById('add_note_symbol').classList.remove('d-none');
  }, 300);
  removeCloseEventFromOtherElements();
}

function enableButton() {
  let input = document.getElementById('title').value + document.getElementById('content').value;
  if (input != '') {
    document.getElementById('save_button').disabled = false;
  } else {
    document.getElementById('save_button').disabled = true;
  }
}

/* ------------  SAVE NOTE  ------------ */

function saveNote(noteToEdit) {
  let currentNote = setNoteContent(noteToEdit);
  saveToLocalStorage();
  closeEditor();
  renderCurrentNote(currentNote, noteToEdit);
}

function setNoteContent(noteToEdit) {
  let title = document.getElementById('title').value;
  let content = document.getElementById('content').value;

  if (noteToEdit) {
    noteToEdit.title = title;
    noteToEdit.content = content;
    return noteToEdit;
  } else {
    let newNote = new Note(title, content);
    newNote.id = getNoteId();
    notes.push(newNote);
    return newNote;
  }
}

function getNoteId() {
  if (notes.length > 0) {
    let allIds = notes.map((n) => n.id);
    return Math.max(...allIds) + 1;
  } else {
    return 1;
  }
}

function renderCurrentNote(currentNote, noteToEdit) {
  if (currentNote == noteToEdit) {
    updateNote(noteToEdit);
  } else {
    renderNewNote(currentNote);
  }
}

function updateNote(noteToEdit) {
  showEditAnimation(noteToEdit);
  document.getElementById('title' + noteToEdit.id).innerText = noteToEdit.title;
  document.getElementById('content' + noteToEdit.id).innerText = noteToEdit.content;
}

function renderNewNote(currentNote) {
  document.getElementById('notes_container').insertAdjacentHTML('afterbegin', getHTML(currentNote));
  insertUserInput(currentNote);
  showEditAnimation(currentNote);
  showDeleteAllBtn();
}

function showEditAnimation(note) {
  document.getElementById('note' + note.id).classList.add('note-edited-animation');
  document.getElementById('delete' + note.id).classList.add('note-edited-animation-img');
  document.getElementById('title' + note.id).classList.add('note-edited-animation-p');
  document.getElementById('content' + note.id).classList.add('note-edited-animation-p');
  setTimeout(() => {
    document.getElementById('note' + note.id).classList.remove('note-edited-animation');
    document.getElementById('delete' + note.id).classList.remove('note-edited-animation-img');
    document.getElementById('title' + note.id).classList.remove('note-edited-animation-p');
    document.getElementById('content' + note.id).classList.remove('note-edited-animation-p');
  }, 1000);
}

function showDeleteAllBtn(){
  let savedNotes = notes.filter((n) => n.status == 'saved');
  if(savedNotes.length == 1){
    document.getElementById('delete_all').classList.remove('d-none');

  }
}

/* ------------  EDIT  ---------------- */

function edit(id) {
  closeNote();
  setTimeout(function () {
    addNote(id);
  }, 50);
  //for editing note in the add note container and loading the notes content
}
