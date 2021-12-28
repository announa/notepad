let titles = [];
let notes = [];
let titlesDeleted = [];
let notesDeleted = [];

load();
loadDeleted();

function load() {
  let titleStringify = localStorage.getItem('title');
  let noteStringify = localStorage.getItem('note');

  if (titleStringify && noteStringify) {
    titles = JSON.parse(titleStringify);
    notes = JSON.parse(noteStringify);
  }
}

function render(status) {
  let notesHeadline = document.getElementById('notes_headline');
  let add_note = document.getElementById('add_note');
  document.getElementById('notes_container').innerHTML = '';

  if (status == 'saved') {
    renderSavedHead();
    renderSavedNotes(notesHeadline);
  } else {
    renderDeletedHead();
    renderDeletedNotes(notesHeadline);
  }

  let hoverText = document.getElementsByClassName('hover_text');
  if (status == 'saved') {
    for (i = 0; i < hoverText.length; i++) {
      hoverText[i].innerHTML = 'Delete';
    }
  } else {
    for (i = 0; i < hoverText.length; i++) {
      hoverText[i].innerHTML = 'Delete definitely';
    }
  }
}

/* -------------  RENDER HEAD AREAS  ------------- */

function renderSavedHead() {
  document.getElementById('headline').innerHTML = 'Your Notepad';
  add_note.classList.remove('d-none');
  add_note.classList.add('flex');

  document.getElementById('delete_all_text').innerHTML = 'Delete all notes';

  document.getElementById('delete_all').onclick = deleteAllNotes;
}

function renderDeletedHead() {
  document.getElementById('headline').innerHTML = 'Deleted Notes';
  add_note.classList.remove('flex');
  add_note.classList.add('d-none');

  document.getElementById('delete_all_text').innerHTML =
    'Delete all notes definitely';
  document.getElementById('delete_all').onclick = deleteAllNotesDef;
}

/* --------------  RENDER NOTES AREAS  -------------- */

function renderSavedNotes(notesHeadline) {
  if (titles == 0 && notes == 0) {
    document.getElementById('delete_all').classList.add('d-none');
    notesHeadline.innerHTML = `<h3>You didn't add any notes yet</h3>`;
  } else {
    document.getElementById('delete_all').classList.remove('d-none');

    notesHeadline.innerHTML = `<h2>Saved notes</h2>`;

    for (i = notes.length; i > 0; i--) {
      let noteId = i - 1;
      const title = titles[noteId];

      renderNotes('saved', noteId, title);
    }
  }
}

function renderDeletedNotes(notesHeadline) {
  if (titlesDeleted == 0 && notesDeleted == 0) {
    document.getElementById('delete_all').classList.add('d-none');
    notesHeadline.innerHTML = `<h3>You didn't delete any notes</h3>`;
  } else {
    document.getElementById('delete_all').classList.remove('d-none');

    notesHeadline.innerHTML = '';

    for (i = notesDeleted.length; i > 0; i--) {
      let noteId = i - 1;
      const title = titlesDeleted[noteId];

      renderNotes('deleted', noteId, title);
    }
  }
}

function renderNotes(status, noteId, title) {
  let notesContainer = document.getElementById('notes_container');
  let callFunction;

  if (status == 'saved') {
    callFunction = 'deleteNote';
  } else {
    callFunction = 'deleteNoteDefinitely';
  }

  notesContainer.innerHTML += `<div class="note hover" id="note${noteId}" onclick="showNote('${status}',${noteId})"><p class ="word-wrap">${title}</p><hr><hr><hr><hr><hr>
  <div class="delete_note hover"><img src="img/icons8-full-trash-50.png" onclick="${callFunction}(${noteId})" alt="delete note" class="icon note_icon invert hover"/><span class="hover_text hover_translate"></div></div>`;
}

/* -------------  ADD NOTE AREA  -------------- */

function addNote(id) {
  openEditor();

  if (id != undefined) {
    document.getElementById('title').value = titles[id];
    document.getElementById('content').value = notes[id];
    document.getElementById('save_button').onclick = function () {
      saveNote(id);
    };
  }
}

function openEditor() {
  document.getElementById('add_note_symbol').classList.remove('flex');
  document.getElementById('add_note_symbol').classList.add('d-none');
  document.getElementById('content').classList.remove('d-none');
  document.getElementById('title').classList.remove('d-none');
  document.getElementById('actions').classList.remove('d-none');
  document.getElementById('close').classList.remove('d-none');
  document.getElementById('actions').classList.add('flex');
  document.getElementById('add_note').classList.add('add_note_open');
}

