export default {
  name: 'email-compose',
  props: ['urlInfo'],
  template: `
    <form @submit.prevent="sendMail">
      <h3>New Message <button @click="close">X</button></h3>
      <input v-model="newMail.emailAddress" type="email" placeholder="Email to"/>
      <input v-model="newMail.subject" type="text" placeholder="Subject" />
      <textarea v-model="newMail.body" name="comment" placeholder="Body" >Enter text here...</textarea>
      <button>Send</button>
      <router-link v-if="newMail.subject.length > 0" :to="'/note/'+ '000/' + newMail.subject +''">Keep as Note</router-link>

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
  created() {
    console.log(this.urlInfo)

    if (this.urlInfo.subject !== 'undefined') this.newMail.subject = this.urlInfo.subject
    if (this.urlInfo.body !== 'undefined') this.newMail.body = this.urlInfo.body
  },
  methods: {
    sendMail() {
      this.$emit('sendMail', { ...this.newMail })
    },
    close() {
      this.$emit('close')
    },

  },
}
