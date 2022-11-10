export default {
    name:'email-compose',
  template: `
    <form @submit.prevent="sendMail">
        <button @click="close">X</button>
        <input v-model="newMail.emailAddress" type="email" placeholder="Email to"/>
        <input v-model="newMail.subject" type="text" placeholder="Subject" />
        <textarea v-model="newMail.body" name="comment" placeholder="Body" >Enter text here...</textarea>
        <button>Send</button>
    </form>
    `,
  data() {
    return {
      newMail: {
        emailAddress: '',
        subject: '',
        body: '',
      },
    }
  },
  methods: {
    sendMail() {
      this.$emit('sendMail', { ...this.newMail })
    },
    close(){
        this.$emit('close')
    }
  },
}
