import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import emailsData from '../../../data/email.json' assert { type: 'json' }

const EMAILS_KEY = 'emailsDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
_createEmails()

export const emailService = {
  query,
  get,
  remove,
  save,
  getNextEmailId,
  getPrevEmailId,
}

function query(filterBy) {
  return storageService.query(EMAILS_KEY).then((emails) => {
    const regex = new RegExp(filterBy.text, 'i')
    let newEmails = emails.filter((email) => regex.test(email.subject))
    if (filterBy.isRead != "all") {
      newEmails = newEmails.filter((email) => (filterBy.isRead ? email.isRead : !email.isRead))
    }

    return newEmails
  })
}

function get(emailId) {
  console.log(`emailId:`, emailId)
  return storageService.get(EMAILS_KEY, emailId)
}

function remove(emailId) {
  return storageService.remove(EMAILS_KEY, emailId)
}

function save(email) {
  console.log(`email.id:`, email.id)
  if (email.id) {
    return storageService.put(EMAILS_KEY, email)
  } else {
    return storageService.post(EMAILS_KEY, email)
  }
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY)
  if (!emails || !emails.length) {
    emails = emailsData
    utilService.saveToStorage(EMAILS_KEY, emails)
    console.log(emails)
  }
}

function getNextEmailId(emailId) {
  return storageService.query(EMAILS_KEY).then((emails) => {
    var idx = emails.findIndex((email) => email.id === emailId)
    if (idx === emails.length - 1) idx = -1
    return emails[idx + 1].id
  })
}

function getPrevEmailId(emailId) {
  return storageService.query(EMAILS_KEY).then((emails) => {
    var idx = emails.findIndex((email) => email.id === emailId)
    if (idx === 0) idx = emails.length
    return emails[idx - 1].id
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
