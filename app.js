const notesListEl = document.querySelector(".notes-list");

const MOCK_NOTES = [
  {
    id: 1,
    title: "Notiz 1",
    content: "Lorem Ipsum",
    lastUpdated: 1693149614492,
  },
  {
    id: 2,
    title: "Notiz 2",
    content: "Lorem Ipsum",
    lastUpdated: 1693149622194,
  },
  {
    id: 3,
    title: "Notiz 3",
    content: "Lorem Ipsum",
    lastUpdated: 1693149629935,
  },
];

function displayNotesList(notesToShow) {
  const sortedNotes = [...notesToShow].sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
      <div class="note-entry" data-id="${note.id}">
        <div class="note-title">${note.title}</div>
        <div class="note-content-teaser">${note.content}</div>
        <div class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</div>
      </div>
    `;
  });

  notesListEl.innerHTML = html;
}

displayNotesList(MOCK_NOTES);
