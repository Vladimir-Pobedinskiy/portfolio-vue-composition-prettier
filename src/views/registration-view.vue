<script>
import AuthSignUpPhysical from '@/components/Auth/SignUpPhysical'
export default {
	name: 'RegistrationView',
	components: { AuthSignUpPhysical }
}
</script>

<template>
	<section class="registration-page offset-page">
		<div class="container-auth">
			<h1 class="visually-hidden">Вход в профиль</h1>
			<div class="registration-wrapper">
				<h2 class="registration-page__title title h2">Регистрация</h2>
				<AuthSignUpPhysical />
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.registration-page {
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
