<script>
import { ref, toRefs, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash.debounce'
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
import { parse, stringify } from 'qs'

export default {
	name: 'CatalogRange',
	props: {
		range: {
			type: Array,
			required: true
		}
	},
	setup(props) {
		const { range } = toRefs(props)
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const rangeNoUiSlider = ref(null)
		const minRange = ref(null)
		const maxRange = ref(null)
		const slider = ref({
			startMin: 25,
			startMax: 75,
			min: 0,
			max: 100,
			start: 40,
			step: 1
		})
		const sliderRange = ref(null)
		const isLoading = computed(() => store.getters.isLoading)

		watch(isLoading, value => {
			if (value) {
				sliderRange.value.setAttribute('disabled', true)
			} else {
				sliderRange.value.removeAttribute('disabled')
			}
		})
		watch(
			range,
			() => {
				rangeNoUiSlider.value.destroy()
				initSlider()
			},
			{
				deep: true
			}
		)

		const debouncedHandler = debounce(() => {
			let parsedQuery = parse(route.query, { comma: true })
			const requestObject = { minPrice: minRange.value, maxPrice: maxRange.value }

			if (parsedQuery.page) delete parsedQuery.page

			parsedQuery = Object.assign({}, parsedQuery, { ...requestObject })

			router.push(`?${stringify(parsedQuery, { arrayFormat: 'comma' })}`)
		}, 100)

		const initSlider = () => {
			slider.value.min = Number(range.value[0].minValue)
			slider.value.max = Number(range.value[1].maxValue)

			slider.value.startMin = Number(range.value[0].value)
			slider.value.startMax = Number(range.value[1].value)

			rangeNoUiSlider.value = noUiSlider.create(sliderRange.value, {
				start: [slider.value.startMin, slider.value.startMax],
				step: slider.value.step,
				connect: true,
				range: {
					min: slider.value.min,
					max: slider.value.max
				}
			})

			sliderRange.value.noUiSlider.on('update', (values, handle) => {
				handle ? (maxRange.value = parseInt(values[handle])) : (minRange.value = parseInt(values[handle]))
			})

			rangeNoUiSlider.value.on('set', () => {
				debouncedHandler()
			})
		}

		const updateSlider = () => {
			sliderRange.value.noUiSlider.set([minRange.value, maxRange.value])
		}

		onMounted(() => {
			initSlider()
		})

		return {
			isLoading,
			sliderRange,
			minRange,
			maxRange,
			updateSlider
		}
	}
}
</script>

<template>
	<div class="range-wrapper">
		<div class="slider-container">
			<div id="slider-range" ref="sliderRange"></div>
		</div>
		<div class="label-wrapper">
			<label class="input-label">
				<input
					v-model="minRange"
					class="control-input-small input-small"
					type="number"
					name="from"
					placeholder=" "
					:disabled="isLoading"
					@change="updateSlider"
				/>
			</label>

			<label class="input-label">
				<input
					v-model="maxRange"
					class="control-input-small input-small"
					type="number"
					name="from"
					placeholder=" "
					:disabled="isLoading"
					@change="updateSlider"
				/>
			</label>
		</div>
	</div>
</template>

<style lang="scss">
.range-wrapper {
	padding: 12px 0;
}

.label-wrapper {
	margin-bottom: 8px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 4px;
}

.control-input-small {
	width: 100%;
	padding: 10px 16px;
	outline: transparent;
	border: 1px solid $color-gray-dark;
	border-radius: 4px;
	background-color: $color-white;
}

.slider-container {
	margin-bottom: 28px;

	@media (min-width: $desktop) {
		margin-bottom: 30px;
	}
}

#slider-range.noUi-target {
	border: none;
	border-radius: 2px;
	background-color: $color-gray-light;
	box-shadow: none;
}

#slider-range[disabled='true'] {
	opacity: 0.6;
}

#slider-range.noUi-target.noUi-horizontal {
	height: 2px;
}

#slider-range.noUi-target.noUi-horizontal .noUi-base {
	width: calc(100% - 24px);
	transform: translateX(7px);
}

#slider-range.noUi-target.noUi-horizontal .noUi-connect {
	background-color: $color-gray-dark;
}

#slider-range .noUi-handle {
	border: 2px solid $color-gray-dark;
	border-radius: 100%;
	width: 24px;
	height: 24px;
	cursor: pointer;

	&::before,
	&::after {
		display: none;
	}
}

.noUi-touch-area {
	width: 48px;
	height: 48px;
	transform: translate(-25%, -25%);
	outline: transparent;
}

#slider-range.noUi-horizontal .noUi-handle {
	top: -12px;
}

#slider-range.noUi-horizontal .noUi-handle.noUi-active {
	border-color: $color-gray-dark;
}
</style>
