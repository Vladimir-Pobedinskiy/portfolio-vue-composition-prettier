module.exports = {
	extends: 'stylelint-config-standard-scss',
	plugins: ['stylelint-prettier'],
	customSyntax: 'postcss-html',
	overrides: [
		{
			files: ['**/*.vue']
		}
	],
	rules: {
		'prettier/prettier': true,
		'block-no-empty': null,
		'color-hex-length': 'long',
		'color-function-notation': 'legacy',
		'selector-class-pattern': null, //отключение необходимости использования kebab-case для имен классов
		'font-family-name-quotes': 'always-unless-keyword'
	}
}
