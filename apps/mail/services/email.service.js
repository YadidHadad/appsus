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
    if (filterBy.isRead != 'all') {
      newEmails = newEmails.filter((email) => (filterBy.isRead ? email.isRead : !email.isRead))
    }
    if (filterBy.status) {
      newEmails = newEmails.filter((email) => email.status === filterBy.status)
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
  return storageService.post(EMAILS_KEY, email)
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY)
  if (!emails || !emails.length) {
    emails = emailsData
    utilService.saveToStorage(EMAILS_KEY, emails)
    console.log(emails)
  }
}

function _createEmail(subject, body, to) {
  const email = getEmptyEmail(vendor, maxSpeed)
  email.id = utilService.makeId()
  return email
}

function getEmptyEmail(subject, body, to) {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead: null,
    statut: 'sent',
    sendAt: Date.now(),
    from: { name: loggedinUser.fullname, emailAddress: loggedinUser.email },
    to,
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
