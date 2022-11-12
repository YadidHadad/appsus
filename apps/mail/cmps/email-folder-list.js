export default {
  props: ['emails'],
  template: `
    <section class="email-folder-list flex gap">
        <button @click="composeEmail"><span class="fa pen-icon"></span>Compose</button>
        <ul class="clean-list gap">
          <li @click="setFilterByStatus('inbox')"><span class="fa inbox-icon"></span>Inbox</li>
          <li @click="setFilterByStatus('sent')"><span class="fa sent-icon"></span>Sent</li>
          <li @click="setFilterByStatus('trash')"><span class="fa trash-icon"></span>Trash</li>
          <li @click="setFilterByStatus('draft')"><span class="fa draft-icon"></span>Draft</li>
        </ul>
    </section>
    `,

  data() {
    return {
      filterByStatus: {
        status: null,
      },
    }
  },

  methods: {
    setFilterByStatus(status) {
      this.filterByStatus.status = status
      console.log(status)
      this.$emit('filterByStatus', this.filterByStatus.status)
    },

    composeEmail() {
      this.$emit('composeEmail')
    },
  },

}
