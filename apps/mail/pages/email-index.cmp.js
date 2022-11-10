import { emailService } from '../services/email.service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'

export default {
  name: 'email-app',
  props: [],
  template: `
        <section class="email-section">
            <email-filter @filter="filter"/>
            <email-list @remove="removeEmail" v-if="emails" :emails="emails"/>
        </section>
        `,

  data() {
    return {
      emails: null,
      filterBy: {
        text: "",
        isRead: 'all',
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
      this.emailsToShow(this.filterBy)
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
  },

  //   computed: {},

  components: {
    emailList,
    emailFilter,
  },
}
