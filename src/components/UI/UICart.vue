<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
	name: 'UICart',
	setup() {
		const store = useStore()
		const count = computed(() => store.getters.count)

		return {
			count
		}
	}
}
</script>

<template>
	<router-link class="ui-cart" to="/cart" aria-label="Корзина">
		<div class="count-container">
			<transition name="bounce" mode="out-in">
				<div v-if="count > 0" class="count marker">
					<span>{{ count }}</span>
				</div>
			</transition>
		</div>
		<UIIcon icon-name="mdi-cart" class-name="ui-cart__icon" width="26px" height="26px" />
	</router-link>
</template>

<style lang="scss">
.ui-cart {
	position: relative;

	&__icon {
		width: 26px;
		height: 26px;
		transition: color 0.3s ease;
	}

	&:hover {
		.ui-cart__icon {
			color: $color-white;
			transition: color 0.3s ease;
		}

		color: $color-vue;
	}

	.count-container {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(calc(100% - 3px), calc(-100% + 5px));

		@media (min-width: $desktop) {
			transform: translate(calc(100% - 3px), calc(-100% + 5px));
		}
	}

	.count {
		padding: 2px;
		height: 20px;
		min-width: 20px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $color-vue;
		background-color: $color-white;
	}
}
</style>
