import { noteService } from "../services/note.service.js"

import labelPicker from "../../../cmps/label-picker.cmp.js"

export default {
    name: 'note edit',

    props: ['note'],
    emits: ['removeNote'],


    template: `
        <section class="note-edit">
            <div class="fa trash-icon" @click.stop="removeNote"></div>
            <div class="fa pallet-icon show-pallet" >
                <section class="color-pallet flex row">
                    <div class="color-one color-pick" @click.stop="changeBGC(note,'#ff9aa2')"></div>
                    <div class="color-two color-pick" @click.stop="changeBGC(note,'#ffb7b2')"></div>
                    <div class="color-three color-pick" @click.stop="changeBGC(note,'#ffdac1')"></div>
                    <div class="color-four color-pick" @click.stop="changeBGC(note,'#fff895')"></div>
                    <div class="color-five color-pick" @click.stop="changeBGC(note,'#e2f0cb')"></div>
                    <div class="color-six color-pick" @click.stop="changeBGC(note,'#b5ead7')"></div>
                    <div class="color-seven color-pick" @click.stop="changeBGC(note,'#89daff')"></div>
                </section>
            </div>
            <div class="fa draft-icon" @click.stop="editNote"></div>
            <div class="fa label-icon show-label-picker">
                <div class="label-picker-container">
                    <label-picker  @editLabels="editLabels" :labels="note.info.label"/> 
                </div>
            </div>
            <div class="fa pin-icon" @click.stop="togglePin"></div>
        </section>
        `,

    components: {
        labelPicker
    },

    created() {
        // console.log(`this.note:`, [...this.note.info.label])
    },

    data() {
        return {
            chosenLabels: [],
            // chosenLabels: [...this.note.info.label],


        }
    },

    methods: {
        removeNote() {
            var note = { ...this.note }
            console.log('remove note')
            console.log(note)
            noteService.remove(note.id)
                .then(() => {
                    this.$emit('removeNote', this.note.id)

                })
        },
        editNote(note) {
            console.log('edit note')
        },

        changeBGC(note, color) {
            console.log('change BGC', color)
            this.note.info.style.backgroundColor = color
            var note = { ...this.note }
            console.log(note)
            noteService.save(note)
                .then(() => { })
        },

        editLabels(labels) {
            console.log('note-edit')
            console.log('current assigned labels', [...this.note.info.label])
            console.log(labels)
            this.chosenLabels = labels
            this.note.info.label = labels
            console.log('new assigned labels', [...this.note.info.label])
            var note = { ...this.note }
            // console.log({...note})
            noteService.save(note)
                .then(() => { })
        },

        togglePin(note) {
            console.log('toggle pin')
            this.note.isPinned = !this.note.isPinned
            var note = { ...this.note }
            noteService.save(note)
                .then(() => { })
        },

    },

    computed: {},
}
