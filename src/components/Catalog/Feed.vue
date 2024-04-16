<script>
import ProductPreview from '@/components/Product/Preview'
export default {
	name: 'CatalogFeed',
	components: { ProductPreview },
	props: {
		products: {
			type: Array,
			required: true
		}
	}
}
</script>

<template>
	<div class="catalog-feed">
		<ProductPreview v-for="(product, i) in products" :key="i" :product="product" />
	</div>
</template>

<style lang="scss">
.catalog-feed {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto;
	grid-gap: 24px 12px;

	@media (min-width: $tablet) {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>
