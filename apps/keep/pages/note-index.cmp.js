import { noteService } from '../services/note.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'


export default {
    name: 'note-index',
    props: [],
    template: `
        <section class="note-app">
            <!-- <h1>NOTE INDEX</h1> -->
            <note-filter class="note-filter" @filterTitle="setFilterTitle"/>
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
            return noteService.query()
                .then(notes => {
                    // this.notes = notes
                    console.log(`notes:`, notes)
                    const regex = new RegExp(this.filterBy.title, 'i')
                    notes = notes.filter(note => {
                        var test = regex.test(note.info.title)
                        console.log(`test:`, test)
                        return test
                    }
                        // && note.info.label.some(label => this.filterBy.label.includes(label))
                    )
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
