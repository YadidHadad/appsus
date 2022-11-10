import { noteService } from "../services/note.service.js"

export default {
    name: 'note-add',
    props: ['urlInfo'],
    template: `
        <form class="note-add flex "  @submit.prevent="createNote">
            <input type="text" :placeholder="placeholder" v-model="note.value"  ref="name" />
            <div class="flex row align-center btns-container">
                <div :class="{selectedNoteType : note.type==='txt' }">
                    <span @click="setNoteType('txt')" class="fa text-icon add-btn"></span>
                </div>                    
                <div :class="{selectedNoteType : note.type==='img' }">
                    <span @click="setNoteType('img')" class="fa img-icon add-btn" ></span>
                </div>
                <div :class="{selectedNoteType : note.type==='video' }">
                    <span @click="setNoteType('video')" class="fa video-icon add-btn" ></span>
                </div>
                <div :class="{selectedNoteType : note.type==='todos' }">
                    <span @click="setNoteType('todos')" class="fa list-icon add-btn" ></span>
                </div>
            </div>
        </form>
        `,
    components: {},
    created() {
        console.log(this.urlInfo)

        if (this.urlInfo.value) {

            if (this.urlInfo.value !== '') {
                this.note.value = this.urlInfo.value
                this.createNote()
            }
        }


    },
    mounted() {
        this.$refs.name.focus()
    },
    data() {
        return {
            note: {
                type: 'txt',
                value: null,
            },
            placeholder: `Enter text to remember`,
        }
    },
    methods: {
        setNoteType(type) {
            if (type === 'txt') {
                this.placeholder = 'Enter text to remember'
            } else if (type === 'img') {
                this.placeholder = 'Enter img url to remember'
            } else if (type === 'video') {
                this.placeholder = 'Enter video url to remember'
            } else if (type === 'todos') {
                this.placeholder = 'Enter comma separated list to remember'
            }
            this.note.type = type
            this.$refs.name.focus()
        },
        createNote() {
            var type = this.note.type
            var value = this.note.value

            noteService.createNote(type, value)
                .then(response => {
                    this.$emit('newNote', response)
                })
            this.note.value = ''
        }

    },
    computed: {
    },
}


