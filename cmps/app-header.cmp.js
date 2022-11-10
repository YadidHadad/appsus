import appNavbar from "./app-navbar.cmp.js"


export default {
    template: `
            <div class="logo flex row align-center justify-center">
                <img v-if="appOpen === '/email' " src="/assets/img/header/Gmail_icon_(2020).svg.png" alt="" />
                <img v-if="appOpen === '/note'" src="/assets/img/header/Google_Keep_icon_(2020).svg.png" alt="" />
                <img v-if="appOpen === '/'" src="/assets/img/header/google-home.svg" alt="" />
                <img v-if="appOpen === '/books'" src="/assets/img/header/unnamed.png" alt="" />
                <h1>AppSus</h1>
            </div>
            <div @click="isNavShown = !isNavShown"><h1 class="fa navbar-icon"></h1></div>

            <app-navbar v-if="isNavShown === true"></app-navbar>
     `,
    data() {
        return {
            isNavShown: false,
        }
    },

    created() {

    },
    computed: {
        appOpen() {
            const route = this.$route.path
            // if (route !== '/note') return '/email'
            return this.$route.path
        },
    },
    watch: {
        appOpen() {
            console.log('Book Id changed')
            console.log(this.appOpen)
            if (this.$route.params === undefined) return
            // this.loadBook()
        }
    },
    components: {
        appNavbar,
    }
}
