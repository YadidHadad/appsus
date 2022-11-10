import emailPreview from './email-preview.cmp.js'

export default {
  name: 'email-list',
  props: ['emails'],
  template: `
        <section class="email-list flex  justify-center">
         <ul class="flex flex-column clean-list">
            <li v-for="email in emails" :key="email.id">
            <button class="remove-btn fa" @click="remove(email.id)"></button>
                <router-link :to="'/email/' + email.id"> <email-preview :email="email"/></router-link>
            </li>
         </ul>
        </section>
        `,
    created() {
       console.log(this.emails);
    },

        methods: {
            remove(emailId){
                this.$emit('remove', emailId)
            },
        },

  components: {
    emailPreview,
  },
}
