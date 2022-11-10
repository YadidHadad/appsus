import { utilService } from '../../../services/util.service.js'

import noteImg from './note-img.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteTxt from './note-txt.cmp.js'
import noteVideo from './note-video.cmp.js'

// transform:rotate(0deg)


export default {
    name: 'note list',
    props: ['notes'],
    template: `
        <h1>your pinned notes are here!</h1>
        <section class="note-list">
            <article v-for="note in notes"  :key="note.id" class="note-preview flex column justify-center align-center" :style="{ backgroundColor: 'todo.style' }" >
                <div v-if="note.isPinned" class="pinned"><span class="fa pin-icon"></span></div>
                <component :is="note.type" v-if="note.isPinned" :info="note.info"/>
            </article>
        </section>
        <h1>and some other stuff are kept here...</h1>
        <section class="note-list">
                <article v-for="note in notes"  :key="note.id" class="note-preview fade flex justify-center align-center" :style="{ backgroundColor: 'todo.style' }" >
                    <component :is="note.type" v-if="!note.isPinned" :info="note.info"/>
                </article>
        </section>
        `,
    created() {
    },
    data() {
        return {
        }
    },
    methods: {

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
