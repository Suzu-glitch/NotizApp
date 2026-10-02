const notesListEl = document.querySelector(".notes-list");
let selectedNoteId = null;

function displayNotesList(notesToShow) {
  const sortedNotes = [...notesToShow].sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
      <div class="note-entry ${note.id === selectedNoteId ? "selected-note" : ""}" data-id="${note.id}">
        <div class="note-title">${note.title}</div>
        <div class="note-content-teaser">${note.content}</div>
        <div class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</div>
      </div>
    `;
  });

  notesListEl.innerHTML = html;
}

displayNotesList(getNotes());

const titleInputEl = document.querySelector("#title-input");
const contentInputEl = document.querySelector("#content-input");
const saveNoteButtonEl = document.querySelector(".save-note");

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

saveNoteButtonEl.addEventListener("click", handleSaveNote);

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

notesListEl.addEventListener("click", handleNoteClick);
