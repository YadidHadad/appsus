import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'

// transform:rotate(0deg)


export default {
    name: 'note list',
    props: ['notes'],
    emits: ['selectedNoteToShow'],

    template: `
        <h1>your pinned notes are here!</h1>
        <section class="note-list">
            <article v-for="note in notes"  :key="note.id" class="note-preview flex column justify-center align-center" :style="{ backgroundColor: 'todo.style' }" >
                <div v-if="note.isPinned" class="pinned" @click="togglePin(note)"><span class="fa pin-icon"></span></div>
                <component :is="note.type" v-if="note.isPinned" :info="note.info" @click="editNote(note)"/>
            </article>
        </section>
        <h1>and some other stuff are kept here...</h1>
        <section class="note-list">
            <article v-for="note in notes"  :key="note.id" class="note-preview fade flex justify-center align-center" :style="{ backgroundColor: 'todo.style' }" >
                <div v-if="!note.isPinned" class="pinned" @click="togglePin(note)"><span class="fa unpin-icon"></span></div>
                <component :is="note.type" v-if="!note.isPinned" :info="note.info"  @click="editNote(note)" @setNoteToRemove="removeNote(note)"/>
            </article>
        </section>
        `,
    created() {
    },

    data() {
        return {
            noteToEditId: null,
        }
    },

    methods: {
        togglePin(note) {
            const noteToEdit = note
            noteToEdit.isPinned = !noteToEdit.isPinned
            noteService.save(noteToEdit)
                .then(response => response)
        },

        editNote(note) {
            this.$router.push(`/note/${note.id}`)
            this.$emit('selectedNoteToShow', { ...note })
        },
        removeNote() {
            console.log(note)

        }
    },

    computed: {

    },
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVideo,
    },
}
