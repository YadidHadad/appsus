import { emailService } from '../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailFolderList from '../cmps/email-folder-list.js'
import emailCompose from '../cmps/email-compose.cms.js'

export default {
  name: 'email-app',
  template: `
          <div class="on-mobile-menu-open" :class="show" @click="toggleMobileMenu"></div>
          <button class="fa arrow-icon open-mobile-menu" @click="toggleMobileMenu"></button>
          <section class="app-container email-app">
            <email-filter class="search-filter" @filter="filter" />
            <email-folder-list class="email-folder-list" :class="show" @filterByStatus="filterStatus" @composeEmail="openEmailCompose" />
            <email-compose class="email-compose" v-if="isComposeOpen" @sendMail="composeEmail" @close="openEmailCompose"  :urlInfo="urlInfo"/>
            <email-list v-if="emails" @remove="removeEmail" @read="readenEmail" :emails="emails"/>
        </section>
        `,

  data() {
    return {
      emails: null,
      isMenuOpen: false,
      filterBy: {
        text: '',
        isRead: 'all',
        status: null,
      },
      isComposeOpen: false,
      urlInfo: {
        subject: this.$route.params.subject,
        body: this.$route.params.body,
      },
    
    }
  },

  created() {
    this.emailsToShow({ ...this.filterBy }).then((emails) => {
      this.emails = emails
    })
    if (this.$route.params.subject || this.$route.params.body) {
      this.isComposeOpen = true
    }
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

    readenEmail(emailId) {
      const idx = this.emails.findIndex((email) => email.id === emailId)
      if (this.emails[idx].isRead === true) return
      console.log(this.emails[idx].isRead)
      this.emails[idx].isRead = true
      emailService.get(emailId).then((email) => {
        email.isRead = true
        emailService.save(email)
      })
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
    sendToNote(email) {
      emailService.sendEmailToNote(email)
    },
    composeEmail(email) {
      const { subject, to, body } = email
      const newEmail = emailService.getEmptyEmail(subject, body, to)
      emailService.save(newEmail).then((email) => this.emails.push(email))
      console.log(this.emails)
    },
    openEmailCompose() {
      this.isComposeOpen = !this.isComposeOpen
    },
    toggleMobileMenu() {
      this.isMenuOpen = !this.isMenuOpen
      console.log('hi')
    },
    // getUnredCount() {
    //   const emails = this.emails
    //   console.log(emails)
    //   const countUnred = emails.filter((email) => !email.isRead)
    //   return countUnred.length
    // },
  },

  computed: {
    show() {
      return { show: this.isMenuOpen }
    },
  },

  components: {
    emailList,
    emailFilter,
    emailFolderList,
    emailCompose,
  },
}
