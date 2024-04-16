<script>
import { ref, toRefs } from 'vue'
import TaskTagListItem from '@/components/Tasks/TaskTagListItem'
export default {
	name: 'TaskTagList',
	components: { TaskTagListItem },
	props: {
		tags: {
			type: Array,
			required: true
		},
		isPreview: {
			type: Boolean,
			default: false
		}
	},
	emits: ['handleSelectedTags'],
	setup(props, { emit }) {
		const { tags } = toRefs(props)
		const selectedTags = ref([])

		const handleSelectedTag = selectedTag => {
			tags.value.forEach(item => {
				if (item.title === selectedTag) {
					if (!item.selected) {
						item.selected = true
						selectedTags.value.push({
							title: selectedTag
						})
						emit('handleSelectedTags', selectedTags.value)
					} else {
						item.selected = false
						const selectedIndex = selectedTags.value.findIndex(tag => tag.title === selectedTag)
						if (selectedIndex !== -1) {
							selectedTags.value.splice(selectedIndex, 1)
							emit('handleSelectedTags', selectedTags.value)
						}
					}
				}
			})
		}

		return {
			selectedTags,
			handleSelectedTag
		}
	}
}
</script>

<template>
	<div class="task-tag-list" :class="{ 'not-preview': !isPreview }">
		<TaskTagListItem
			v-for="tag in tags"
			:key="tag"
			:tag="tag"
			:is-preview="isPreview"
			@handleSelectedTag="handleSelectedTag"
		/>
	</div>
</template>

<style lang="scss">
.task-tag-list {
	display: flex;
	align-items: center;
}

.task-tag-list.not-preview {
	margin: 16px 0;
	width: 100%;
	max-width: 290px;

	@media (min-width: $desktop) {
		margin: 20px 0 16px;
	}
}
</style>
