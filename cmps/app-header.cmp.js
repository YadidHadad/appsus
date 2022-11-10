import appNavbar from "./app-navbar.cmp.js"


export default {
    template: `
            <div class="logo flex row align-center justify-center" >
                <img v-if="appOpen === '/email' " src="../assets/img/header/gmail.png" alt="" />
                <img v-if="appOpen === '/note'" src="../assets/img/header/keep.png" alt="" />
                <img v-if="appOpen === '/'" src="../assets/img/header/home.svg" alt="" />
                <img v-if="appOpen === '/books'" src="../assets/img/header/scholar.png" alt="" />
                <h1><span>AppSus</span><span class="app-type">{{activeApp}}</span></h1>
            </div>
            <div @click="isNavShown = !isNavShown"><h1 class="fa navbar-icon"></h1></div>

            <app-navbar v-if="isNavShown === true" @setApp="setActiveApp" @click="isNavShown = !isNavShown"/>
     `,
    data() {
        return {
            isNavShown: false,
            activeApp: 'Home',
        }
    },

    created() {

    },

    methods: {
        setActiveApp(app) {
            console.log(app)
            this.activeApp = app
            console.log({ ...this.activeApp })

        }

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
