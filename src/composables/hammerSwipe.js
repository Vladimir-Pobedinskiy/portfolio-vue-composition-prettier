/*
  Использование mc как сокращения для экземпляра Hammer Manager
  является общепринятым в документации и примерах кода, связанных с Hammer.js
*/
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import Hammer from 'hammerjs'

export function hammerSwipe(itemForSwipe, isOpenValue, breakpoint) {
	const mc = ref(null)
	const store = useStore()
	const toggleState = value => {
		store.dispatch('toggleState', value)
	}

	const setupHammer = () => {
		const hammer = new Hammer.Manager(itemForSwipe.value)
		hammer.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL }))
		hammer.on('swipeleft', () => {
			toggleState(isOpenValue.value)
		})
		mc.value = hammer
	}

	const handleWindowResize = () => {
		if (!mc.value) return
		if (window.innerWidth >= parseInt(breakpoint)) {
			mc.value.set({ enable: false })
		} else {
			mc.value.set({ enable: true })
		}
	}

	onMounted(() => {
		setupHammer()
		handleWindowResize()
		window.addEventListener('resize', handleWindowResize)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', handleWindowResize)
	})

	return {
		mc
	}
}
