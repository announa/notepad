/* ------------  DELETE NOTES  -------------- */

//moves notes from titles-array to titlesDeleted-array
function deleteNote(id) {
  console.log(event);
  event.stopPropagation();
  moveToDeleted(id);
  saveToLocalStorage();
  renderSavedNotes();
}

function moveToDeleted(id) {
  let currentNote = getCurrentNote(id);
  currentNote.status = 'deleted';
}

function deleteAllNotes() {
  for (let i = 0; i < notes.length; i++) {
    notes[i].status = 'deleted';
  }
  saveToLocalStorage();
  loadFromLocalStorage();
  renderSavedNotes();
}

/* ---------------  DELETE DEFINITELY  --------------- */

function deleteNoteDefinitely(id) {
  event.stopPropagation();

  let currentNote = notes.find((n, i) => {
    n.id == id;
    return i;
  });

  notes.splice(currentNote, 1);

  saveToLocalStorage();
  renderDeletedNotes();
}

function deleteAllNotesDef() {
  notes = [];

  saveToLocalStorage();
  renderDeletedNotes();
}

/* --------------  RESTORE  -------------- */

function restore(id) {
  let currentNote = getCurrentNote(id);
  currentNote.status = 'saved'
  saveToLocalStorage();

  loadFromLocalStorage();
  renderDeletedNotes();
  setTimeout(function () {
    closeNote();
  }, 300);
}
