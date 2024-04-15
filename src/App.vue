<template>
	<AppHeader />

	<main class="main">
		<router-view v-slot="{ Component }">
			<transition name="page" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</main>

	<AppFooter />
	<ModalError />
</template>

<script>
import AppHeader from '@/components/App/AppHeader'
import AppFooter from '@/components/App/AppFooter'
import ModalError from '@/components/Modals/ModalError'

export default {
	name: 'App',
	components: { AppHeader, AppFooter, ModalError }
}
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
	transition:
		opacity 0.3s ease-in-out,
		visibility 0.3s ease-in-out;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	visibility: hidden;
}
</style>
