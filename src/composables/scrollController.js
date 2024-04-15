export const scrollController = {
	scrollPosition: 0,
	paddingOffset: 0,
	disableScroll() {
		scrollController.scrollPosition = window.scrollY
		scrollController.paddingOffset = window.innerWidth - document.documentElement.clientWidth
		document.body.classList.add('lock-js')
		document.body.style.cssText = `
      position: fixed;
      left: 0;
      top: -${scrollController.scrollPosition}px;
      padding-right: ${scrollController.paddingOffset}px;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    `
	},
	enableScroll() {
		document.body.classList.remove('lock-js')
		document.body.style.cssText = ''
		window.scroll({
			top: scrollController.scrollPosition
		})
	}
}
