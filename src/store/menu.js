import { scrollController } from '@/composables/scrollController'

export const menu = {
	state: {
		isOpen: null
	},
	mutations: {
		TOGGLE_STATE(state, payload) {
			if (state.isOpen === payload) {
				scrollController.enableScroll()
				state.isOpen = null
			} else {
				scrollController.disableScroll()
				state.isOpen = payload
			}
		},
		CLOSE_MENU(state) {
			state.isOpen = null
		}
	},
	actions: {
		toggleState({ commit }, payload) {
			commit('TOGGLE_STATE', payload)
		},
		closeMenu({ commit }) {
			commit('CLOSE_MENU')
		}
	},
	getters: {
		isOpen(state) {
			return state.isOpen
		}
	}
}
