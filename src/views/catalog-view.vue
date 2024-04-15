<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { parse, stringify } from 'qs'
import { useRoute, useRouter } from 'vue-router'
import { useVfm } from 'vue-final-modal'
import AppLoading from '@/components/App/AppLoading'
import CatalogFeed from '@/components/Catalog/Feed'
import CatalogFilters from '@/components/Catalog/Filters'
import CatalogSort from '@/components/Catalog/Sort'
import UIPagination from '@/components/UI/UIPagination'

export default {
	name: 'CatalogView',
	components: { AppLoading, CatalogFeed, CatalogFilters, CatalogSort, UIPagination },
	setup() {
		const route = useRoute()
		const router = useRouter()
		const store = useStore()
		const breadcrumbs = ref([])
		const range = ref([])
		const filters = ref([])
		const sort = ref([])
		const products = ref([])
		const pageTotal = ref(null)
		const productTotal = ref(null)
		const isMore = ref(false)
		const vfm = useVfm()
		const isLoadingLocal = ref(false)
		const isLoading = computed(() => store.getters.isLoading)
		const startLoading = () => store.dispatch('startLoading')
		const endLoading = () => store.dispatch('endLoading')

		watch(route, () => {
			getDataCatalog()
			if (!isMore.value) {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			}
		})

		const getDataCatalogProducts = async () => {
			try {
				isLoadingLocal.value = true

				const parsedQuery = parse(route.query, { comma: true })
				const stringifiedParams = stringify({ ...parsedQuery }, { arrayFormat: 'comma', encode: false })

				const response = await axios.get(`/api/catalog-products/?${stringifiedParams}`)
				if (isMore.value) {
					products.value.push(...response.data)
				} else {
					products.value = response.data
				}
			} catch (error) {
				vfm.open('ModalError')
				console.error('Error fetching heroes:', error)
			} finally {
				isLoadingLocal.value = false
				if (isMore.value) {
					isMore.value = false
				}
			}
		}

		const getDataCatalog = async () => {
			try {
				startLoading()
				const response = await axios.get('/api/catalog/')
				breadcrumbs.value = response.data.breadcrumbs
				range.value = response.data.range
				filters.value = response.data.filters
				sort.value = response.data.sort
				pageTotal.value = Number(response.data.pageTotal)
				productTotal.value = Number(response.data.productTotal)
			} catch (error) {
				vfm.open('ModalError')
				console.error('Error catalog-view:', error)
			} finally {
				endLoading()
				await getDataCatalogProducts()
			}
		}
		getDataCatalog()

		const onMore = n => {
			isMore.value = true
			const query = Object.assign({}, route.query, { page: n })
			router.push({ query })
		}

		return {
			breadcrumbs,
			range,
			filters,
			sort,
			products,
			pageTotal,
			productTotal,
			isLoading,
			isLoadingLocal,
			onMore
		}
	}
}
</script>

<template>
	<div class="catalog-page offset-page-br">
		<template v-if="isLoading">
			<AppLoading :is-loading="isLoading" />
		</template>
		<template v-else>
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="breadcrumbs" />
				<h1 class="visually-hidden">Каталог</h1>

				<section class="catalog-page__content">
					<div class="catalog-page__content-top">
						<h2 class="catalog-page__content-title h1">Каталог героев</h2>
					</div>

					<div class="catalog-page__content-inner">
						<div class="catalog-page__left-side">
							<template v-if="filters.length > 0 && range.length > 0">
								<CatalogFilters :range="range" :filters="filters" :products-amount="productTotal" />
							</template>
						</div>

						<div class="catalog-page__right-side">
							<template v-if="isLoadingLocal">
								<AppLoading :is-loading-local="isLoadingLocal" />
							</template>
							<template v-else>
								<div class="catalog-page__sort-wrapper sort-wrapper">
									<CatalogSort :sort="sort" />
								</div>
								<template v-if="products.length > 0">
									<CatalogFeed :products="products" />
									<div v-if="pageTotal" class="pagination-wrapper">
										<UIPagination :page-total="pageTotal" @more="onMore" />
									</div>
								</template>
								<template v-else>
									<h2 class="h3">Товаров не найдено.</h2>
								</template>
							</template>
						</div>
					</div>
				</section>
			</div>
		</template>
	</div>
</template>

<style lang="scss">
.catalog-page {
	&__content {
		@media (min-width: $desktop) {
			margin-top: 40px;
		}
	}

	&__content-top {
		display: flex;
		flex-direction: column;
		margin-bottom: 32px;
	}

	&__content-inner {
		display: grid;
		grid-auto-columns: 100%;
		grid-gap: 24px;

		@media (min-width: $desktop) {
			grid-template-columns: repeat(12, 1fr);
		}
	}

	&__content-title {
		margin-bottom: 12px;
		text-transform: uppercase;

		@media (min-width: $tablet) {
			margin-bottom: 0;
		}
	}

	&__left-side {
		@media (min-width: $desktop) {
			grid-column: 1 / 4;
		}
	}

	&__right-side {
		@media (min-width: $desktop) {
			grid-column: 4 / -1;
		}
	}

	&__sort-wrapper {
		margin-bottom: 32px;
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
	}

	.pagination-wrapper {
		margin-top: 32px;

		@media (min-width: $desktop) {
			margin-top: 48px;
		}
	}
}
</style>
