<template>
	<UIAccordion key="faqAccordion" :is-only-one-open="true" init-item-open="0">
		<UIAccordionItem v-for="(item, i) in accordionList" :key="i">
			<template #header>
				<span class="accordion-item-title h4">{{ item.title }}</span>
			</template>
			<template #content>
				<div v-dompurify-html="item.text" class="user-content p4"></div>
			</template>
		</UIAccordionItem>
	</UIAccordion>
</template>

<script>
import UIAccordion from '@/components/UI/Accordion/UIAccordion'
import UIAccordionItem from '@/components/UI/Accordion/UIAccordionItem'
export default {
	name: 'UIViewAccordion',
	components: { UIAccordion, UIAccordionItem },
	props: {
		accordionList: {
			type: Array,
			required: true
		}
	}
}
</script>

<style lang="scss">
.accordion-item-title {
	margin-right: 15px;
}
</style>
