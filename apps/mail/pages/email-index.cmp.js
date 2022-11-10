import { emailService } from '../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailFolderList from '../cmps/email-folder-list.js'
import emailCompose from '../cmps/email-compose.cms.js'

export default {
  name: 'email-app',
  props: [],
  template: `
        <section class="app-container email-app">
          <email-compose @sendMail="composeEmail" class="email-compose"/>
            <email-filter @filter="filter" class="search-filter filter"/>
            <email-folder-list @filterByStatus="filterStatus" class="email-folder-list"/>
            <email-list @remove="removeEmail" v-if="emails" :emails="emails"/>
        </section>
        `,

  data() {
    return {
      emails: null,
      filterBy: {
        text: '',
        isRead: 'all',
        status: null,
      },
    }
  },

  created() {
    this.emailsToShow({ ...this.filterBy }).then((emails) => {
      this.emails = emails
      console.log(emails)
    })
  },

  methods: {
    filter(filterBy) {
      console.log(filterBy)
      this.filterBy = filterBy
      this.emailsToShow({ ...this.filterBy })
    },

    filterStatus(filterBy) {
      console.log(filterBy)
      this.filterBy.status = filterBy
      this.emailsToShow({ ...this.filterBy })
    },
    removeEmail(emailId) {
      emailService.remove(emailId).then(() => {
        const idx = this.emails.findIndex((email) => email.id === emailId)
        this.emails.splice(idx, 1)
      })
    },
    emailsToShow(filterBy) {
      return emailService.query(filterBy).then((emails) => {
        this.emails = emails
        return emails
      })
    },

    composeEmail(email) {
      const { subject, to, body } = email
      const newEmail = emailService.getEmptyEmail(subject, body, to)
      emailService.save(newEmail).then((email) => this.emails.push(email))
    },
  },

  components: {
    emailList,
    emailFilter,
    emailFolderList,
    emailCompose,
  },
}
