<template>
	<div class="home-view offset-page">
		<div class="container">
			<h1 class="home-view__title title h1">{{ description.title }}</h1>
			<ul class="description-list">
				<li class="description-item p1" v-for="(item, i) in description.descriptionList" :key="i">{{ item }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeView',
	setup() {
		const description = {
			title: 'В этом портфолио реализовано:',
			descriptionList: [
				'Установка и настройка Vue CLI',
				'Установка и настройка Vue-router и Vuex',
				'Настройка vue.config.js',
				'Использование Composition Api',
				'Динамическая перерисовка без перезагрузки страницы',
				'Динамические маршруты',
				'Обработка несуществующих routes',
				'Хранение и взаимодействие с данными из JSON-Server',
				'Registration & Login через Supabase',
				'Адаптивная верстка по принципу Mobile First'
			]
		}
		return {
			description
		}
	}
}
</script>
