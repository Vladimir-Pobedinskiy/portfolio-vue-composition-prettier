<template>
	<router-link to="/personal-account" class="ui-user" aria-label="В Личный кабинет">
		<UIIcon icon-name="mdi-user" class-name="ui-user__icon" width="26px" height="26px" />
	</router-link>
</template>

<script>
export default {
	name: 'UIUser'
}
</script>

<style lang="scss">
.ui-user {
	transition: color 0.3s ease;

	&__icon {
		width: 26px;
		height: 26px;
		transition: color 0.3s ease;
	}

	&:hover {
		.ui-user__icon {
			color: $color-white;
			transition: color 0.3s ease;
		}
	}
}
</style>
