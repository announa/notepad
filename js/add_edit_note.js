/* -------------  ADD NOTE AREA  -------------- */

function addNote(id) {
  openEditor();

  if (id) {
    let currentNote = getCurrentNote(id);
    document.getElementById('title').value = currentNote.title;
    document.getElementById('content').value = currentNote.content;
    document.getElementById('save_button').onclick = function () {
      saveNote(currentNote);
    };
  }
}

function openEditor() {
  toggleClass(['add_note_symbol', 'content', 'title', 'actions'], 'd-none');
  toggleClass(['add_note_symbol', 'actions'], 'flex');
  toggleClass(['add_note'], 'hover');
  document.getElementById('add_note').classList.add('add_note_open');
  document.getElementById('save_button').disabled = 'true';
}

function closeEditor() {
  ['title', 'content'].forEach((e) => (document.getElementById(e).value = ''));
  toggleClass(['content', 'title', 'actions'], 'd-none');
  toggleClass(['add_note'], 'hover');
  document.getElementById('add_note').classList.remove('add_note_open');
  document.getElementById('actions').classList.remove('flex');

  setTimeout(function () {
    document.getElementById('add_note_symbol').classList.add('flex');
    document.getElementById('add_note_symbol').classList.remove('d-none');
  }, 300);
}

function enableButton(){
  let input = document.getElementById('title').value + document.getElementById('content').value;
  if(input != ''){
    document.getElementById('save_button').disabled = false;
  } else{
    document.getElementById('save_button').disabled = true;
  }
}

/* ------------  SAVE NOTE  ------------ */

function saveNote(currentNote) {
  setNote(currentNote);
  saveToLocalStorage();
  closeEditor();
  renderSavedNotes();
}

function setNote(currentNote) {
  let title = document.getElementById('title').value;
  let content = document.getElementById('content').value;
  /* let title = filter(document.getElementById('title').value);
  let content = filter(document.getElementById('content').value); */

  if (currentNote) {
    currentNote.title = title;
    currentNote.content = content;
  } else {
    let newNote = new Note(title, content);
    newNote.id = getNoteId();
    notes.push(newNote);
  }
}

/* function filter(text) {
  text = text.replace(/</g, '&lt;');
  text = text.replace(/>/g, '&gt;');
  return text;
} */

function getNoteId() {
  if (notes.length > 0) {
    let allIds = notes.map((n) => n.id);
    return Math.max(...allIds) + 1;
  } else {
    return 1;
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
