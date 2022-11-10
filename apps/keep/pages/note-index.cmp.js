import { noteService } from '../services/note.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteDetails from './note-details.cmp.js'

export default {
    name: 'note-index',
    props: [],
    template: `
        <section class="app-container">
            <note-filter class="search-filter" @filterTitle="setFilterTitle" />
            <note-add class="" @newNote="addNewNote"/>
            <!-- <note-details v-if="selectedNote" :note="selectedNote"/> -->
            <note-list 
                v-if="notes"
                :notes="notes"
                @selectedNoteToShow="setSelectedNote" />
        </section>

        `,
    data() {
        return {
            filterBy: {
                title: '',
                label: ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic'],
            },
            notes: null,
            selectedNote: null,
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
        },

        setSelectedNote(note) {
            this.selectedNote = note

        }
    },

    computed: {},
    components: {
        noteFilter,
        noteList,
        noteAdd,
        noteDetails,
    },
}
