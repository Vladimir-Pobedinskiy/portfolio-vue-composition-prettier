export const auth = {
	state: {
		user: null
	},
	mutations: {
		SET_USER(state, user) {
			state.user = user
		},
		CLEAR_USER(state) {
			state.user = null
		}
	},
	actions: {
		setUser({ commit }, user) {
			commit('SET_USER', user)
		},
		clearUser({ commit }) {
			commit('CLEAR_USER')
		}
	},
	getters: {
		user(state) {
			return state.user
		}
	}
}
