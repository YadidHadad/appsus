export default {
  template: `
<section class="email-filter">
      <input @input="filter" v-model="filterBy.text" type="search" placeholder="Search mail" />
    <select @change="filter" v-model="filterBy.isRead" >
      <option value="true">Read</option>
      <option value=''>Unread</option>
    </select>
</section>
    `,
  data() {
    return {
      filterBy: {
        text: '',
        isRead: '',
      },
    }
  },

  methods: {
    filter() {
      this.$emit('filter', this.filterBy)
    },
  },

}
