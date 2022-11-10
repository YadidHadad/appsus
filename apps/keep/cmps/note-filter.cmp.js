export default {
    name: 'note-filter',
    props: [],
    template: `
        <section >
            <input type="text" placeholder="search note by title" v-model.lazy="filterBy.title" @change="filter" />
        </section>
        `,
    created() { },
    data() {
        return {
            filterBy: {
                title: '',
            }
        }
    },
    methods: {
        filter() {
            console.log(`this.filterBy:`, { ...this.filterBy })
            this.$emit('filterTitle', { ...this.filterBy })
        }
    },

}
