export default {
  template: `
    <form @sumbit.prevent="sendMail">
        <input v-model="emailAddress" type="email" />
        <input v-model="subject" type="text" />
        <textarea v-model="body" name="comment" >Enter text here...</textarea>
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
  },
}
