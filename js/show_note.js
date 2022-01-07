/* ------------  SHOW NOTE  ------------ */

// display note container
function showNote(id, event) {
  let currentNote = getCurrentNote(id);
  let notePosition = getNotePosition(event.target);
  showNoteBg();
  openNote(notePosition);
  renderNote(currentNote);
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

function openNote(notePosition) {
  let showNote = document.getElementById('show_note');
  Object.assign(showNote.style, notePosition);
  setTimeout(() => {
    showNote.classList.add('show_note_open');
  }, 5);
}

function showNoteBg() {
  let showNoteBg = document.getElementById('show_note_bg');
  showNoteBg.classList.remove('d-none');
  setTimeout(() => {
    showNoteBg.classList.remove('invisible');
  }, 5);
}

//renders open Note
function renderNote(currentNote) {
  renderTitleAndContent(currentNote);
  renderDeleteButton(currentNote);
  renderEditOrRestoreButton(currentNote);
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
  let clickFunction = function () {
    addDeleteFunction(currentNote);
    closeNote('delete');
  };
  setTimeout(() => {
    document.getElementById('show_note__delete').addEventListener('click', clickFunction, { once: true });
    /*  function () {
      currentNote.status == 'saved' ? deleteNote(currentNote.id) : deleteNoteDefinitely(currentNote.id);
      closeNote();
    }) */
  }, 5);
}

function addDeleteFunction(currentNote) {
  currentNote.status == 'saved' ? deleteNote(currentNote.id) : deleteNoteDefinitely(currentNote.id);
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

function closeNote(action) {
  document.getElementById('open_note__title').innerHTML = '';
  document.getElementById('open_note__content').innerHTML = '';
  /*   document.getElementById('show_note__delete').removeEventListener('click', clickFunction); */
  playCloseAnimation(action);
  hideNoteBg();
}

function playCloseAnimation(action) {
  let showNote = document.getElementById('show_note');
  if (action) {
    const trashPosition = getTrashPosition();
    Object.assign(showNote.style, trashPosition);
  }
  showNote.classList.remove('show_note_open');
}

function getTrashPosition() {
  let trashPosition = document.getElementById('trash-link').getBoundingClientRect();
  const styles = {
    left: trashPosition.left + 'px',
    top: trashPosition.top + 'px',
    width: trashPosition.width + 'px',
    height: trashPosition.height + 'px',
  };
  return styles;
}

function hideNoteBg() {
  let showNoteBg = document.getElementById('show_note_bg');
  showNoteBg.classList.add('invisible');
  setTimeout(() => {
    showNoteBg.classList.add('d-none');
  }, 225);
}
