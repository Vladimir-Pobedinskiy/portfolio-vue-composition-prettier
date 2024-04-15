<template>
	<VueFinalModal
		class="modal-container"
		content-class="modal-content"
		overlay-class="modal-overlay"
		content-transition="vfm-fade"
		overlay-transition="vfm-fade"
		:modalId="modalSettings.name"
		:lock-scroll="modalSettings.lockScroll"
		:click-to-close="modalSettings.clickToClose"
		:esc-to-close="modalSettings.escToClose"
		:hide-overlay="modalSettings.hideOverlay"
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
<script>
import { VueFinalModal } from 'vue-final-modal'
export default {
	name: 'UIModal',
	components: { VueFinalModal },
	props: {
		modalSettings: {
			type: Object,
			required: true
		}
	}
}
</script>

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
</style>
