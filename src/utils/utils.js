/* Breakpoints */
export const screens = {
	mobile: '480px',
	mobileBig: '576px',
	tablet: '768px',
	tabletBig: '992px',
	desktopSmall: '1024px',
	desktop: '1200px',
	desktopBig: '1400px'
}

/* Склонение числительных */
export function declOfNum(number, txt) {
	const cases = [2, 0, 1, 1, 1, 2]
	return txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
}

/* Показ пароля */
export function passwordVisibility(event) {
	const toggle = event.currentTarget
	const input = toggle.previousElementSibling.children[0]

	if (input.type === 'password') {
		input.setAttribute('type', 'text')
		toggle.setAttribute('data-show', true)
	} else {
		input.setAttribute('type', 'password')
		toggle.setAttribute('data-show', false)
	}
}

// priceFormatter
export function priceFormatter(value) {
	if (!value) return ''
	const parts = value.toString().split('.')
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
	return `${parts.join(',')} ₽`
}
