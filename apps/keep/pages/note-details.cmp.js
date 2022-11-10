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
        <section class="note-details" :style="{backgroundColor: note.info.style.backgroundColor}">
            <div class="user-preferences flex row align-items justify-center gap">
                <div @click="closeNote">close</div>
                <div>color</div>
                <div @click="removeNote">remove</div>
                <router-link  :to="'/email/' + email.subject + '/'+ email.body + ''">send as email</router-link>

            </div>
            <section v-if="note.type === 'note-img'">
                <img class="image-container "  :style="{ backgroundImage: 'url(' + note.info.url + ')' }"/>    
            </section>
            <h1>{{note.info.title}}</h1>
            <section v-if="note.type === 'note-txt'">
                <p>{{note.info.txt}}</p>
            </section>
            <section v-if="note.type === 'note-todos'" >
                <ul v-for="todo in note.info.todos">
                    <li><span>{{todo.txt}}</span><span>{{todo.doneAt}}</span></li>
                </ul>
            </section>
            <div v-if="note.type === 'note-video'" class="video-container">
                <iframe :src="note.info.url" frameborder="0" allowfullscreen class="video"></iframe>
            </div>  
            <section class="flex row align-items justify-center gap" >
                <div v-for="label in note.info.label">
                    <div>{{label}}</div>
                </div>
            </section>
            
        </section>
        `,
    created() {
    },
    unmounted() {
        console.log(this.$route)
    },
    data() {
        return {

            email: {
                subject: this.note.info.title,
                body: this.note.info.url || this.note.info.txt
            }

        }
    },
    methods: {
        removeNote() {
            this.$emit('noteToRemove', { ...this.note.id })
            console.log(this.note)
            noteService.remove(this.note.id)
                .then(() => this.closeNote())
        },

        closeNote() {
            this.$emit('unselectNote')

        },
    },
    computed: {},
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVideo,
    },
}
