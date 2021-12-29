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
  toggleClass(['add_note_symbol', 'content', 'title', 'actions', 'close'], 'd-none');
  toggleClass(['add_note_symbol', 'actions'], 'flex');
  document.getElementById('add_note').classList.add('add_note_open');
}

function closeEditor() {
  ['title', 'content'].forEach((e) => (document.getElementById(e).value = ''));
  toggleClass(['content', 'title', 'actions', 'close'], 'd-none');
  document.getElementById('add_note').classList.remove('add_note_open');
  document.getElementById('actions').classList.remove('flex');

  setTimeout(function () {
    document.getElementById('add_note_symbol').classList.add('flex');
    document.getElementById('add_note_symbol').classList.remove('d-none');
  }, 300);
}

function toggleClass(elementArray, ClassName) {
  elementArray.forEach((e) => document.getElementById(e).classList.toggle(ClassName));
}

/* ------------  SAVE NOTE  ------------ */

function saveNote(currentNote) {
  setNote(currentNote);
  saveToLocalStorage();
  closeEditor();
  renderSavedNotes();
}

function setNote(currentNote) {
  let title = filter(document.getElementById('title').value);
  let content = filter(document.getElementById('content').value);

  if (currentNote) {
    currentNote.title = title.value;
    currentNote.content = content.value;
  } else {
    let newNote = new Note(title, content);
    newNote.id = notes.length + 1;
    notes.push(newNote);
  }
}

function filter(text) {
  text.replace('<', '&lt;');
  text.replace('>', '&gt;');
  return text;
}

function saveToLocalStorage() {
  let notesStringified = JSON.stringify(notes);
  localStorage.setItem('notes', notesStringified);
}
