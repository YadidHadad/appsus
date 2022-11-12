import { noteService } from '../services/note.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteDetails from './note-details.cmp.js'
import noteLabelFilter from '../cmps/note-label-filter.cmp.js'

export default {
    name: 'note-index',
    props: [],
    template: `
        <section class="app-container note-app">
            <note-filter class="search-filter" @filterTitle="setFilterTitle" />
            
            <note-details 
            v-if="selectedNote" 
            :note="selectedNote"
            @noteToRemove="removeNote"
            @unselectNote="resetSelectedNote"/>
            
            <div class="flex row">
                
                <label-filter @filterLabel="setFilterLabel"/>
                
                <div class="note-lists flex column">
                        <note-add class="" @newNote="addNewNote" :urlInfo="urlInfo"/>
                    <note-list 
                    v-if="notes"
                    :notes="notes"
                    @selectedNoteToShow="setSelectedNote"
                    @removeNote="removeNote" />

                </div>
                </div>
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
    mounted() {
        this.notesToShow()
        this.urlInfo.value = this.$route.params.value
    },

    methods: {
        setFilterTitle(value) {
            this.filterBy.title = value.title
            this.notesToShow()
        },

        setFilterLabel(value) {
            this.filterBy.label = value
            this.notesToShow()
        },

        notesToShow() {
            noteService.query(this.filterBy)
                .then(notes => {
                    this.notes = notes
                    this.filterBy = {
                        title: '',
                        label: [],
                    }
                })
        },

        addNewNote(newNote) {
            this.notes.unshift(newNote)
        },

        setSelectedNote(note) {
            this.selectedNote = note

        },
        resetSelectedNote() {
            this.selectedNote = null

        },

        //--------------------------------------------- edit function
        removeNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes.splice(idx, 1)

        }
        //--------------------------------------------- edit function
    },

    computed: {},
    components: {
        noteFilter,
        noteList,
        noteAdd,
        noteDetails,
        labelFilter: noteLabelFilter,
    },
}


// label: ['critical', 'family', 'work', 'friends', 'spam', 'memories', 'romantic']