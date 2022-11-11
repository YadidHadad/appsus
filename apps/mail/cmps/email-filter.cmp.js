export default {
  template: `
<section>
      <input @input="filter" v-model="filterBy.text" type="search" placeholder="Search mail" />
      <select class="filter-select" @change="filter" v-model="filterBy.isRead">
      <option value="all">All</option>
      <option value="true">Read</option>
      <option value="">Unread</option>
    </select>
</section>
    `,
  data() {
    return {
      filterBy: {
        text: '',
        isRead: 'all',
      },
    }
  },

  methods: {
    filter() {
      this.$emit('filter', this.filterBy)
    },
  },

}
