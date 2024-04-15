<template>
	<div class="modal-tags">
		<teleport to="body">
			<UIModal v-model="showModal" :modal-settings="modalSettings">
				<template #header>
					<span class="modal-tags-title s2">Выберите теги</span>
				</template>
				<template #body>
					<TaskTagList :tags="tags" @handleSelectedTags="handleSelectedTags" />
					<button
						class="modal-tags-btn-save btn btn-small"
						:disabled="!selectedTags.length"
						type="button"
						@click="editSelectedTags"
					>
						Сохранить
					</button>
				</template>
			</UIModal>
		</teleport>

		<button
			:class="currentTags.length ? 'modal-tags-btn-open' : 'btn btn-small'"
			aria-label="Открыть модальное окно"
			@click="openModal"
		>
			<UIIcon
				v-if="currentTags.length"
				icon-name="mdi-edit-outline"
				class-name="icon-edit"
				width="32px"
				height="32px"
			/>
			<span v-else class="p3">Добавить теги</span>
		</button>
	</div>
</template>

<script>
import { ref } from 'vue'
import UIModal from '@/components/UI/UIModal'
import TaskTagList from '@/components/Tasks/TaskTagList'
export default {
	name: 'ModalTags',
	components: { UIModal, TaskTagList },
	props: {
		currentTags: {
			type: Array,
			required: true
		}
	},
	emits: ['editSelectedTags'],
	setup(props, { emit }) {
		const showModal = ref(false)
		const modalSettings = {
			name: 'ModalTags',
			clickToClose: true, // Закрытие модального окна при нажатии на наложение модального окна
			escToClose: true, // Нажмите esc, чтобы закрыть модальное окно
			hideOverlay: false // Скрытие отображения наложения
		}
		const tags = ref([
			{ title: 'home', selected: false },
			{ title: 'travel', selected: false },
			{ title: 'work', selected: false }
		])
		const selectedTags = ref([])

		const openModal = () => {
			showModal.value = true
		}

		const handleSelectedTags = selectedItems => {
			selectedTags.value = selectedItems
		}

		const editSelectedTags = () => {
			emit('editSelectedTags', selectedTags.value)
			selectedTags.value.length = 0
			tags.value.forEach(item => {
				item.selected = false
			})
			showModal.value = false
		}

		return {
			showModal,
			modalSettings,
			tags,
			selectedTags,
			openModal,
			handleSelectedTags,
			editSelectedTags
		}
	}
}
</script>

<style lang="scss">
.modal-tags-btn-open {
	margin-left: 20px;
	width: 24px;
	height: 24px;
}

.modal-tags-btn-open-icon {
	width: 23px;
	height: 23px;
}

.modal-tags-btn-save.btn.btn-small {
	margin-top: 24px;
	width: 100%;
}
</style>
