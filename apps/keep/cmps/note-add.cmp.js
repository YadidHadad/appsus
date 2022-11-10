export default {
    name: 'note-add',
    props: [],
    template: `
        <section class="note-add flex row ">
            <input type="text" placeholder="search note by title" />
            <div class="flex row align-center">
                <span class="fa text-icon add-btn"></span>
                <span class="fa img-icon add-btn"></span>
                <span class="fa video-icon add-btn"></span>
                <span class="fa list-icon add-btn"></span>
        
            </div>
        </section>
        `,
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
}


