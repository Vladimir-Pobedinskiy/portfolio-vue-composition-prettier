<template>
	<TransitionGroup tag="div" name="fade" class="task-list">
		<TaskListItem
			v-for="(task, index) in taskList"
			:key="index"
			:task="task"
			:current-index="index"
			@deleteCurrentTask="deleteCurrentTask(index)"
		/>
	</TransitionGroup>
</template>

<script>
import TaskListItem from '@/components/Tasks/TaskListItem'
export default {
	name: 'TaskList',
	components: { TaskListItem },
	props: {
		taskList: {
			type: Array,
			required: true
		}
	},
	setup(props, { emit }) {
		const deleteCurrentTask = index => {
			emit('deleteCurrentTask', index)
		}

		return {
			deleteCurrentTask
		}
	}
}
</script>

<style lang="scss">
.task-list {
	position: relative;
	margin: 0 auto;
	width: 100%;
	max-width: 1000px;
	will-change: transform, opacity;
}
</style>
