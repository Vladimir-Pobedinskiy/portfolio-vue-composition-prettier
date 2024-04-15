<template>
	<div class="login-page offset-page">
		<div class="container-auth">
			<h1 class="visually-hidden">Вход в профиль</h1>
			<section class="login-wrapper">
				<h2 class="login-page__title title h2">Вход в профиль</h2>
				<AuthLogin />
			</section>
		</div>
	</div>
</template>

<script>
import AuthLogin from '@/components/Auth/Login'
export default {
	name: 'LoginView',
	components: { AuthLogin }
}
</script>
<style lang="scss">
.login-page {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	&__title {
		text-align: center;
	}
}
</style>
