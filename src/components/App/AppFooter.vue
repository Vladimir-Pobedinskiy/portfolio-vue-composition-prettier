<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__inner">
				<div class="footer__top">
					<ul class="nav-list">
						<li v-for="(item, i) in navLinks" :key="i" class="nav-item">
							<router-link class="nav-link p1 hover-from-center" :to="`${item.url}`">{{ item.title }}</router-link>
						</li>
					</ul>
				</div>
				<div class="footer__bottom">
					<p class="footer__title">© {{ currentYear }} Все права защищены.</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
	name: 'AppFooter',
	setup() {
		const store = useStore()
		const navLinks = computed(() => store.getters.navLinks)
		const currentYear = ref(computed(() => new Date().getFullYear()))

		return {
			navLinks,
			currentYear
		}
	}
}
</script>

<style lang="scss">
.footer {
	padding: 20px 0;
	background-color: $color-vue;

	@media (min-width: $desktop) {
		padding: 25px 0;
	}

	&__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__top {
		margin-bottom: 16px;
	}

	&__title {
		font-size: 16px;
	}

	.nav-list {
		text-align: center;

		@media (min-width: $tablet) {
			flex-direction: row;
		}
	}

	.nav-item {
		@media (max-width: $tablet-for-maxWidth) {
			margin-bottom: 16px;
		}

		@media (min-width: $tablet) {
			margin-right: 20px;
			margin-bottom: 0;

			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>
