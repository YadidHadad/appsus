import emailPreview from './email-preview.cmp.js'

export default {
  name: 'email-list',
  emits: ['remove'],
  props: ['emails'],
  template: `
        <section class="email-list" v-if="!this.$route.params.id">
          <ul v-if="isListShow" class="flex flex-column clean-list">
            <li v-for="email in emails" :key="email.id">
              <button class="remove-btn fa" @click="remove(email.id)"></button>
              <router-link @click="openEmail" :to="'/email/' + email.id"> <email-preview :email="email"/></router-link>
            </li>
          </ul>
        </section>
        <section>
          <router-view @closeEmail="openEmail"></router-view>
        </section>
        `,
  data() {
    return {
      isListShow: true,
    }
  },
  created() {
    console.log(this.emails)
  },

  methods: {
    remove(emailId) {
      this.$emit('remove', emailId)
    },
    openEmail() {
      this.isListShow = !this.isListShow
    },
  },

  components: {
    emailPreview,
  },
}
