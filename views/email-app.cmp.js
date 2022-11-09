import { emailService } from '../apps/mail/services/email.service.js'
import emailList from '../apps/mail/cmps/email-list.cmp.js'
import emailFilter from '../apps/mail/cmps/email-filter.cmp.js'
export default {
  name: 'email-app',
  props: [],
  template: `
        <section class="email-section">
            <h1>email</h1>
            <email-filter @filter="filter"/>
            <email-list v-if="emails"/>
      
        </section>
        `,

  data() {
    return {
      emails: null,

      filterBy: {
        text: '',
        isRead: '',
      },
    }
  },

  created() {
    emailService.query().then((emails) => (this.emails = emails))
  },

  methods: {
    filter(filterBy) {
      console.log(filterBy)
      this.filterBy = filterBy
    },
  },

  computed: {
    emailsToShow() {
      if (!this.filterBy) return this.emails
      const { text, isRead } = this.filterBy
      const regex = new RegExp(text, 'i')
      let emails = this.emails.filter((email) => regex.test(email.subject))
      emails = emails.filter((email) => (isRead ? email.isRead : !email.isRead))
    },
  },

  components: {
    emailList,
    emailFilter,
  },
}
