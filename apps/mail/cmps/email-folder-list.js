export default {
  template: `
    <section class="email-folder-list">
        <div>Inbox</div>
        <div>Sent</div>
        <div>Trash</div>
        <div>Draft</div>
    </section>
    `,
  data() {
    return {
      filterByStatus: {
        inbox: '',
        sent: '',
        draft: '',
        trash: '',
      },
    }
  },
}
