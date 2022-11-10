import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'

export default {
    name: '',
    props: ['note'],
    template: `

        <section class="note-details">
            <h1>{{note.info.title}}</h1>

        </section>


        `,
    created() {
        console.log(`note:`, { ...this.note })
        this.noteToShow = { ...this.note }
        console.log(this.noteToShow)
    },
    data() {
        return {
            noteToShow: null,
        }
    },
    methods: {},
    computed: {},
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVideo,
    },
}
