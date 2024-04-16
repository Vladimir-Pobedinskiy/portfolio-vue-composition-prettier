<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { VueFinalModal } from 'vue-final-modal'
import { scrollController } from '@/composables/scrollController'
export default {
	name: 'UIModal',
	components: { VueFinalModal },
	props: {
		modalSettings: {
			type: Object,
			required: true
		}
	},
	setup() {
		const store = useStore()
		const isOpen = computed(() => store.getters.isOpen)

		const customOverlayTransition = {
			enterActiveClass: 'custom-overlay-fade-enter-active',
			leaveActiveClass: 'custom-overlay-fade-leave-active',
			enterFromClass: 'custom-overlay-fade-enter-from',
			leaveToClass: 'custom-overlay-fade-leave-to'
		}
		const customContentTransition = {
			enterActiveClass: 'custom-content-slide-enter-active',
			leaveActiveClass: 'custom-content-slide-leave-active',
			enterFromClass: 'custom-content-slide-enter-from',
			leaveToClass: 'custom-content-slide-leave-to'
		}

		const handleBeforeOpen = () => {
			if (!document.body.classList.contains('lock-js') || isOpen.value !== 'navigation') {
				scrollController.disableScroll()
			}
		}

		const handleClosed = () => {
			if (document.body.classList.contains('lock-js') && isOpen.value !== 'navigation') {
				scrollController.enableScroll()
			}
		}

		return {
			customOverlayTransition,
			customContentTransition,
			handleBeforeOpen,
			handleClosed
		}
	}
}
</script>

<template>
	<VueFinalModal
		class="modal-container"
		content-class="modal-content"
		overlay-class="modal-overlay"
		:overlay-transition="customOverlayTransition"
		:content-transition="customContentTransition"
		:lock-scroll="false"
		:modal-id="modalSettings.name"
		:click-to-close="modalSettings.clickToClose"
		:esc-to-close="modalSettings.escToClose"
		:hide-overlay="modalSettings.hideOverlay"
		@before-open="handleBeforeOpen"
		@closed="handleClosed"
	>
		<div class="modal-inner">
			<button class="modal-close-btn" aria-label="Закрыть модальное окно" @click="$vfm.closeAll">
				<UIIcon icon-name="mdi-close" class-name="icon-close" width="32px" height="32px" />
			</button>
			<div v-if="$slots.header" class="modal-header">
				<slot name="header" />
			</div>
			<div v-if="$slots.body" class="modal-body">
				<slot name="body" />
			</div>
		</div>
	</VueFinalModal>
</template>

<style lang="scss">
.vfm.modal-container {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-overlay.vfm__overlay {
	background-color: rgba(0, 0, 0, 80%);
}

.modal-content {
	position: relative;
	padding: 40px 16px 32px;
	width: 100%;
	max-width: 530px;
	max-height: 70%;
	overflow-y: auto;
	background-color: $color-white;
	border-radius: 16px;
}

.modal-close-btn {
	position: absolute;
	top: 8px;
	right: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	margin: 8px 8px 0 0;
	cursor: pointer;
}

// content
.custom-content-slide-enter-active {
	transition:
		opacity 0.5s ease,
		transform 0.6s ease;
}

.custom-content-slide-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.custom-content-slide-enter-from,
.custom-content-slide-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}

// overlay
.custom-overlay-fade-enter-active {
	transition:
		opacity 0.5s ease,
		transform 0.5s ease;
}

.custom-overlay-fade-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.custom-overlay-fade-enter-from,
.custom-overlay-fade-leave-to {
	opacity: 0;
}
</style>
