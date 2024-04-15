<template>
	<header class="header">
		<div class="container">
			<div class="header__inner">
				<router-link class="header__logo h4" :to="{ name: 'home-view' }">PORTFOLIO</router-link>
				<div ref="navigation" class="header__nav-list-wrapper" :class="{ active: isOpen === 'navigation' }">
					<ul class="nav-list">
						<li v-for="(item, i) in navLinks" :key="i" class="nav-item">
							<router-link class="nav-link p1 hover-from-center" :to="`${item.url}`">{{ item.title }}</router-link>
						</li>
					</ul>
				</div>

				<ul v-if="isDesktop" class="nav-user">
					<li class="nav-user__item">
						<UIUser />
					</li>
					<li class="nav-user__item">
						<UICart />
					</li>
				</ul>

				<button
					class="header__burger-btn burger-btn"
					:class="{ active: isOpen === 'navigation' }"
					type="button"
					@click="toggleState('navigation')"
				>
					<span class="burger-btn__label">
						<span class="visually-hidden">открыть меню</span>
					</span>
				</button>
			</div>
		</div>
	</header>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { screens } from '@/utils/utils'
import { isDesktopHandler } from '@/composables/isDesktopHandler'
import { hammerSwipe } from '@/composables/hammerSwipe'
import UIUser from '@/components/UI/UIUser'
import UICart from '@/components/UI/UICart'
export default {
	name: 'AppHeader',
	components: { UIUser, UICart },
	setup() {
		const store = useStore()
		const route = useRoute()
		const navigation = ref(null)
		const { isDesktop } = isDesktopHandler()
		const navLinks = computed(() => store.getters.navLinks)
		const isOpen = computed(() => store.getters.isOpen)
		const toggleState = value => {
			store.dispatch('toggleState', value)
		}

		watch(route, () => {
			if (isOpen.value === 'navigation') {
				toggleState(isOpen.value)
			}
		})

		hammerSwipe(navigation, isOpen, screens.desktop)

		return {
			navLinks,
			isDesktop,
			isOpen,
			toggleState,
			navigation
		}
	}
}
</script>

<style lang="scss">
.header {
	position: relative;
	padding: 20px 0;
	min-height: 66px;
	background-color: $color-vue;
	z-index: 998;

	@media (min-width: $desktop) {
		padding: 25px 0;
		min-height: 82px;
	}

	&__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__logo {
		position: relative;
		z-index: 999;
	}

	&__nav-list-wrapper {
		@media (max-width: $desktop-for-maxWidth) {
			position: fixed;
			left: 0;
			top: 0;
			height: 100vh;
			width: 100%;
			padding: 94px 16px 150px;
			opacity: 0;
			visibility: hidden;
			overflow-y: auto;
			transform: translateX(-200%);
			background-color: $color-vue;
			z-index: 998;
			transition:
				transform 0.3s ease,
				opacity 0.3s ease,
				visibility 0.3s ease;

			&.active {
				opacity: 1;
				visibility: visible;
				transform: translateX(0);
				transition:
					transform 0.5s ease,
					opacity 0.3s ease,
					visibility 0.3s ease;
			}
		}
	}

	&__burger-btn {
		z-index: 999;

		@media (min-width: $desktop) {
			display: none;
		}
	}

	.nav-item {
		@media (max-width: $desktop-for-maxWidth) {
			text-transform: uppercase;
		}
	}
}

.nav-user {
	@media (min-width: $desktop) {
		display: flex;
		align-items: center;
	}

	&__item {
		display: flex;
		align-items: center;
		justify-content: center;

		@media (min-width: $desktop) {
			margin-right: 24px;

			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>
