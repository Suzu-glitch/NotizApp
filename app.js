const notesListEl = document.querySelector(".notes-list");
const titleInputEl = document.querySelector("#title-input");
const contentInputEl = document.querySelector("#content-input");
const saveNoteButtonEl = document.querySelector(".save-note");
const deleteNoteButtonEl = document.querySelector(".delete-note");
const createNewButtonEl = document.querySelector(".create-new");

let selectedNoteId = null;

saveNoteButtonEl.addEventListener("click", handleSaveNote);
notesListEl.addEventListener("click", handleNoteClick);
deleteNoteButtonEl.addEventListener("click", handleDeleteNote);
createNewButtonEl.addEventListener("click", resetNoteSelection);

displayNotesList(getNotes());

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function displayNotesList(notesToShow) {
  const sortedNotes = [...notesToShow].sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
  );

  let html = "";
  sortedNotes.forEach((note) => {
    html += `
      <div class="note-entry ${note.id === selectedNoteId ? "selected-note" : ""}" data-id="${note.id}">
        <div class="note-title">${escapeHtml(note.title)}</div>
        <div class="note-content-teaser">${escapeHtml(note.content)}</div>
        <div class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</div>
      </div>
    `;
  });

  notesListEl.innerHTML = html;
}

function handleSaveNote() {
  const title = titleInputEl.value.trim();
  const content = contentInputEl.value.trim();

  if (title === "" || content === "") {
    alert("Bitte Titel und Inhalt eingeben.");
    return;
  }

  saveNote(title, content, selectedNoteId);
  displayNotesList(getNotes());

  if (selectedNoteId === null) {
    titleInputEl.value = "";
    contentInputEl.value = "";
  }
}

function handleNoteClick(event) {
  const noteEntryEl = event.target.closest(".note-entry");
  if (!noteEntryEl) {
    return;
  }

  const noteId = Number(noteEntryEl.dataset.id);
  const clickedNote = getNotes().find((savedNote) => savedNote.id === noteId);
  if (!clickedNote) {
    return;
  }

  selectedNoteId = clickedNote.id;
  titleInputEl.value = clickedNote.title;
  contentInputEl.value = clickedNote.content;
  displayNotesList(getNotes());
}

function resetNoteSelection() {
  selectedNoteId = null;
  titleInputEl.value = "";
  contentInputEl.value = "";
  displayNotesList(getNotes());
}

function handleDeleteNote() {
  if (selectedNoteId === null) {
    return;
  }

  deleteNote(selectedNoteId);
  resetNoteSelection();
}
