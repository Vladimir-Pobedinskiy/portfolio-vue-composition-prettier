import { ref, onMounted, onUnmounted } from 'vue'
import { screens } from '@/utils/utils'

export function isDesktopHandler() {
	const isDesktop = ref(null)

	const updateIsDesktop = () => {
		window.innerWidth >= parseInt(screens.desktop) ? (isDesktop.value = true) : (isDesktop.value = false)
	}

	onMounted(() => {
		updateIsDesktop()
		window.addEventListener('resize', updateIsDesktop)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', updateIsDesktop)
	})

	return {
		isDesktop
	}
}
