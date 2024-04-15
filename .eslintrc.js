module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		parser: '@babel/eslint-parser'
	},
	rules: {
		// Отключает требование использовать имена компонентов из нескольких слов
		'vue/multi-word-component-names': 'off',
		// Отключает правило, которое было необходимо до Vue 3, где компонент мог иметь только один корневой элемент
		'vue/no-multiple-template-root': 'off',
		'prettier/prettier': ['error', { printWidth: 120 }],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
	}
}
