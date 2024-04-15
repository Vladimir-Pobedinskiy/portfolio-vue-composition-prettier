<template>
	<UIAccordionItem>
		<template #header>
			<div class="filters-title h4">{{ filters.title }}</div>
		</template>
		<template #content>
			<CatalogFiltersOption
				v-for="(option, j) in filters.options"
				:key="j"
				class="option-wrapper"
				:option="option"
				:group-name="filters.name"
			/>
		</template>
	</UIAccordionItem>
</template>

<script>
import UIAccordionItem from '@/components/UI/Accordion/UIAccordionItem'
import CatalogFiltersOption from '@/components/Catalog/FiltersOption'
export default {
	name: 'CatalogFiltersGroup',
	components: { UIAccordionItem, CatalogFiltersOption },
	props: {
		filters: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss">
.option-wrapper {
	&:last-child {
		margin-bottom: 20px;
	}
}
</style>
