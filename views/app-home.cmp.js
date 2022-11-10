export default {
    template: `
        <section class="app-container home-page">
            <div class="home-router">
                <h1>Welcome to Appsus</h1>
                <nav class="flex row gap align-center justify-center">
                    <router-link to="/books">
                        <img src="../assets/img/header/scholar.png" alt="" />
                    </router-link>
                    <router-link to="/email">
                        <img src="../assets/img/header/gmail.png" alt="" />
                    </router-link>
                    <router-link to="/note">
                        <img src="../assets/img/header/keep.png" alt="" />
                    </router-link>
                </nav>
            </div>
  
        </section>
    `,
}
