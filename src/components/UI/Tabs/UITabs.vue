<script>
import { ref, provide, toRefs, readonly } from 'vue'
export default {
	name: 'UITabs',
	props: {
		tabsNav: {
			type: Array,
			required: true
		}
	},
	setup(props) {
		const { tabsNav } = toRefs(props)
		const tabBtnName = ref(null)
		const initFirstTab = ref(null)

		const getFirstTabBtn = () => {
			tabsNav.value.forEach((tabBtn, index) => {
				if (index === 0) {
					tabBtn.selected = true
					initFirstTab.value = tabBtn.name
				} else {
					tabBtn.selected = false
				}
			})
		}
		if (tabsNav.value) getFirstTabBtn()

		const onTabBtn = tabBtn => {
			tabsNav.value.forEach(tabBtn => {
				tabBtn.selected = false
			})
			tabBtn.selected = true
			tabBtnName.value = tabBtn.name
		}

		provide('tabBtnName', tabBtnName)
		provide('initFirstTab', readonly(initFirstTab))

		return {
			tabBtnName,
			initFirstTab,
			onTabBtn
		}
	}
}
</script>

<template>
	<div class="tabs">
		<ul class="tabs-nav">
			<li v-for="(tabBtn, i) in tabsNav" :key="i" class="tabs-nav__item" @click="onTabBtn(tabBtn)">
				<button
					class="tabs-nav__btn btn-secondary btn-secondary-small"
					:class="{ active: tabBtn.selected }"
					type="button"
				>
					{{ tabBtn.title }}
				</button>
			</li>
		</ul>
		<slot />
	</div>
</template>

<style lang="scss">
.tabs-nav {
	margin-bottom: 24px;
	display: flex;
	align-items: center;

	@media (min-width: $desktop) {
		margin-bottom: 32px;
	}

	&__item {
		margin-right: 12px;
		width: 100%;
		max-width: 100px;

		&:last-child {
			margin-right: 0;
		}
	}

	&__btn.btn-secondary.btn-secondary-small {
		width: 100%;
	}
}
</style>
