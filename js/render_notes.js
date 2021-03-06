/* ------------  RENDER NOTES AREA  ------------ */

function renderSavedNotes() {
  setHeadline('saved');
  renderNotes('saved');
}

function renderDeletedNotes() {
  setHeadline('deleted');
  renderNotes('deleted');
}

function setHeadline(status) {
  if (hasNotes(status)) {
    renderStandardHeadline(status);
  } else {
    renderDefaultHeadline(status);
  }
}

function renderDefaultHeadline(status) {
  document.getElementById('delete_all').classList.add('d-none');
  document.getElementById('section-headline__alt').classList.remove('d-none');
  if (status == 'saved') {
    document.getElementById('section-headline').classList.add('d-none');
  }
}

function renderStandardHeadline(status) {
  document.getElementById('delete_all').classList.remove('d-none');
  document.getElementById('section-headline__alt').classList.add('d-none');
  if (status == 'saved') {
    document.getElementById('section-headline').classList.remove('d-none');
  }
}

function hasNotes(status) {
  return notes && notes.some((note) => note.status == status);
}

/* ------------  RENDER NOTES  ----------- */

function renderNotes(status) {
  let notesContainer = document.getElementById('notes_container');
  notesContainer.innerHTML = '';
  let currentNotes = notes.filter((n) => n.status == status);
  currentNotes.forEach((note) => {
    notesContainer.insertAdjacentHTML('afterbegin', getHTML(note));
    insertUserInput(note);
  });
}

function getHTML(note) {
  let deleteOptions = setDeleteOptions(note);

  return `
  <div class="note hover" id="note${note.id}" onclick="showNote(${note.id}, event)">
    <p id="title${note.id}" class ="note-p note-title word-wrap">${note.title}</p>
    <p id="content${note.id}" class ="note-p note-content word-wrap">${note.content}</p>
    <div class="delete_note hover" onclick="${deleteOptions[0]}(${note.id})">
      <img id="delete${note.id}" src="img/icons8-full-trash-50.png" alt="delete note" class="note_icon invert hover"/>
      <span class="hover_text hover_translate">${deleteOptions[1]}</span>
    </div>
  </div>`;
}

function insertUserInput(note){
  document.getElementById(`title${note.id}`).innerText = note.title;
  document.getElementById(`content${note.id}`).innerText = note.content;
}

function setDeleteOptions(note) {
  let callFunction = note.status == 'saved' ? 'deleteNote' : 'deleteNoteDefinitely';
  let hoverText = note.status == 'saved' ? 'Delete' : 'Delete definitely';
  return [callFunction, hoverText];
}
