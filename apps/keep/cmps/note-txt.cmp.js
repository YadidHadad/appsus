import { utilService } from '../../../services/util.service.js'

export default {
    name: '',
    props: ['info'],
    template: `
        <section class='note-txt' :style="style">
            <h5>{{info.title}}</h5>
            <p>{{info.txt}}</p>


        </section>
        `,
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {
        style() {
            const deg = utilService.getRandomInt(-10, 10)
            return { transform: 'rotate(' + deg + 'deg)', backgroundColor: this.info.style.backgroundColor }
        },
    },
}
