<template>
	<div class="sort">
		<div class="sort__btn-list">
			<button
				v-for="(item, i) in sort"
				:key="i"
				class="sort__btn p3"
				:class="{ active: item.selected }"
				type="button"
				@click="onSort(item)"
			>
				{{ item.title }}
			</button>
		</div>
	</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
export default {
	name: 'CatalogSort',
	props: {
		sort: {
			type: Array,
			required: true
		}
	},
	setup() {
		const route = useRoute()
		const router = useRouter()

		const onSort = item => {
			const query = Object.assign({}, route.query, { _sort: item.field, _order: item.order })
			if (query.page) delete query.page
			router.push({ query })
		}

		return {
			onSort
		}
	}
}
</script>

<style lang="scss">
.sort {
	@media (max-width: $mobile) {
		overflow-x: scroll;
	}

	&__btn-list {
		min-width: 400px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		@media (min-width: $tablet) {
			margin-bottom: 0;
		}
	}

	&__btn {
		margin-right: 24px;
		border-bottom: 1px solid transparent;
		color: $color-gray-medium;
		background-color: transparent;
		text-transform: uppercase;
		transition:
			border-color 0.1s ease,
			color 0.1s ease;

		@media (min-width: $desktop) {
			margin-right: 32px;

			&:hover {
				color: $color-gray-dark;
				transition: color 0.2s ease;
			}
		}

		&.active {
			color: $color-gray-dark;
			transition: color 0.2s ease;

			@media (min-width: $desktop) {
				border-color: $color-gray-dark;
				transition:
					border-color 0.2s ease,
					color 0.2s ease;
			}
		}

		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
