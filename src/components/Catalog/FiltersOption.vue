<template>
	<label class="control-label" :class="{ disabled: isLoading || option.disabled }">
		<input
			v-model="model"
			:value="option.value"
			class="control-input visually-hidden"
			:class="{ selected: option.selected }"
			type="checkbox"
			:disabled="isLoading || option.disabled"
		/>
		<span class="control-icon-span">
			<UIIcon class="control-icon-span-icon" icon-name="mdi-check" class-name="icon-close" width="8px" height="8px" />
		</span>
		<span class="control-title hf1">{{ option.title }}</span>
	</label>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { parse, stringify } from 'qs'
export default {
	name: 'CatalogFiltersOption',
	props: {
		groupName: {
			type: String,
			required: true
		},
		option: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const { groupName, option } = toRefs(props)
		const store = useStore()
		const route = useRoute()
		const router = useRouter()
		const isLoading = computed(() => store.getters.isLoading)
		const model = computed({
			get() {
				return option.value.selected
			},
			set(newValue) {
				let parsedQuery = parse(route.query, { comma: true })
				let requestObject = null
				let optionsArray = null

				if (parsedQuery.page) delete parsedQuery.page

				if (groupName.value in parsedQuery) {
					if (typeof parsedQuery[groupName.value] === 'string') {
						optionsArray = Array(parsedQuery[groupName.value])
					} else {
						optionsArray = parsedQuery[groupName.value]
					}

					const index = optionsArray.indexOf(option.value.value)

					if (index > -1) {
						optionsArray.splice(index, 1)
					} else {
						optionsArray.push(option.value.value)
					}

					requestObject = { [groupName.value]: optionsArray }
				} else if (newValue) {
					requestObject = { [groupName.value]: [option.value.value] }
				}

				parsedQuery = Object.assign({}, parsedQuery, { ...requestObject })
				router.push(`?${stringify(parsedQuery, { arrayFormat: 'comma', encode: false })}`)
			}
		})

		return {
			isLoading,
			model
		}
	}
}
</script>

<style lang="scss">
.control-label {
	margin-bottom: 8px;
	padding-left: 32px;
	width: fit-content;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	cursor: pointer;

	&.disabled {
		cursor: default;
		opacity: 0.5;
	}
}

.control-icon-span {
	top: 50%;
	transform: translateY(-50%);
	position: absolute;
	left: 0;
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid $color-gray-light;
	transition:
		background-color 0.3s ease,
		border-color 0.3s ease;
}

.control-icon-span svg {
	transform: scale(0);
	width: 16px;
	height: 16px;
	color: $color-white;
	transition: transform 0.3s ease;
}

.control-input {
	&.selected + .control-icon-span {
		background-color: $color-white;
		border-color: $color-gray-dark;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
	}

	&.selected + .control-icon-span svg {
		transform: scale(1);
		transition: transform 0.3s ease;
	}

	&:disabled + .control-icon-span {
		opacity: 0.8;
		background-color: $color-gray-disabled;
		border-color: $color-gray-disabled;
		color: $color-gray-disabled;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
		cursor: default;
	}
}
</style>
