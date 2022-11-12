import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import noteEdit from './note-edit.cmp.js'

export default {
    name: '',
    props: ['note'],
    template: `
        <section class='note-video' :style="style">
            <div v-if="note.isPinned" class="pinned" @click="togglePin(note)"><span class="fa pin-icon"></span></div>
            <h5>{{note.info.title}}</h5>
            <div class="video-container">
                <iframe :src="note.info.url" frameborder="0" allowfullscreen class="video"></iframe>
            </div>  
            <note-edit :note="note" @removeNote="removeNote"/>
        </section>
        `,
    components: {
        noteEdit
    },
    created() {
    },
    data() {
        return {

        }
    },
    methods: {
        togglePin(note) {
            const noteToEdit = note
            noteToEdit.isPinned = !noteToEdit.isPinned
            noteService.save(noteToEdit)
                .then(() => {
                    showSuccessMsg('note was pinned successfully!')
                })
                .catch(() => showErrorMsg('Error occurred while saving note to storage!'))
        },
        removeNote(noteId) {
            this.$emit('removeNote', noteId)
        }
    },
    computed: {
        style() {
            const deg = utilService.getRandomInt(-10, 10)
            return { transform: 'rotate(' + deg + 'deg)', backgroundColor: this.note.info.style.backgroundColor }
        },
    },
}
