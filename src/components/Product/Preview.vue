<template>
	<div class="product-preview-wrapper">
		<router-link class="product-preview hover-scale" :class="{ 'skeleton-box': isLoading }" :to="product.productUrl">
			<div class="product-preview__img-wrapper hover-scale-img-wrapper">
				<img class="product-preview__img hover-scale-img" :src="product.imgUrl" :alt="product.title" />
			</div>
			<div class="product-preview__body">
				<span class="product-preview__title h3">{{ product.title }}</span>
				<div class="product-preview__content">
					<div class="product-preview__price-wrapper">
						<span class="product-preview__price p1">{{ priceFormatter(product.price) }}</span>
						<span v-if="product.oldPrice" class="product-preview__old-price price">
							{{ priceFormatter(product.oldPrice) }}
						</span>
						<span v-if="product.discount" class="product-preview__discount name-product">{{ product.discount }}%</span>
					</div>

					<div v-if="isInCart" class="product-preview__quantity-wrapper">
						<ProductQuantity
							:value="cartQuantity"
							:max-value="product.maxQuantity"
							@click.stop.prevent="onQuantity($event)"
							@input="onInput"
						/>
					</div>
				</div>
			</div>
			<button
				v-if="!isInCart"
				key="off"
				class="product-preview__link btn-orange s4"
				type="button"
				@click.stop.prevent="addToCart"
			>
				Добавить в корзину
			</button>
			<button
				v-else
				key="on"
				class="product-preview__link btn-secondary btn-secondary-small s4"
				type="button"
				@click.stop.prevent="$router.push('/cart/')"
			>
				Перейти в корзину
			</button>
		</router-link>
	</div>
</template>

<script>
import { toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { priceFormatter } from '@/utils/utils'
import ProductQuantity from '@/components/Product/Quantity'
export default {
	name: 'ProductPreview',
	components: { ProductQuantity },
	props: {
		product: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const { product } = toRefs(props)
		const store = useStore()
		const isLoading = computed(() => store.getters.isLoading)
		const items = computed(() => store.getters.items)
		const addItem = product => store.dispatch('addItem', product)

		const incrementItem = cartItem => store.dispatch('incrementItem', cartItem)
		const decrementItem = cartItem => store.dispatch('decrementItem', cartItem)
		const updateItemQuantity = ([product, quantity]) => store.dispatch('updateItemQuantity', [product, quantity])
		const removeItem = product => store.dispatch('removeItem', product)

		const isInCart = computed(() => {
			const found = items.value.find(item => item.id === product.value.id)
			return Boolean(found)
		})
		const cartItem = computed(() => {
			return items.value.find(item => item.id === product.value.id)
		})
		// cartQuantity для получения актуального quantity в т.ч. после routing или обновлении страницы
		const cartQuantity = computed(() => {
			return cartItem.value ? cartItem.value.cartQuantity : 0
		})

		const addToCart = () => {
			addItem(product.value)
		}

		const onQuantity = event => {
			switch (event.currentTarget.dataset.action) {
				case 'increase':
					incrementItem(cartItem.value)
					break
				case 'reduce':
					if (cartItem.value.cartQuantity > 1) {
						decrementItem(cartItem.value)
					} else {
						removeItem(cartItem.value)
					}
					break
				default:
					break
			}
		}

		const onInput = quantity => {
			updateItemQuantity([product.value, quantity])
		}

		return {
			isLoading,
			priceFormatter,
			isInCart,
			addToCart,
			onQuantity,
			onInput,
			cartQuantity
		}
	}
}
</script>

<style lang="scss">
.product-preview {
	padding: 16px;
	width: 100%;
	max-width: 442px;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-radius: 16px;
	text-align: center;
	border: 1px solid rgb(227, 221, 221);

	&__img-wrapper {
		width: 100%;
		max-width: 442px;
		height: 140px;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		overflow: hidden;

		@media (min-width: $tablet) {
			height: 200px;
		}

		@media (min-width: $desktop-big) {
			height: 250px;
		}
	}

	&__img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		mix-blend-mode: multiply;
	}

	&__title {
		margin: 12px 0 8px;
		display: block;
	}

	&__content {
		margin: 0 auto 16px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-wrap: wrap;
	}

	&__price-wrapper {
		margin-bottom: 8px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-wrap: wrap;
	}

	&__price {
		margin-right: 8px;

		@media (min-width: $desktop) {
			margin-right: 12px;
		}
	}

	&__old-price {
		margin-right: 8px;
		color: $color-gray-light;
		text-decoration-line: line-through;

		@media (min-width: $desktop) {
			margin-right: 12px;
		}
	}

	&__quantity-wrapper {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	&__link.btn-secondary.btn-secondary-small {
		margin-top: auto;
		width: 100%;
	}
}
</style>
