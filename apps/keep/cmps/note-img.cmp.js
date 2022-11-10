import { utilService } from '../../../services/util.service.js'

export default {
    name: '',
    props: ['info'],
    template: `
        <section class='note-img' :style="style">
            <div class="image-container "  :style="{ backgroundImage: 'url(' + info.url + ')' }" >
            </div>
        <!-- <img :src="info.url" alt="" /> -->
            <h5>{{info.title}}</h5>
        </section>
        `,
    components: {},
    created() {
    },
    data() {
        return {
        }
    },
    methods: {
        setNoteToRemove() {
            this.$emit('setNoteToRemove', '')

        }
    },
    computed: {
        style() {
            const deg = utilService.getRandomInt(-10, 10)
            return { transform: 'rotate(' + deg + 'deg)', backgroundColor: this.info.style.backgroundColor }
        },
    },
}
