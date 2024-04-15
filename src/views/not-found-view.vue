<script>
export default {
	name: 'NotFoundView'
}
</script>

<template>
	<div class="not-found-view">
		<div class="not-found-view__inner">
			<div class="not-found-view__logo-wrapper">
				<span class="not-found-view__logo">404</span>
			</div>
			<h2 class="not-found-view__title h3">Запрашиваемая страница не найдена</h2>
			<p class="not-found-view__text p2">
				Запрашиваемая вами страница не существует. Возможно она была удалена или был введён неверный адрес в адресной
				строке.
			</p>
			<router-link class="not-found-view__btn btn" :to="{ name: 'home-view' }">На главную</router-link>
		</div>
	</div>
</template>

<style lang="scss">
.not-found-view {
	height: 100%;
	padding: 56px 16px;

	@media (min-width: $desktop) {
		padding: 120px 16px;
	}

	&__inner {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	&__logo-wrapper {
		margin-bottom: 16px;
		padding: 0 16px;
		color: $color-vue;

		@media (min-width: $tablet) {
			margin-bottom: 32px;
		}
	}

	&__logo {
		font-family: $font;
		font-size: 150px;
		line-height: 1;
		font-weight: 500;
		color: $color-vue;

		@media (min-width: $mobile) {
			font-size: 200px;
		}

		@media (min-width: $tablet) {
			font-size: 280px;
		}
	}

	&__title {
		margin-bottom: 16px;
	}

	&__text {
		margin-bottom: 24px;
		width: 100%;
		max-width: 675px;

		@media (min-width: $desktop) {
			margin-bottom: 32px;
		}
	}

	&__btn {
		width: 100%;
		max-width: 300px;
	}
}
</style>
