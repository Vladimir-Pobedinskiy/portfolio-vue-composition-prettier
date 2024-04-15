<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import AppLoading from '@/components/App/AppLoading'
export default {
	name: 'HeroView',
	components: { AppLoading },
	setup() {
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const breadcrumbs = ref([])
		const hero = ref({})
		const isLoading = computed(() => store.getters.isLoading)
		const startLoading = () => store.dispatch('startLoading')
		const endLoading = () => store.dispatch('endLoading')

		const getHero = async () => {
			try {
				startLoading()
				const currentHeroRouteName = route.params.heroView
				const response = await axios.get(`/api/${currentHeroRouteName}/`)
				breadcrumbs.value = response.data.breadcrumbs
				hero.value = response.data.description
			} catch (error) {
				router.push({ name: 'not-found-view' })
				console.error('Error fetching hero:', error)
			} finally {
				endLoading()
			}
		}
		getHero()

		return {
			breadcrumbs,
			hero,
			isLoading
		}
	}
}
</script>

<template>
	<div v-if="hero" class="hero-view offset-page-br">
		<template v-if="isLoading">
			<AppLoading :is-loading="isLoading" />
		</template>
		<template v-else>
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="breadcrumbs" />
				<div class="hero-view__inner">
					<div class="hero-view__img-wrapper">
						<img :src="hero.imgUrl" :alt="hero.title" />
					</div>
					<div class="hero-view__info">
						<h1 class="hero-view__title h1">{{ hero.title }}</h1>
						<p class="hero-view__descr s4">{{ hero.descr }}</p>
						<ul class="hero-view__statistic-list">
							<li v-for="(item, i) in hero.info" :key="i" class="hero-view__statistic-item">
								<span class="hero-view__statistic-value h3">{{ item.value }}</span>
								<span class="hero-view__statistic-name p5">{{ item.title }}</span>
							</li>
						</ul>
						<div>
							<router-link class="hero-view__back-link" :to="{ name: 'heroes-view' }">Back to heroes</router-link>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss">
.hero-view {
	height: 100%;

	&__inner {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	&__img-wrapper {
		margin-bottom: 24px;
		width: 100%;
		max-width: 450px;
	}

	&__info {
		width: 100%;
		max-width: 900px;
	}

	&__title {
		margin-bottom: 20px;
	}

	&__statistic-list {
		margin: 20px 0 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $color-white;
		background-color: $color-orange;
		font-weight: 700;
		border-radius: 12px;
	}

	&__statistic-item {
		flex: 1 1 33.3%;
		border-right: 1px solid rgba(255, 255, 255, 20%);
		padding: 20px 15px;

		&:last-child {
			border-right: none;
		}
	}

	&__statistic-value {
		display: block;
		margin-bottom: 10px;
	}

	&__statistic-name {
		text-transform: uppercase;
	}

	&__back-link {
		display: block;
		margin: 0 auto;
		padding: 8px 16px;
		width: 100%;
		max-width: 350px;
		border: 1px solid $color-orange;
		border-radius: 12px;
		background-color: $color-orange;
		color: $color-white;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;

		@media (min-width: $desktop) {
			&:hover {
				border-color: $color-orange-hover;
				background-color: $color-orange-hover;
				transition:
					background-color 0.3s ease,
					border-color 0.3s ease;
			}
		}
	}
}
</style>
