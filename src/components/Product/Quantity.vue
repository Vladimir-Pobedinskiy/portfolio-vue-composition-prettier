<script>
import { ref, toRefs } from 'vue'
export default {
	name: 'ProductQuantity',
	props: {
		value: {
			type: Number,
			required: true
		},
		maxValue: {
			type: Number,
			required: true
		}
	},
	emits: ['input'],
	setup(props, { emit }) {
		const { maxValue } = toRefs(props)
		const inputRef = ref(null)

		const handleInput = event => {
			const inputValue = event.target.value
			let newValue = ''
			for (let i = 0; i < inputValue.length && i <= maxValue.value.toString().length - 1; i++) {
				if (i === 0 && inputValue[i] === '0') {
					newValue += '1'
				} else if (/^\d+$/.test(inputValue[i])) {
					newValue += inputValue[i]
				}
			}
			event.target.value = newValue

			if (event.target.value >= maxValue.value) {
				event.target.value = maxValue.value
			}
		}

		const handleEnter = () => {
			inputRef.value.blur()
		}

		const handleBlur = event => {
			let inputValue = event.target.value.replace(/[^0-9]/g, '')
			if (inputValue === '' || inputValue.charAt(0) === '0') {
				inputValue = '1'
				event.target.value = inputValue
			}

			emit('input', parseInt(inputValue, 10))
		}

		return {
			inputRef,
			handleInput,
			handleEnter,
			handleBlur
		}
	}
}
</script>

<template>
	<div class="quantity" @click.stop.prevent="() => null">
		<button class="quantity__btn" type="button" title="убавить" data-action="reduce" v-bind="$attrs">
			<UIIcon icon-name="mdi-minus" class-name="quantity__btn-icon" width="16px" height="16px" />
		</button>
		<input
			ref="inputRef"
			class="quantity__input"
			:value="value"
			type="number"
			tabindex="-1"
			@input="handleInput($event)"
			@blur="handleBlur($event)"
			@keyup.enter="handleEnter"
		/>
		<button
			class="quantity__btn"
			type="button"
			title="прибавить"
			data-action="increase"
			:disabled="value === maxValue"
			v-bind="$attrs"
		>
			<UIIcon icon-name="mdi-plus" class-name="quantity__btn-icon" width="16px" height="16px" />
		</button>
	</div>
</template>

<style lang="scss">
.quantity {
	padding: 8px;
	width: 104px;
	border: 1px solid $color-gray;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&__btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;

		&:disabled {
			opacity: 0.5;
			cursor: default;
		}
	}

	&__btn-icon {
		width: 16px;
		height: 16px;
	}

	&__input {
		width: 100%;
		max-width: 32px;
		overflow: hidden;
		text-align: center;
	}
}
</style>
