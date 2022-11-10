import { utilService } from '../../../services/util.service.js'

export default {
    name: '',
    props: ['info'],
    template: `
        <section class='note-video' :style="style">

            <h5>{{info.title}}</h5>
            <!-- <iframe width="200" height="315" :src="info.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
            <div class="video-container">
                <iframe :src="info.url" frameborder="0" allowfullscreen class="video"></iframe>
            </div>  


        </section>
        `,
    components: {},
    created() {
    },
    data() {
        return {

        }
    },
    methods: {},
    computed: {
        style() {
            const deg = utilService.getRandomInt(-10, 10)
            return { transform: 'rotate(' + deg + 'deg)', backgroundColor: this.info.style.backgroundColor }
        },
    },
}
