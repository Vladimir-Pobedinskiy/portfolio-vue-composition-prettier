<template>
	<div class="task-list-item">
		<div class="task-list-item__header">
			<div class="task-list-item__title-wrapper">
				<span class="task-list-item__title p1">{{ task.title }}</span>
				<button
					class="task-list-item__title-edit-btn"
					type="button"
					aria-label="Открыть редактирование задачи"
					@click="openEditInput"
				>
					<UIIcon icon-name="mdi-edit-outline" class-name="icon-edit" width="32px" height="32px" />
				</button>
			</div>
			<div class="task-list-item__input-wrapper" :class="{ 'visually-hidden': inputHiddenFlag }">
				<input v-model="inputValue" class="task-list-item__input p3" type="text" name="task-name" />
				<button
					class="task-list-item__btn-close-input"
					type="button"
					@click="editCurrentTask(), (inputHiddenFlag = true)"
				>
					{{ !inputValue.length ? 'Закрыть' : 'Сохранить' }}
				</button>
			</div>
			<button class="task-list-item__remove-btn" type="button" aria-label="Закрыть задачу" @click="deleteCurrentTask">
				<UIIcon icon-name="mdi-close" class-name="icon-close" width="32px" height="32px" />
			</button>
		</div>
		<div class="task-list-item__footer">
			<div class="tag-list-wrapper">
				<TaskTagList v-if="task.tags && task.tags.length" :tags="task.tags" isPreview />
				<ModalTags @editSelectedTags="editSelectedTags" :current-tags="task.tags" />
			</div>
			<span v-if="task.date" class="task-list-item__date p5">{{ task.date }}</span>
		</div>
	</div>
</template>

<script>
import { ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import ModalTags from '@/components/Modals/ModalTags'
import TaskTagList from '@/components/Tasks/TaskTagList'
export default {
	name: 'TaskListItem',
	components: { TaskTagList, ModalTags },
	props: {
		task: {
			type: Object,
			required: true
		},
		currentIndex: {
			type: Number,
			required: false
		}
	},
	emits: ['deleteCurrentTask'],
	setup(props, { emit }) {
		const { task, currentIndex } = toRefs(props)
		const store = useStore()
		const inputHiddenFlag = ref(true)
		const inputValue = ref('')
		const changeTaskItem = ([currentIndex, inputValue]) => store.dispatch('changeTaskItem', [currentIndex, inputValue])
		const changeTaskItemTags = ([currentIndex, selectedTags]) =>
			store.dispatch('changeTaskItemTags', [currentIndex, selectedTags])

		const deleteCurrentTask = index => {
			emit('deleteCurrentTask', index)
		}
		const openEditInput = () => {
			inputHiddenFlag.value = false
			inputValue.value = task.value.title
		}
		const editCurrentTask = () => {
			if (inputValue.value.trim().length) {
				changeTaskItem([currentIndex.value, inputValue.value.trim()])
			}
		}
		const editSelectedTags = selectedTags => {
			changeTaskItemTags([currentIndex.value, selectedTags])
		}

		return {
			inputHiddenFlag,
			inputValue,
			deleteCurrentTask,
			openEditInput,
			editCurrentTask,
			editSelectedTags
		}
	}
}
</script>

<style lang="scss">
.task-list-item {
	margin-top: 20px;
	padding: 12px;
	width: 100%;
	border-radius: 16px;
	background-color: $color-white;
	box-shadow: 0 30px 30px rgba(0, 0, 0, 4%);

	&:first-child {
		margin-top: 0;
	}

	@media (min-width: $mobile) {
		padding: 20px;
	}

	@media (min-width: $desktop) {
		transition: box-shadow 0.25s ease;

		&:hover {
			box-shadow: 0 30px 30px rgba(0, 0, 0, 6%);
			transition: box-shadow 0.25s ease;
		}
	}

	&__header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__title-wrapper {
		display: flex;
		align-items: center;
		flex: 1 1 65%;
		overflow: hidden;
		z-index: 1;
	}

	&__title {
		text-align: left;
		overflow: hidden;
	}

	&__title-edit-btn {
		margin-left: 20px;
		width: 24px;
		height: 24px;
	}

	&__input-wrapper {
		width: 80%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $color-white;
		z-index: 2;
	}

	&__input {
		flex: 1 1 80%;
		padding: 8px;
		border: 1px solid rgb(227, 221, 221);
		border-radius: 12px;
	}

	&__btn-close-input {
		margin-left: 10px;
		flex: 1 1 15%;
	}

	&__remove-btn {
		margin-left: 10px;
		width: 32px;
		height: 32px;

		@media (max-width: $mobile) {
			transform: translateY(150%);
		}
	}

	&__footer {
		margin-top: 10px;
		text-align: left;
	}

	.tag-list-wrapper {
		margin: 16px 0;
		width: 100%;
		max-width: 290px;
		display: flex;
		align-items: center;
		flex: 1 1 90%;
		z-index: 1;

		@media (min-width: $desktop) {
			margin: 20px 0 16px;
		}
	}
}
</style>
