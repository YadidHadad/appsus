export default {
    name: '',
    props: [],
    template: `
        <div class="navbar">
            <nav class="flex row gap align-center justify-center">
                <router-link to="/">
                    <img src="/../assets/img/header/home.svg" alt="" />
                </router-link>
                <router-link to="/books">
                    <img src="/../assets/img/header/scholar.png" alt="" />
                </router-link>
                <router-link to="/email">
                    <img src="/../assets/img/header/gmail.png" alt="" />
                </router-link>
                <router-link to="/note">
                    <img src="/../assets/img/header/keep.png" alt="" />
                </router-link>
            </nav>
        </div>
        `,
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
}
