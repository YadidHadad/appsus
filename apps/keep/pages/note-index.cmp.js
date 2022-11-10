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
            <note-filter class="search-filter" @filterTitle="setFilterTitle" />
            <!-- <div class="center> -->
                <note-add class="" @newNote="addNewNote"/>
                <note-list 
                    v-if="notes"
                    :notes="notes" />

        </section>

        `,
    data() {
        return {
            filterBy: {
                title: '',
                // label: ['family', 'memories'],
                label: ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic'],
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
            this.filterBy.title = value.title
            this.notesToShow()
        },
        notesToShow() {
            return noteService.query(this.filterBy)
                .then(notes => {
                    this.notes = notes
                    this.filterBy = {
                        title: '',
                        label: ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic'],
                    }
                })


        },
        addNewNote(newNote) {
            console.log(newNote)
            this.notes.unshift(newNote)

        }
    },

    computed: {},
    components: {
        noteFilter,
        noteList,
        noteAdd,

    },
}
