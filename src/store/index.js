import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { navLinks } from './navLinks'
import { menu } from './menu'
import { tasks } from './tasks'
import { auth } from './auth'
import { cart } from './cart'

export const store = createStore({
	state: {
		isLoading: false
	},
	mutations: {
		START_LOADING(state) {
			state.isLoading = true
		},
		END_LOADING(state) {
			state.isLoading = false
		}
	},
	actions: {
		startLoading({ commit }) {
			commit('START_LOADING')
		},
		endLoading({ commit }) {
			commit('END_LOADING')
		}
	},
	getters: {
		isLoading(state) {
			return state.isLoading
		}
	},
	modules: {
		navLinks,
		menu,
		tasks,
		auth,
		cart
	},
	plugins: [
		createPersistedState({
			// модули для сохранения в localStorage
			paths: ['tasks', 'cart']
		})
	]
})
