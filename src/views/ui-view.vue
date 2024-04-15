<template>
	<div class="ui-view offset-page-br">
		<template v-if="isLoading">
			<AppLoading :is-loading="isLoading" />
		</template>
		<template v-else>
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="breadcrumbs" />
				<h1 class="ui-view__title title h1">{{ description.title }}</h1>
				<ul class="description-list">
					<li class="description-item p1" v-for="(item, i) in description.descriptionList" :key="i">{{ item }}</li>
				</ul>
			</div>

			<section class="ui-view__tabs offset">
				<div class="container">
					<h2 class="ui-view__tabs-title section-title h2">{{ tabs.title }}</h2>
					<UIViewTabs :tabs-nav="tabs.tabsNav" />
				</div>
			</section>

			<section class="ui-view__marquee offset">
				<div class="container">
					<h2 class="ui-view__marquee-title section-title h2">{{ marquee.title }}</h2>
				</div>
				<UIViewMarquee :marquee-images="marquee.marqueeImages" />
			</section>

			<section class="ui-view__accordion offset">
				<div class="container">
					<h2 class="ui-view__accordion-title section-title h2">{{ accordion.title }}</h2>
					<UIAccordionView :accordion-list="accordion.accordionList" />
				</div>
			</section>
		</template>
	</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { useVfm } from 'vue-final-modal'
import AppLoading from '@/components/App/AppLoading'
import UIViewTabs from '@/components/UIView/UIViewTabs'
import UIViewMarquee from '@/components/UIView/UIViewMarquee'
import UIAccordionView from '@/components/UIView/UIViewAccordion'
export default {
	name: 'UIView',
	components: { AppLoading, UIViewTabs, UIViewMarquee, UIAccordionView },
	setup() {
		const store = useStore()
		const vfm = useVfm()
		const breadcrumbs = ref([])
		const description = ref({})
		const tabs = ref({})
		const marquee = ref({})
		const accordion = ref({})
		const isLoading = computed(() => store.getters.isLoading)
		const startLoading = () => store.dispatch('startLoading')
		const endLoading = () => store.dispatch('endLoading')

		const getData = async () => {
			try {
				startLoading()
				const response = await axios.get('/api/ui/')
				breadcrumbs.value = response.data.breadcrumbs
				description.value = response.data.description
				tabs.value = response.data.tabs
				marquee.value = response.data.marquee
				accordion.value = response.data.accordion
			} catch (error) {
				vfm.open('ModalError')
				console.error('Error fetching UIView', error)
			} finally {
				endLoading()
			}
		}
		getData()

		return {
			breadcrumbs,
			description,
			tabs,
			marquee,
			accordion,
			isLoading
		}
	}
}
</script>
