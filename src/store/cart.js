export const cart = {
	state: {
		items: []
	},
	mutations: {
		ADD_ITEM(state, payload) {
			const found = state.items.find(item => item.id === payload.id)

			if (found) {
				found.cartQuantity++
			} else if ('cartQuantity' in payload) {
				state.items.push(payload)
			} else {
				state.items.push({ ...payload, cartQuantity: 1 })
			}
		},
		REMOVE_ITEM(state, payload) {
			const index = state.items.indexOf(payload)

			if (index > -1) {
				state.items.splice(index, 1)
			}
		},
		CLEAR(state) {
			state.items.length = 0
		},
		INCREMENT_ITEM(state, payload) {
			const found = state.items.find(product => product.id === payload.id)
			if (found) {
				found.cartQuantity++
			}
		},
		DECREMENT_ITEM(state, payload) {
			const found = state.items.find(product => product.id === payload.id)
			if (found) {
				found.cartQuantity--
			}
		},
		UPDATE_ITEMS(state, payload) {
			state.items = payload
		},
		UPDATE_ITEM_QUANTITY(state, [product, quantity]) {
			const found = state.items.find(item => item.id === product.id)

			if (found) {
				found.cartQuantity = +quantity
			} else if ('cartQuantity' in product) {
				state.items.push(product)
			} else {
				state.items.push({ ...product, cartQuantity: 1 })
			}
		}
	},
	actions: {
		addItem({ commit }, item) {
			commit('ADD_ITEM', item)
		},
		removeItem({ commit }, item) {
			commit('REMOVE_ITEM', item)
		},
		clear({ commit }) {
			commit('CLEAR')
		},
		incrementItem({ commit }, item) {
			commit('INCREMENT_ITEM', item)
		},
		decrementItem({ commit }, item) {
			commit('DECREMENT_ITEM', item)
		},
		updateItems({ commit }, items) {
			commit('UPDATE_ITEMS', items)
		},
		updateItemQuantity({ commit }, target) {
			commit('UPDATE_ITEM_QUANTITY', target)
		}
	},
	getters: {
		items(state) {
			return state.items
		},
		count(state) {
			return state.items.length
		},
		total(state) {
			return Number(state.items.reduce((sum, item) => (sum += item.cartQuantity * item.oldPrice), 0).toFixed(2))
		}
	}
}
