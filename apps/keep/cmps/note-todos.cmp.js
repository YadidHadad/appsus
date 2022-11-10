import { utilService } from '../../../services/util.service.js'

export default {
    name: '',
    props: ['info'],
    template: `
        <section class='note-todos' :style="style">

            <h5>{{info.title}}</h5>
            <ul>
                <li v-for="todo in info.todos" >
                    <span :class="{greyed: todo.doneAt}">{{todo.txt}}</span>
                </li>
            </ul>
        </section>
        `,
    components: {},
    created() {
    },
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
