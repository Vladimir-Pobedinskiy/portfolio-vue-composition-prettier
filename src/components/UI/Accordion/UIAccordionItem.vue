<template>
	<div ref="accordionItem" class="accordion-item">
		<div class="accordion-item__header h4" @click="onAccordionItem($refs.accordionItem, $refs.content)">
			<slot name="header" />
			<div class="accordion-item__header-icon-wrapper">
				<UIIcon
					v-if="!isCaretIcon"
					icon-name="mdi-close"
					class-name="accordion-item__header-icon icon-close"
					width="32px"
					height="32px"
				/>
				<UIIcon
					v-else
					icon-name="mdi-chevron-up"
					class-name="accordion-item__header-icon-caret icon-close"
					width="44px"
					height="44px"
				/>
			</div>
		</div>

		<div v-if="$slots.content" ref="content" class="accordion-item__content">
			<slot name="content" />
		</div>
	</div>
</template>
<script>
import { ref, onMounted, inject } from 'vue'
export default {
	name: 'UIAccordionItem',
	setup() {
		const isOnlyOneOpen = ref(inject('isOnlyOneOpen'))
		const initItemOpen = ref(inject('initItemOpen'))
		const isCaretIcon = ref(inject('isCaretIcon'))
		const accordionItem = ref(null)
		const content = ref(null)

		const initAccordion = () => {
			const accordionList = accordionItem.value.parentElement.querySelectorAll('.accordion-item')
			const accordionItemContents = accordionItem.value.parentElement.querySelectorAll('.accordion-item__content')
			accordionList.forEach((elem, index) => {
				accordionItemContents.forEach((el, i) => {
					if (index === i && i === Number(initItemOpen.value)) {
						elem.classList.add('active')
						el.style.maxHeight = `${el.scrollHeight}px`
					} else if (index === i && initItemOpen.value === 'all') {
						elem.classList.add('active')
						el.style.maxHeight = `${el.scrollHeight}px`
					}
				})
			})
		}
		onMounted(() => {
			const accordionList = accordionItem.value.parentElement.querySelectorAll('.accordion-item')
			if (accordionList) initAccordion()
		})

		const onAccordionItem = (item, accordionItemContent) => {
			const accordionList = accordionItem.value.parentElement.querySelectorAll('.accordion-item')
			if (!isOnlyOneOpen.value) {
				if (!item.classList.contains('active')) {
					item.classList.add('active')
					accordionItemContent.style.maxHeight = `${accordionItemContent.scrollHeight}px`
				} else {
					item.classList.remove('active')
					accordionItemContent.style.maxHeight = null
				}
			} else {
				if (!item.classList.contains('active')) {
					accordionList.forEach(elem => {
						elem.classList.remove('active')
					})
					const accordionItemContents = accordionItem.value.parentElement.querySelectorAll('.accordion-item__content')
					accordionItemContents.forEach(elem => {
						elem.style.maxHeight = null
					})
					item.classList.add('active')
					accordionItemContent.style.maxHeight = `${accordionItemContent.scrollHeight}px`
				} else {
					item.classList.remove('active')
					accordionItemContent.style.maxHeight = null
				}
			}
		}

		return {
			accordionItem,
			content,
			isCaretIcon,
			onAccordionItem
		}
	}
}
</script>

<style lang="scss">
.accordion-item {
	padding-top: 24px;
	padding-bottom: 6px;
	border-bottom: 1px solid $color-black;

	&:first-child {
		border-top: 1px solid $color-gray-medium;
	}

	&__header-icon {
		transform: rotate(-45deg);
		transition: transform 0.4s ease;
	}

	&.active {
		.accordion-item__header-icon {
			transform: rotate(0);
			transition: transform 0.4s ease;
		}

		.accordion-item__header-icon-caret {
			transform: rotate(0);
			transition: transform 0.4s ease;
		}
	}

	&__header {
		margin-bottom: 16px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-transform: uppercase;

		@media (min-width: $desktop) {
			margin-bottom: 18px;
			cursor: pointer;
		}
	}

	&__header-icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__content {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		max-height: 0;
		will-change: max-height;
		transition: max-height 0.4s ease-in-out;
	}

	&__header-icon-caret.icon-close {
		width: 30px;
		height: 30px;
		transform: rotate(-180deg);
		transition: transform 0.4s ease;
	}
}
</style>
