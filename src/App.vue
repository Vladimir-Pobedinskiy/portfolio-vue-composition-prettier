<template>
	<AppHeader />

	<main class="main">
		<router-view />
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
