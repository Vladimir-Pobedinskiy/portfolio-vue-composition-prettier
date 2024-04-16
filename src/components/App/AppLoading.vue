<script>
export default {
	name: 'AppLoading',
	props: {
		isLoading: {
			type: Boolean,
			default: false
		},
		isLoadingLocal: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<template>
	<div v-if="isLoading" class="loading">
		<div class="loading__spinner-wrapper">
			<div class="loading__spinner">
				<div><div></div></div>
				<div><div></div></div>
				<div><div></div></div>
				<div><div></div></div>
				<div><div></div></div>
				<div><div></div></div>
				<div><div></div></div>
				<div><div></div></div>
			</div>
		</div>
	</div>
	<div v-else-if="isLoadingLocal" class="loading-local">
		<div class="loading-local__spinner-wrapper">
			<div class="loading-local__spinner">
				<div></div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
/* stylelint-disable */
.loading {
	padding: 0;
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 1;
	visibility: visible;
	z-index: 1002;
	background-color: rgba(0, 0, 0, 70%);
	transition:
		opacity 0.2s ease,
		visibility 0.2s ease;

	.loading__spinner-wrapper {
		width: 200px;
		height: 200px;
		display: inline-block;
		overflow: hidden;
	}

	.loading__spinner {
		width: 100%;
		height: 100%;
		position: relative;
		transform: translateZ(0) scale(1);
		backface-visibility: hidden;
		transform-origin: 0 0;
	}

	.loading__spinner div > div {
		position: absolute;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: $color-vue;
		-webkit-animation: loading__spinner 1s linear infinite;
		-moz-animation: loading__spinner 1s linear infinite;
		-ms-animation: loading__spinner 1s linear infinite;
		-o-animation: loading__spinner 1s linear infinite;
		animation: loading__spinner 1s linear infinite;
	}

	.loading__spinner div:nth-child(1) > div {
		left: 148px;
		top: 88px;
		animation-delay: -0.875s;
	}

	.loading__spinner > div:nth-child(1) {
		transform: rotate(0deg);
		transform-origin: 160px 100px;
	}

	.loading__spinner div:nth-child(2) > div {
		left: 130px;
		top: 130px;
		animation-delay: -0.75s;
	}

	.loading__spinner > div:nth-child(2) {
		transform: rotate(45deg);
		transform-origin: 142px 142px;
	}

	.loading__spinner div:nth-child(3) > div {
		left: 88px;
		top: 148px;
		animation-delay: -0.625s;
	}

	.loading__spinner > div:nth-child(3) {
		transform: rotate(90deg);
		transform-origin: 100px 160px;
	}

	.loading__spinner div:nth-child(4) > div {
		left: 46px;
		top: 130px;
		animation-delay: -0.5s;
	}

	.loading__spinner > div:nth-child(4) {
		transform: rotate(135deg);
		transform-origin: 58px 142px;
	}

	.loading__spinner div:nth-child(5) > div {
		left: 28px;
		top: 88px;
		animation-delay: -0.375s;
	}

	.loading__spinner > div:nth-child(5) {
		transform: rotate(180deg);
		transform-origin: 40px 100px;
	}

	.loading__spinner div:nth-child(6) > div {
		left: 46px;
		top: 46px;
		animation-delay: -0.25s;
	}

	.loading__spinner > div:nth-child(6) {
		transform: rotate(225deg);
		transform-origin: 58px 58px;
	}

	.loading__spinner div:nth-child(7) > div {
		left: 88px;
		top: 28px;
		animation-delay: -0.125s;
	}

	.loading__spinner > div:nth-child(7) {
		transform: rotate(270deg);
		transform-origin: 100px 40px;
	}

	.loading__spinner div:nth-child(8) > div {
		left: 130px;
		top: 46px;
		animation-delay: 0s;
	}

	.loading__spinner > div:nth-child(8) {
		transform: rotate(315deg);
		transform-origin: 142px 58px;
	}
}

.loading-local {
	display: flex;
	align-items: center;
	justify-content: center;

	.loading-local__spinner div {
		position: absolute;
		width: 160px;
		height: 160px;
		top: 20px;
		left: 20px;
		border-radius: 50%;
		box-shadow: 0 4px 0 0 $color-vue;
		transform-origin: 80px 82px;
		-webkit-animation: loading-local__spinner 1s linear infinite;
		-moz-animation: loading-local__spinner 1s linear infinite;
		-ms-animation: loading-local__spinner 1s linear infinite;
		-o-animation: loading-local__spinner 1s linear infinite;
		animation: loading-local__spinner 1s linear infinite;
	}

	.loading-local__spinner-wrapper {
		width: 200px;
		height: 200px;
		display: inline-block;
		overflow: hidden;
		background: $color-white;
	}

	.loading-local__spinner {
		width: 100%;
		height: 100%;
		position: relative;
		transform: translateZ(0) scale(1);
		backface-visibility: hidden;
		transform-origin: 0 0;
	}

	.loading-local__spinner div {
		box-sizing: content-box;
	}
}

@keyframes loading__spinner {
	0% {
		opacity: 1;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-o-backface-visibility: hidden;
		-ms-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transform: translateZ(0) scale(1.5, 1.5);
		-moz-transform: translateZ(0) scale(1.5, 1.5);
		-o-transform: translateZ(0) scale(1.5, 1.5);
		-ms-transform: translateZ(0) scale(1.5, 1.5);
		transform: translateZ(0) scale(1.5, 1.5);
	}
	100% {
		opacity: 0;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-o-backface-visibility: hidden;
		-ms-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transform: translateZ(0) scale(1, 1);
		-moz-transform: translateZ(0) scale(1, 1);
		-o-transform: translateZ(0) scale(1, 1);
		-ms-transform: translateZ(0) scale(1, 1);
		transform: translateZ(0) scale(1, 1);
	}
}

@keyframes loading-local__spinner {
	0% {
		-ms-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-webkit-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	50% {
		-ms-transform: rotate(180deg);
		-moz-transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		-o-transform: rotate(180deg);
		transform: rotate(180deg);
	}
	100% {
		-ms-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-webkit-transform: rotate(360deg);
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
</style>
