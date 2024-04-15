<template>
	<div v-show="isActive" :class="[className, { active: isActive }]">
		<slot />
	</div>
</template>

<script>
import { ref, toRefs, inject, watch } from 'vue'
export default {
	name: 'UITabPanel',
	props: {
		panelName: {
			type: String,
			required: true
		},
		className: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const { panelName } = toRefs(props)
		const tabBtnName = ref(inject('tabBtnName'))
		const initFirstTab = ref(inject('initFirstTab'))
		const isActive = ref(false)

		const getFirstPanel = () => {
			if (initFirstTab.value === panelName.value) {
				isActive.value = true
			}
		}
		getFirstPanel()

		watch(tabBtnName, value => {
			if (value === panelName.value) {
				isActive.value = true
			} else {
				isActive.value = false
			}
		})

		return {
			tabBtnName,
			isActive
		}
	}
}
</script>
