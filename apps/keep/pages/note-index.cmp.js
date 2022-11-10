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
            <note-add class="" @newNote="addNewNote" :urlInfo="urlInfo"/>
            
            <note-details 
                v-if="selectedNote" 
                :note="selectedNote"
                @noteToRemove="removeNote"
                @unselectNote="resetSelectedNote"/>

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
                label: [],
            },
            notes: null,
            selectedNote: null,
            urlInfo: {
                value: ''
            }
        }
    },
    created() {
        this.notesToShow()

        this.urlInfo.value = this.$route.params.value
        console.log(this.$route)
        console.log(this.$route.params.value)
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
                        label: [],
                    }
                })
        },

        addNewNote(newNote) {
            console.log(newNote)
            this.notes.unshift(newNote)
        },

        setSelectedNote(note) {
            this.selectedNote = note

        },
        resetSelectedNote() {
            console.log('close')
            this.selectedNote = null

        },
        removeNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes = this.notes.splice(idx, 1)
            this.notesToShow()
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


// label: ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']