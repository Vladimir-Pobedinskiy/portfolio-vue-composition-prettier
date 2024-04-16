<script>
import { Swiper } from 'swiper/vue'
import 'swiper/css'
export default {
	name: 'UISlider',
	components: { Swiper },
	props: {
		swiperOptions: {
			type: Object,
			required: true
		},
		className: {
			type: String,
			required: true
		}
	}
}
</script>

<template>
	<swiper
		:slidesPerView="swiperOptions.slidesPerView"
		:spaceBetween="swiperOptions.spaceBetween"
		:speed="swiperOptions.speed"
		:autoplay="swiperOptions.autoplay"
		:keyboard="swiperOptions.keyboard"
		:pagination="swiperOptions.pagination"
		:navigation="swiperOptions.navigation"
		:breakpoints="swiperOptions.breakpoints"
	>
		<slot />
	</swiper>
</template>
