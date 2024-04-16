<script>
import { toRefs } from 'vue'
export default {
	name: 'TaskTagListItem',
	props: {
		tag: {
			type: Object,
			required: true
		},
		isPreview: {
			type: Boolean,
			default: false
		}
	},
	emits: ['handleSelectedTag'],
	setup(props, { emit }) {
		const { tag } = toRefs(props)
		const handleSelectedTag = () => {
			emit('handleSelectedTag', tag.value.title)
		}

		return {
			handleSelectedTag
		}
	}
}
</script>

<template>
	<div
		class="task-tag-list-item"
		:class="{ selected: tag.selected && !isPreview, isPreview: isPreview }"
		@click="handleSelectedTag"
	>
		{{ tag.title }}
	</div>
</template>

<style lang="scss">
.task-tag-list-item {
	margin-right: 10px;
	padding: 8px 0;
	width: 33.333%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: $color-white;
	color: $color-black;
	border: 1px solid rgb(227, 221, 221);
	border-radius: 22px;
	user-select: none;
	cursor: pointer;
	transition:
		background-color 0.2s ease,
		color 0.2s ease,
		border-color 0.2s ease;

	&.selected {
		background-color: $color-violet;
		border-color: $color-violet;
		color: $color-white;
		transition:
			background-color 0.3s ease,
			color 0.2s ease,
			border-color 0.3s ease;
	}

	&.isPreview {
		padding: 0;
		width: fit-content;
		border: none;
		cursor: default;

		/* stylelint-disable */
		&:before {
			content: '#';
		}
	}

	&:last-child {
		margin-right: 0;
	}
}
</style>
