<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { screens } from '@/utils/utils'
import { isDesktopHandler } from '@/composables/isDesktopHandler'
import { hammerSwipe } from '@/composables/hammerSwipe'
import UIAccordion from '@/components/UI/Accordion/UIAccordion'
import UIAccordionItem from '@/components/UI/Accordion/UIAccordionItem'
import CatalogRange from '@/components/Catalog/Range'
import CatalogFiltersGroup from '@/components/Catalog/FiltersGroup'
import CatalogFiltersButtons from '@/components/Catalog/FiltersButtons'
export default {
	name: 'CatalogFilters',
	components: { UIAccordion, UIAccordionItem, CatalogRange, CatalogFiltersGroup, CatalogFiltersButtons },
	props: {
		range: {
			type: Array,
			required: true
		},
		filters: {
			type: Array,
			required: true
		},
		productsAmount: {
			type: Number,
			default: -1
		}
	},
	setup() {
		const store = useStore()
		const { isDesktop } = isDesktopHandler()
		const filtersContent = ref(null)
		const isOpen = computed(() => store.getters.isOpen)
		const toggleState = value => {
			store.dispatch('toggleState', value)
		}

		hammerSwipe(filtersContent, isOpen, screens.desktop)

		return {
			isOpen,
			filtersContent,
			isDesktop,
			toggleState
		}
	}
}
</script>

<template>
	<div class="catalog-filters">
		<div v-if="!isDesktop" class="catalog-filters__btn-wrapper">
			<button class="catalog-filters__btn btn btn-small" type="button" @click="toggleState('filters')">
				Открыть фильтры
			</button>
		</div>

		<div ref="filtersContent" class="catalog-filters__content" :class="{ active: isOpen === 'filters' && !isDesktop }">
			<div class="catalog-filters__content-inner">
				<div v-if="!isDesktop" class="catalog-filters__content-top">
					<p class="catalog-filters__content-title h4">Все фильтры</p>
					<button class="catalog-filters__close-btn" aria-label="Закрыть фильтры" @click="toggleState('filters')">
						<UIIcon icon-name="mdi-close" class-name="icon-close" width="32px" height="32px" />
					</button>
				</div>
				<div class="catalog-filters__filters-inner">
					<UIAccordion key="filtersAccordion" :is-only-one-open="false" init-item-open="all" :is-caret-icon="true">
						<UIAccordionItem>
							<template #header>
								<div class="filters-title h4">Цена</div>
							</template>
							<template #content>
								<CatalogRange :range="range" />
							</template>
						</UIAccordionItem>

						<CatalogFiltersGroup v-for="(filtersGroup, i) in filters" :key="i" :filters="filtersGroup" />
					</UIAccordion>

					<CatalogFiltersButtons :products-amount="productsAmount" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.catalog-filters {
	@media (min-width: $desktop) {
		margin-top: 58px;
	}

	&__content {
		background-color: $color-white;

		@media (max-width: $desktop-for-maxWidth) {
			position: fixed;
			left: 0;
			top: 0;
			padding: 98px 16px 80px;
			width: 100%;
			height: 100%;
			transform: translateX(-100%);
			opacity: 0;
			visibility: hidden;
			overflow: auto;
			transition:
				transform 0.2s ease,
				opacity 0.1s ease,
				visibility 0.1s ease;
		}

		&.active {
			transform: translateX(0);
			opacity: 1;
			visibility: visible;
			z-index: 997;
			pointer-events: all;
			transition:
				transform 0.4s ease,
				opacity 0.3s ease,
				visibility 0.3s ease;
		}
	}

	&__content-top {
		margin-bottom: 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__content-title {
		text-transform: uppercase;
	}

	&__close-btn {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 998;
	}

	.accordion-item {
		padding-top: 16px;
		padding-bottom: 0;
	}

	.accordion-item__header {
		margin-bottom: 16px;
	}
}
</style>
