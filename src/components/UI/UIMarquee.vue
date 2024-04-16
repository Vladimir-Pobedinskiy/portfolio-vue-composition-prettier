<script>
import { Vue3Marquee } from 'vue3-marquee'
export default {
	name: 'UIMarquee',
	components: { Vue3Marquee },
	props: {
		marqueeSettings: {
			type: Object,
			required: true
		}
	}
}
</script>

<template>
	<Vue3Marquee
		:duration="marqueeSettings.duration"
		:pauseOnHover="marqueeSettings.pauseOnHover"
		:direction="marqueeSettings.direction"
		:loop="marqueeSettings.loop"
		:gradient="marqueeSettings.gradient"
		:gradientColor="marqueeSettings.gradientColor"
		:gradientLength="marqueeSettings.gradientLength"
	>
		<slot />
	</Vue3Marquee>
</template>

<style lang="scss">
.marquee-section {
	&__top {
		margin-bottom: 32px;

		@media (min-width: $desktop) {
			margin-bottom: 48px;
		}
	}
}
</style>
