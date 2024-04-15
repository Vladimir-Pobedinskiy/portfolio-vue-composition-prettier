<template>
	<div class="heroes-view offset-page-br">
		<template v-if="isLoading">
			<AppLoading :is-loading="isLoading" />
		</template>
		<template v-else>
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="breadcrumbs" />
				<h1 class="heroes-view__title title h1">{{ description.title }}</h1>

				<ul class="description-list">
					<li class="description-item p1" v-for="(item, i) in description.descriptionList" :key="i">{{ item }}</li>
				</ul>

				<HeroSlider :hero-list="heroList" />
			</div>
		</template>
	</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { useVfm } from 'vue-final-modal'
import AppLoading from '@/components/App/AppLoading'
import HeroSlider from '@/components/Hero/HeroSlider'

export default {
	components: { AppLoading, HeroSlider },
	name: 'HeroesView',
	setup() {
		const store = useStore()
		const breadcrumbs = ref([])
		const description = ref({})
		const heroList = ref([])
		const vfm = useVfm()
		const isLoading = computed(() => store.getters.isLoading)
		const startLoading = () => store.dispatch('startLoading')
		const endLoading = () => store.dispatch('endLoading')

		const getData = async () => {
			try {
				startLoading()
				const response = await axios.get('/api/heroes/')
				breadcrumbs.value = response.data.breadcrumbs
				description.value = response.data.description
				heroList.value = response.data.heroList
			} catch (error) {
				vfm.open('ModalError')
				console.error('Error fetching heroes:', error)
			} finally {
				endLoading()
			}
		}
		getData()

		return {
			breadcrumbs,
			description,
			heroList,
			isLoading
		}
	}
}
</script>
