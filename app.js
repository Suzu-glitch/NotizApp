const notes = [
  {
    title: "Notiz 1",
    content: "Lorem Ipsum",
    id: 1,
    lastUpdated: 1693149614492,
  },
  {
    title: "Notiz 2",
    content: "Lorem Ipsum",
    id: 2,
    lastUpdated: 1693149622194,
  },
  {
    title: "Notiz 3",
    content: "Lorem Ipsum",
    id: 3,
    lastUpdated: 1693149629935,
  },
];

const notesListEl = document.querySelector(".notes-list");

function displayNotesList(notesToShow) {
  notesListEl.innerHTML = "";

  const sortedNotes = [...notesToShow].sort(
    (a, b) => b.lastUpdated - a.lastUpdated,
  );

  sortedNotes.forEach((note) => {
    notesListEl.innerHTML += `
      <div class="note-entry" data-id="${note.id}">
        <div class="note-title">${note.title}</div>
        <div class="note-content-teaser">${note.content}</div>
        <div class="note-date">${new Date(note.lastUpdated).toLocaleString("de-DE")}</div>
      </div>
    `;
  });
}

displayNotesList(notes);
