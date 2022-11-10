import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import notesData from '../../../data/notes.json' assert { type: 'json' }

const NOTES_KEY = 'notesDB'

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getNextNoteId,
  getPrevNoteId,
  createNote,
}

function query(filterBy) {
  var filter = { ...filterBy }
  var title = filter.title
  var labels = [...filterBy.label]

  console.log(filter)
  console.log(title)
  console.log(labels)


  return storageService.query(NOTES_KEY)
    .then(notes => {
      const regex = new RegExp(title, 'i')
      let newNotes = notes.filter(note => regex.test(note.info.title))
      if (labels.length > 0) newNotes = newNotes.filter(note => note.info.label.some(label => labels.includes(label)))
      console.log(newNotes)
      return newNotes
    })
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = notesData
    utilService.saveToStorage(NOTES_KEY, notesData)
  }
}

function getNextNoteId(noteId) {
  return storageService.query(NOTES_KEY).then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId)
    if (idx === notes.length - 1) idx = -1
    return notes[idx + 1].id
  })
}

function getPrevNoteId(noteId) {
  return storageService.query(NOTES_KEY).then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId)
    if (idx === 0) idx = notes.length
    return notes[idx - 1].id
  })
}

function createNote(type, value) {
  const note = _getNoteData(type, value)
  return save(note)
    .then(response => { return response })
}

function _getNoteData(type, value) {

  if (type === 'txt') return {
    type: 'note-txt',
    isPinned: false,
    info: {
      title: value,
      txt: '',
      label: [],
      style: {
        backgroundColor: 'white'
      }
    }
  }
  else if (type === 'img') return {
    type: 'note-img',
    isPinned: false,
    info: {
      title: '',
      url: value,
      label: [],
      style: {
        backgroundColor: 'white'
      }
    }
  }
  else if (type === 'video') return {
    type: 'note-video',
    isPinned: false,
    info: {
      title: '',
      url: value,
      label: [],
      style: {
        backgroundColor: 'white'
      }
    }
  }
  else if (type === 'todos') return {
    type: 'note-todos',
    isPinned: false,
    info: {
      title: '',
      label: [],
      todos: value.split(',').map(todo => {
        return {
          txt: todo,
          doneAt: null,
        }
      }),
      style: {
        backgroundColor: 'white'
      }
    }
  }
}
