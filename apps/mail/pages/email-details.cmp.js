import { emailService } from '../services/email.service.js'
export default {
  name: 'email-details',
  template: `
  
  <section class="email-details" v-if="email">
  <router-link to="/email">←</router-link>
  <h1>{{email.subject}}</h1>
  <p>{{email.body}}</p>
  </section>
        `,

  data() {
    return {
      email: null,
    }
  },
  created() {
    emailService.get(this.emailId).then((email) => (this.email = email))
  },

  computed: {
    emailId() {
      return this.$route.params.id
    },
  },
}
