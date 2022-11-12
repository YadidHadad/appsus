import { noteService } from '../services/note.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteLabelFilter from '../cmps/note-label-filter.cmp.js'
import noteDetails from "../cmps/note-details.cmp.js"


export default {
    name: 'note-index',
    props: [],
    template: `
        <section class="app-container note-app">
            <note-filter class="search-filter" @filterTitle="setFilterTitle" />
            
            <section class="flex row">
                
                <note-label-filter @filterLabel="setFilterLabel"/>
                
                <div class="note-lists flex column">
                    <note-add class="" @newNote="addNewNote" :urlInfo="urlInfo"/>
                    <note-list 
                    v-if="notes"
                    :notes="notes"
                    @removeNote="removeNote"
                     />

                </div>
            </section>
                <note-details 
                    v-if="isNoteSelected && notes" 
                    :notes="notes"
                    />


        </section>

        `,
    data() {
        return {
            filterBy: {
                title: '',
                label: [],
            },
            notes: null,
            urlInfo: {
                title: ''
            },
        }
    },
    created() {
        this.notesToShow()
            .then(notes => {
                console.log(notes)
                this.notes = notes
            })
        console.log(`this.notes:`, this.notes)
        this.urlInfo.value = this.$route.params.title
        console.log(this.$route.path)
        console.log(this.$route.params)
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
            return noteService.query(this.filterBy)
                .then(notes => {
                    this.notes = notes
                    this.filterBy = {
                        title: '',
                        label: [],
                    }
                    return notes
                })
        },

        addNewNote(newNote) {
            this.notes.unshift(newNote)
        },
        removeNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes.splice(idx, 1)
        }
    },

    computed: {
        isNoteSelected() {
            if (this.$route.params.id) return true
            else false
        },
    },
    components: {
        noteFilter,
        noteList,
        noteAdd,
        noteLabelFilter,
        noteDetails
    },
}