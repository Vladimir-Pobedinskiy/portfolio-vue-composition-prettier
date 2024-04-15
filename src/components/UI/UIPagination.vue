<template>
	<div v-if="pageTotal > 1" class="pagination">
		<button
			class="pagination__btn btn-orange p1"
			:disabled="currentPage === pageTotal || isLoading"
			type="button"
			@click.prevent="onMore"
		>
			Показать еще
		</button>
		<ul class="pagination__list" aria-label="Навигация по страницам">
			<li v-if="currentPage !== 1" class="pagination__item" :class="{ disable: isLoading }">
				<a class="pagination__link pagination__link--prev" href="#!" @click.prevent="onPrevious">
					<UIIcon
						icon-name="mdi-arrow-forward"
						class-name="pagination__button-icon pagination__button--prev-icon"
						width="22px"
						height="22px"
					/>
				</a>
			</li>
			<li v-for="(page, i) in croppedPages" :key="i" class="pagination__item" :class="{ disable: isLoading }">
				<a
					class="pagination__link"
					:class="{ disable: page !== currentPage, active: page === '...' || page === currentPage }"
					href="#!"
					@click.prevent="onPage(page)"
				>
					{{ page }}
				</a>
			</li>
			<li v-if="currentPage !== pageTotal" class="pagination__item" :class="{ disable: isLoading }">
				<a class="pagination__link pagination__link--next" href="#!" @click.prevent="onNext">
					<UIIcon
						icon-name="mdi-arrow-forward"
						class-name="pagination__button-icon pagination__button--next-icon"
						width="22px"
						height="22px"
					/>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import { toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
	name: 'UIPagination',
	props: {
		pageTotal: {
			type: Number,
			required: true
		}
	},
	setup(props, { emit }) {
		const { pageTotal } = toRefs(props)
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const isLoading = computed(() => store.getters.isLoading)
		const currentPage = computed(() => Number(route.query.page || '1'))
		const croppedPages = computed(() => {
			const numbersList = []
			const numbersListWithDots = []
			const offset = 2

			const offsetNumber =
				currentPage.value <= offset || currentPage.value > pageTotal.value - offset ? offset : offset - 1
			if (pageTotal.value <= 1 || pageTotal.value === undefined) return [1]
			numbersList.push(1)
			for (let i = currentPage.value - offsetNumber; i <= currentPage.value + offsetNumber; i++) {
				if (i < pageTotal.value && i > 1) {
					numbersList.push(i)
				}
			}
			numbersList.push(pageTotal.value)
			numbersList.reduce((accumulator, currentValue) => {
				if (accumulator === 1) {
					numbersListWithDots.push(accumulator)
				}
				if (currentValue - accumulator !== 1) {
					numbersListWithDots.push('...')
				}
				numbersListWithDots.push(currentValue)

				return currentValue
			})

			return numbersListWithDots
		})

		const onPage = n => {
			const query = Object.assign({}, route.query, { page: n })
			if (Number(n) === 1) {
				delete query.page
			}
			router.push({ query })
		}
		const onPrevious = () => {
			let targetPage = currentPage.value
			onPage(--targetPage)
		}
		const onNext = () => {
			let targetPage = currentPage.value
			onPage(++targetPage)
		}
		const onMore = () => {
			let targetPage = currentPage.value
			emit('more', ++targetPage)
		}

		return {
			isLoading,
			currentPage,
			croppedPages,
			onPage,
			onPrevious,
			onNext,
			onMore
		}
	}
}
</script>

<style lang="scss">
.pagination {
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	&__btn.btn-orange {
		padding: 12px 26px;
		width: fit-content;
	}

	&__list {
		display: none;

		@media (min-width: $desktop-small) {
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			padding: 17px 18px;
			border-top: 1px solid $color-gray;
			border-bottom: 1px solid $color-gray;
		}
	}

	&__item {
		margin-right: 14px;
		display: flex;
		align-items: center;
		justify-content: center;

		&:last-child {
			margin-right: 0;
		}
	}

	&__link {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: $font;
		font-weight: 450;
		font-size: 16px;
		line-height: 1.4;

		&.active {
			color: $color-gray-dark;
		}

		&.disable {
			color: $color-gray-medium;
		}
	}

	&__link--prev {
		margin-right: 14px;
	}

	&__link--next {
		margin-left: 14px;
	}

	&__icon-arrow {
		width: 10px;
		height: 11px;
		fill: $color-gray;
	}

	&__button-icon {
		width: 22px;
		height: 22px;
	}

	&__button--prev-icon {
		transform: rotate(-180deg);
	}
}
</style>
