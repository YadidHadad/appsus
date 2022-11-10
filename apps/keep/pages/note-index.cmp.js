import { noteService } from '../services/note.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'


export default {
    name: 'note-index',
    props: [],
    template: `
        <section class="app-container">
            <!-- <h1>NOTE INDEX</h1> -->
            <note-filter class="search-filter" @filterTitle="setFilterTitle"/>
            <!-- <div class="center> -->
                <note-add class="center"></note-add>
                <note-list 
                    v-if="notes"
                    :notes="notes" />

        </section>

        `,
    data() {
        return {
            filterBy: {
                title: '',
                label: [],
            },
            notes: null,
        }
    },
    created() {
        this.notesToShow()
    },
    methods: {
        setFilterTitle(value) {
            console.log(`value:`, value)
            this.filterBy.title = value
            this.notesToShow()
        },

        notesToShow() {
            // debugger
            return noteService.query()
                .then(notes => {
                    console.log(`notes:`, notes)
                    var filter = { ...this.filterBy.title }
                    console.log(`filter:`, filter.title)
                    const regex = new RegExp(filter.title, 'i')
                    notes = notes.filter(note => regex.test(note.info.title) && note.info.label.some(label => this.filterBy.label.includes(label)))
                    this.notes = notes
                    return notes
                })
        },
    },
    computed: {},
    components: {
        noteFilter,
        noteList,
        noteAdd,

    },
}
