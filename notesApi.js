const NOTES_STORAGE_KEY = "notes";

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

function getNotes() {
  const notesJson = localStorage.getItem(NOTES_STORAGE_KEY);

  if (!notesJson) {
    return [];
  }

  return JSON.parse(notesJson);
}

function saveNotes(notesToSave) {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesToSave));
}