function closeEditor() {
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('add_note').classList.remove('add_note_open');
  document.getElementById('close').classList.add('d-none');
  document.getElementById('actions').classList.add('d-none');
  document.getElementById('actions').classList.remove('flex');
  document.getElementById('content').classList.add('d-none');
  document.getElementById('title').classList.add('d-none');

  setTimeout(function () {
    document.getElementById('add_note_symbol').classList.add('flex');
    document.getElementById('add_note_symbol').classList.remove('d-none');
  }, 300);
}

/* ------------  SAVE NOTE  ------------ */

function saveNote(id) {
  let newTitle = document.getElementById('title');
  let newNote = document.getElementById('content');

  if (id >= 0) {
    titles[id] = newTitle.value;
    notes[id] = newNote.value;
  } else {
    titles.push(newTitle.value);
    notes.push(newNote.value);
  }

  save();
  closeEditor();
  render('saved');
}

function save() {
  let titleStringify = JSON.stringify(titles);
  let noteStringify = JSON.stringify(notes);

  localStorage.setItem('title', titleStringify);
  localStorage.setItem('note', noteStringify);
}

/* ------------  SHOW NOTE  ------------ */

// display note container
function showNote(status, id) {
  let showNoteBg = document.getElementById('show_note_bg');

  showNoteBg.classList.remove('invisible');
  showNoteBg.classList.add('flex');

  renderNote(status, id);
}

//renders open Note
function renderNote(status, id) {
  let showNote = document.getElementById('show_note');

  renderTitleAndContent(status, id, showNote);
  renderDeleteButton(status, id);
  renderEditOrRestoreButton(status, id);

  showNote.classList.add('show_note_open');
}

// renders title and content of the open note
function renderTitleAndContent(status, id, showNote) {
  let showedTitle;
  let showedNote;

  if (status == 'saved') {
    showedTitle = titles[id];
    showedNote = notes[id];
  } else {
    showedTitle = titlesDeleted[id];
    showedNote = notesDeleted[id];
  }

  showNote.innerHTML += `
  <div class="show_note_title" id=open_note${id}>${showedTitle}</div>
  <div class="show_note_content" id=open_note${id}>${showedNote}</div>
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

/* ------------  DELETE NOTES  -------------- */

//moves notes from titles-array to titlesDeleted-array
function deleteNote(id) {
  event.stopPropagation();
  titlesDeleted.push(titles[id]);
  notesDeleted.push(notes[id]);

  saveAsDeleted();

  titles.splice(id, 1);
  notes.splice(id, 1);

  save();
  render('saved');
}

// saves deleted notes to local storage
function saveAsDeleted() {
  let titlesDeletedStringify = JSON.stringify(titlesDeleted);
  let notesDeletedStringify = JSON.stringify(notesDeleted);

  localStorage.setItem('titlesDeleted', titlesDeletedStringify);
  localStorage.setItem('notesDeleted', notesDeletedStringify);
}

//loads deleted notes from local storage to titlesDeleted-array
function loadDeleted() {
  let titlesDeletedStringify = localStorage.getItem('titlesDeleted');
  let notesDeletedStringify = localStorage.getItem('notesDeleted');

  if (titlesDeletedStringify && notesDeletedStringify) {
    titlesDeleted = JSON.parse(titlesDeletedStringify);
    notesDeleted = JSON.parse(notesDeletedStringify);
  }
}

function deleteAllNotes() {
  let b = notes.length;

  for (i = 0; i < b; i++) {
    titlesDeleted.push(titles[0]);
    notesDeleted.push(notes[0]);

    titles.splice(0, 1);
    notes.splice(0, 1);
  }
  saveAsDeleted();
  save();
  load();
  loadDeleted();
  render('saved');
}

/* ---------------  DELETE DEFINITELY  --------------- */

function deleteNoteDefinitely(id) {
  event.stopPropagation();

  titlesDeleted.splice(id, 1);
  notesDeleted.splice(id, 1);

  saveAsDeleted();
  render('deleted');
}

function deleteAllNotesDef() {
  let i = notesDeleted.length;

  titlesDeleted.splice(0, i);
  notesDeleted.splice(0, i);

  saveAsDeleted();
  render('deleted');
}

/* --------------  RESTORE  -------------- */

function restore(id) {
  titles.push(titlesDeleted[id]);
  notes.push(notesDeleted[id]);
  save();

  titlesDeleted.splice(id, 1);
  notesDeleted.splice(id, 1);
  saveAsDeleted();

  load();
  loadDeleted();
  render('deleted');
  setTimeout(function () {
    closeNote();
  }, 300);
}
