<template>
	<template v-if="isLoading">
		<AppLoading :is-loading="isLoading" />
	</template>
	<template v-else>
		<div class="tasks-view offset-page-br">
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="breadcrumbs" />
				<h1 class="tasks-view__title title h1">{{ description.title }}</h1>

				<ul class="description-list">
					<li class="description-item p1" v-for="(item, i) in description.descriptionList" :key="i">{{ item }}</li>
				</ul>

				<section class="tasks-view__section offset">
					<h2 class="tasks-view__title title h1">Список задач</h2>

					<div class="tasks-view__form-wrapper">
						<form class="tasks-view__form" @submit.prevent="onSubmit">
							<textarea
								v-model="textareaValue"
								class="tasks-view__form-textarea"
								placeholder="Введите новую задачу"
								required
							></textarea>
							<TaskTagList :tags="tags" @handleSelectedTags="handleSelectedTags" />
							<button class="tasks-view__form-btn btn" :disabled="!textareaValue.trim()" type="submit">
								Add new task
							</button>
						</form>
					</div>

					<template v-if="taskList.length">
						<TaskList :task-list="taskList" @deleteCurrentTask="deleteCurrentTask" />
					</template>
					<template v-else>
						<p class="h3">Список задач пуст! Введите вашу первую задачу!</p>
					</template>
				</section>
			</div>
		</div>
	</template>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { useVfm } from 'vue-final-modal'
import AppLoading from '@/components/App/AppLoading'
import TaskList from '@/components/Tasks/TaskList'
import TaskTagList from '@/components/Tasks/TaskTagList'
export default {
	name: 'TasksView',
	components: { AppLoading, TaskList, TaskTagList },
	setup() {
		const store = useStore()
		const vfm = useVfm()
		const breadcrumbs = ref([])
		const description = ref({})
		const textareaValue = ref('')
		const tags = ref([
			{ title: 'home', selected: false },
			{ title: 'travel', selected: false },
			{ title: 'work', selected: false }
		])
		const selectedTags = ref([])
		const isLoading = computed(() => store.getters.isLoading)
		const taskList = computed(() => store.getters.taskList)
		const startLoading = () => store.dispatch('startLoading')
		const endLoading = () => store.dispatch('endLoading')
		const changeTaskList = ([textareaValue, dateTask, selectedTags]) =>
			store.dispatch('changeTaskList', [textareaValue, dateTask, selectedTags])
		const deleteCurrentTask = index => store.dispatch('deleteCurrentTask', index)

		const getData = async () => {
			try {
				startLoading()
				const response = await axios.get('/api/tasks/')
				description.value = response.data.description
				breadcrumbs.value = response.data.breadcrumbs
				endLoading()
			} catch (error) {
				endLoading()
				vfm.open('ModalError')
				console.error('Error fetching UIView', error)
			}
		}
		getData()

		const dateTask = () => {
			const currentDate = new Date()
			const day = String(currentDate.getDate()).padStart(2, '0')
			const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
			const year = currentDate.getFullYear()
			const hours = String(currentDate.getHours()).padStart(2, '0')
			const minutes = String(currentDate.getMinutes()).padStart(2, '0')
			const seconds = String(currentDate.getSeconds()).padStart(2, '0')

			return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`
		}
		const handleSelectedTags = selectedItems => {
			selectedTags.value = selectedItems
		}
		const onSubmit = () => {
			if (textareaValue.value.length) {
				changeTaskList([textareaValue.value.trim(), dateTask(), selectedTags.value])
				textareaValue.value = ''
				selectedTags.value.length = 0
				tags.value.forEach(item => {
					if (item.selected) {
						item.selected = false
					}
				})
			}
		}

		return {
			breadcrumbs,
			description,
			textareaValue,
			tags,
			selectedTags,
			isLoading,
			taskList,
			handleSelectedTags,
			deleteCurrentTask,
			onSubmit
		}
	}
}
</script>

<style lang="scss">
.tasks-view {
	height: 100%;
	background-color: $bg;

	&__section {
		text-align: center;
	}

	&__form-wrapper {
		margin-bottom: 40px;
	}

	&__form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	&__form-textarea {
		padding: 16px;
		width: 100%;
		max-width: 1000px;
		height: 150px;
		border: 1px solid rgb(227, 221, 221);
		border-radius: 12px;
	}

	&__form-btn.btn {
		width: 100%;
		max-width: 300px;
	}
}
</style>
