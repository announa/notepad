/* ------------  SHOW NOTE  ------------ */

// display note container
function showNote(id, event) {
  let currentNote = getCurrentNote(id);
  showNoteBg();
  renderNote(currentNote, event.target);
}

function showNoteBg() {
  let showNoteBg = document.getElementById('show_note_bg');
  showNoteBg.classList.remove('d-none');
  setTimeout(() => {
    showNoteBg.classList.remove('invisible');
  }, 5);
}

//renders open Note
function renderNote(currentNote, noteContainer) {
  let notePosition = getNotePosition(noteContainer);
  playOpenAnimation(notePosition);
  renderTitleAndContent(currentNote);
  renderDeleteButton(currentNote);
  renderEditOrRestoreButton(currentNote);

  document.getElementById('show_note').classList.add('show_note_open');
}

function getNotePosition(noteContainer) {
  let position = noteContainer.getBoundingClientRect();
  console.log(position);
  const styles = {
    left: position.left + 'px',
    top: position.top + 'px',
    width: position.width + 'px',
    height: position.height + 'px',
  };

  return styles;
}

function playOpenAnimation(notePosition) {
  Object.assign(document.getElementById('show_note').style, notePosition);
}

// renders title and content of the open note
function renderTitleAndContent(currentNote) {
  console.log(currentNote.title);
  console.log(currentNote.content);
  document.getElementById('open_note__title').innerText = currentNote.title;
  document.getElementById('open_note__content').innerText = currentNote.content;
}

// renders delete button in open note
function renderDeleteButton(currentNote) {
  setTimeout(() => {
    document.getElementById('show_note__delete').addEventListener('click', function () {
      currentNote.status == 'saved' ? deleteNote(currentNote.id) : deleteNoteDefinitely(currentNote.id);
      closeNote();
    });

  }, 5);
}

//renders edit or restore button
function renderEditOrRestoreButton(currentNote) {
  if (currentNote.status == 'saved') {
    document.getElementById('show_note__edit').addEventListener('click', function () {
      edit(currentNote.id);
      closeNote();
    });
  } else {
    document.getElementById('show_note__restore').addEventListener('click', function () {
      restore(currentNote.id);
      closeNote();
    });
  }
}

function closeNote() {
  document.getElementById('open_note__title').innerHTML = '';
  document.getElementById('open_note__content').innerHTML = '';
  hideNoteBg();
}

function hideNoteBg() {
  let showNoteBg = document.getElementById('show_note_bg');
  showNoteBg.classList.add('invisible');
  setTimeout(() => {
    showNoteBg.classList.add('d-none');
  }, 225);
}
