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
  document.getElementById('open_note__title').innerText = currentNote.title;
  document.getElementById('open_note__content').innerText = currentNote.content;
}

// renders delete button in open note
function renderDeleteButton(currentNote) {
  setTimeout(() => {
    document.getElementById('show_note__delete').onclick = function () {
      addDeleteFunction(currentNote);
      closeNote('delete');
    };
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
      closeNote('edit');
    });
  } else {
    document.getElementById('show_note__restore').addEventListener('click', function () {
      restore(currentNote.id);
      closeNote('restore');
    });
  }
}

function closeNote(action) {
  document.getElementById('open_note__title').innerHTML = '';
  document.getElementById('open_note__content').innerHTML = '';
  document.getElementById('show_note__delete').onclick = '';
  playCloseAnimation(action);
  hideNoteBg();
}

function playCloseAnimation(action) {
  let showNote = document.getElementById('show_note');
  if (action == 'delete') {
    const trashPosition = getPosition('trash-link');
    Object.assign(showNote.style, trashPosition);
  }
  if(action == 'restore'){
    const notesPosition = getPosition('notes-link');
    Object.assign(showNote.style, notesPosition);
  }
  if(action == 'edit'){
    const editorPosition = getPosition('add_note');
    Object.assign(showNote.style, editorPosition);
  }
  showNote.classList.remove('show_note_open');
}

function getPosition(targetElement) {
  let position = document.getElementById(targetElement).getBoundingClientRect();
  const styles = {
    left: position.left + 'px',
    top: position.top + 'px',
    width: position.width + 'px',
    height: position.height + 'px',
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
