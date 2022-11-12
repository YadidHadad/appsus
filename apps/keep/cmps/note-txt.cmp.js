import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import noteEdit from './note-edit.cmp.js'
import longTxt from '../../../cmps/long-txt.cmp.js'
export default {
    name: '',
    props: ['note'],
    template: `
        <section class='note-txt' :style="style">
        <div v-if="note.isPinned" class="pinned" @click="togglePin(note)"><span class="fa pin-icon"></span></div>

            <h5>{{note.info.title}}</h5>
            <!-- <p>{{note.info.txt..slice(0,)}}</p> -->
            <long-txt :txt="note.info.txt"/>
            
            <note-edit :note="note" @removeNote="removeNote"/>
        </section>
        `,
    components: {
        noteEdit,
        longTxt,
    },
    created() { },
    data() {
        return {}
    },
    methods: {
        //--------------------------------------------- edit function
        togglePin(note) {
            const noteToEdit = note
            noteToEdit.isPinned = !noteToEdit.isPinned
            noteService.save(noteToEdit)
                .then(response => response)
        },
        removeNote(noteId) {
            this.$emit('removeNote', noteId)
        }




        //--------------------------------------------- edit function
    },
    computed: {
        style() {
            const deg = utilService.getRandomInt(-10, 10)
            return { transform: 'rotate(' + deg + 'deg)', backgroundColor: this.note.info.style.backgroundColor }
        },

    },
}
