import { emailService } from '../services/email.service.js'
export default {
  name: 'email-details',
  template: `
  
  <section class="email-details grow" v-if="email"> 
    <router-link class=" fa left-arrrow-icon" @click="closeEmail" to="/email"></router-link>
    <section class="email-header">
    <h1>{{email.subject}}</h1>
    <h3><span class=" fa user-circel-icon"></span><span>{{email.from.name}}:</span> <span>{{email.from.emailAddress}}</span></h3>
    </section>
    <section class="email-body">
    <p>{{email.body}}</p>
    </section>
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

  methods: {
    closeEmail() {
      this.$emit('closeEmail')
    },
  },

  computed: {
    emailId() {
      return this.$route.params.id
    },
  },
}
