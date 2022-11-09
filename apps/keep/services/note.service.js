import { utilService } from './services/util.service.js'
import { storageService } from './services/async-storage.service.js'

import notesData from '/data/notes.json' assert { type: 'json' }

console.log(`gNotes:`, notesData)

const NOTES_KEY = 'notesDB'

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getNextNoteId,
  getPrevNoteId,
}

function query() {
  return storageService.query(NOTES_KEY)
}

function get(noteId) {
  console.log(`noteId:`, noteId)
  return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
  console.log(`note.id:`, note.id)
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  console.log(notes)
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

// function _createCars() {
//     let cars = utilService.loadFromStorage(CAR_KEY)
//     if (!cars || !cars.length) {
//         cars = []
//         cars.push(_createCar('Audu Mea', 300))
//         cars.push(_createCar('Fiak Ibasa', 120))
//         cars.push(_createCar('Subali Pesha', 100))
//         cars.push(_createCar('Mitsu Bashi', 150))
//         utilService.saveToStorage(CAR_KEY, cars)
//     }
//     return cars
// }

// function _createCar(vendor, maxSpeed = 250) {
//     const car = getEmptyCar(vendor, maxSpeed)
//     car.id = utilService.makeId()
//     return car
// }
