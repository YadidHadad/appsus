export default {
  props: ['email'],
  template: `
     <section class="email-preview flex justify-between" :class="isRead">
       <h4>{{email.from.name}}</h4>
       <h4>{{getShortSubject}}</h4>
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

    getShortSubject() {
      if (this.email.subject.length > 39) this.email.subject += '...'
      return this.email.subject.substring(0, 40)
    },
  },
}
