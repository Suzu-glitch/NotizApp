const NOTES_STORAGE_KEY = "notes";

function getNotes() {
  const notesJson = localStorage.getItem(NOTES_STORAGE_KEY);

  if (!notesJson) {
    return [];
  }

  return JSON.parse(notesJson);
}

function setNotes(notesToSave) {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesToSave));
}

function getNextId() {
  const notes = getNotes();

  if (notes.length === 0) {
    return 1;
  }

  const ids = notes.map((note) => note.id);
  return Math.max(...ids) + 1;
}

function saveNote(title, content, id) {
  const notes = getNotes();

  if (id) {
    const noteToUpdate = notes.find((note) => note.id === id);

    if (!noteToUpdate) {
      return null;
    }

    noteToUpdate.title = title;
    noteToUpdate.content = content;
    noteToUpdate.lastUpdated = Date.now();

    setNotes(notes);
    return noteToUpdate;
  }

  const newNote = {
    id: getNextId(),
    title: title,
    content: content,
    lastUpdated: Date.now(),
  };

  notes.push(newNote);
  setNotes(notes);

  return newNote;
}

function deleteNote(id) {
  const notes = getNotes();

  const remainingNotes = notes.filter((note) => note.id !== id);

  setNotes(remainingNotes);
}
