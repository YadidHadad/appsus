import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import emailApp from './views/email-app.cmp.js'
import emailDetails from './views/email-details.cmp.js'
// import emailCompose from './views/email-compose.cmp.js'
import noteApp from './views/note-app.cmp.js'
import noteDetails from './views/note-details.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		{
			path: '/email',
			component: emailApp,
		},
		{
			path: '/email/:id',
			component: emailDetails,
		},
		// {
		// 	path: '/email/:id',
		// 	component: emailCompose,
		// },
		{
			path: '/note',
			component: noteApp,
		},
		{
			path: '/note:id',
			component: noteDetails,
		},

	],
}

export const router = createRouter(routerOptions)
