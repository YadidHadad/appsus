export default {
  props: ['email'],
  template: `
     <section class="email-preview flex justify-between" :class="isRead">
       <h4>{{email.from.name}}</h4>
       <h4>{{email.subject}}</h4>
       <h4>{{getDate}}</h4>
      </section>
    `,

  computed: {
    isRead() {
      return { unread: !this.email.isRead, read: this.email.isRead }
    },
    getDate() {
      return new Date(this.email.sentAt).toDateString().slice(4, 10)
    },
  },
}
