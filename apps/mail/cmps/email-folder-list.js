export default {
  template: `
    <section class="email-folder-list">
        <ul class="clean-list">
        <li @click="setFilterByStatus('inbox')">Inbox</li>
        <li @click="setFilterByStatus('sent')">Sent</li>
        <li @click="setFilterByStatus('trash')">Trash</li>
        <li @click="setFilterByStatus('draft')">Draft</li>
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
  },
}
