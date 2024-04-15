import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/home-view'
import CatalogView from '@/views/catalog-view'
import HeroesView from '@/views/heroes-view'
import HeroView from '@/views/hero-view'
import TasksView from '@/views/tasks-view'
import UIView from '@/views/ui-view'
import LoginView from '@/views/login-view'
import RegistrationView from '@/views/registration-view'
import PersonalAccountView from '@/views/personal-account-view'
import NotFoundView from '@/views/not-found-view'

const routes = [
	{
		path: '/',
		name: 'home-view',
		component: HomeView
	},
	{
		path: '/catalog',
		name: 'catalog-view',
		component: CatalogView
	},
	{
		path: '/heroes',
		name: 'heroes-view',
		component: HeroesView
	},
	{
		path: '/heroes/:heroView',
		name: 'hero-view',
		component: HeroView
	},
	{
		path: '/tasks',
		name: 'tasks-view',
		component: TasksView
	},
	{
		path: '/ui',
		name: 'ui-view',
		component: UIView
	},
	{
		path: '/login',
		name: 'login-view',
		component: LoginView
	},
	{
		path: '/registration',
		name: 'registration-view',
		component: RegistrationView
	},
	{
		path: '/personal-account',
		name: 'personal-account-view',
		component: PersonalAccountView
	},
	{
		path: '/:catchAll(.*)*',
		name: 'not-found-view',
		component: NotFoundView
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
	let path = to.path
	// Удаляем лишние слэши, кроме первого
	path = path.replace(/\/{2,}/g, '/')

	if (to.path !== '/catalog' && !path.endsWith('/')) {
		if (window.scrollY !== 0) {
			window.scrollTo(0, 0)
		}
		next({ path: path + '/', query: to.query, hash: to.hash })
	} else if (!path.endsWith('/')) {
		next({ path: path + '/', query: to.query, hash: to.hash })
	} else {
		next()
	}
})

export { router }
