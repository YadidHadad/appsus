export default {
    name: 'note-filter',
    props: [],
    emits: ['filterTitle'],
    template: `
        <section >
            <input type="text" placeholder="search note by title" v-model.lazy="filterBy.title" @change="filter" />
            <div class="filter-by-type-btns-container">
                <button @click="setNoteType('note-txt')" class="fa text-icon add-btn"></button>
                <button @click="setNoteType('note-img')" class="fa img-icon add-btn" ></button>
                <button @click="setNoteType('note-video')" class="fa video-icon add-btn" ></button>
                <button @click="setNoteType('note-todos')" class="fa list-icon add-btn" ></button>
            </div>
        </section>
        `,
    created() { },
    data() {
        return {
            filterBy: {
                title: null,
                type: null,
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filterTitle', { ...this.filterBy })
        },
        setNoteType(type) {
            this.filterBy.type = type
            this.filter()
        }
    },

}
