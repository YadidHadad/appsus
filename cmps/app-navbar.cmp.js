export default {
    name: '',
    props: [],
    template: `
        <div class="navbar">
            <nav class="flex row gap align-center justify-center">
                <router-link to="/">
                    <img src="../assets/img/header/google-home.svg" alt="" />
                </router-link>
                <router-link to="/books">
                    <img src="../assets/img/header/unnamed.png" alt="" />
                </router-link>
                <router-link to="/email">
                    <img src="../assets/img/header/Gmail_icon_(2020).svg.png" alt="" />
                </router-link>
                <router-link to="/note">
                    <img src="../assets/img/header/Google_Keep_icon_(2020).svg.png" alt="" />
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
