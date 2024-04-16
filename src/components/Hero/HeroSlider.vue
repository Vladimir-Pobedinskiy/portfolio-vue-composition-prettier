<script>
import { SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay, Keyboard } from 'swiper/modules'
import HeroCard from '@/components/Hero/HeroCard'
import UISlider from '@/components/UI/UISlider'

export default {
	name: 'HeroSlider',
	components: { HeroCard, UISlider, SwiperSlide },
	props: {
		heroList: {
			type: Array,
			required: true
		}
	},
	setup() {
		const modules = [Navigation, Autoplay, Keyboard]
		const swiperOptions = {
			slidesPerView: 1.2,
			spaceBetween: 8,
			speed: 900,
			autoplay: {
				delay: 4000
			},
			keyboard: true,
			navigation: {
				nextEl: '.hero-swiper__button-next',
				prevEl: '.hero-swiper__button-prev'
			},
			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 8
				},
				400: {
					slidesPerView: 1.3,
					spaceBetween: 8
				},
				576: {
					slidesPerView: 1.5,
					spaceBetween: 8
				},
				700: {
					slidesPerView: 2.1,
					spaceBetween: 8
				},
				767: {
					slidesPerView: 2.3,
					spaceBetween: 16
				},
				992: {
					slidesPerView: 2.5,
					spaceBetween: 16
				},
				1200: {
					slidesPerView: 3,
					spaceBetween: 16
				}
			}
		}

		return {
			modules,
			swiperOptions
		}
	}
}
</script>

<template>
	<section class="hero-swiper offset">
		<div class="hero-swiper__top">
			<h2 class="hero-swiper__title h1">Герои</h2>
			<div class="hero-swiper__navigation-wrapper">
				<span class="visually-hidden">Стрелки навигации по слайдеру</span>
				<button class="hero-swiper__button-prev swiper-button-prev" type="button">
					<span class="visually-hidden">К предыдущему слайду</span>
					<UIIcon
						icon-name="mdi-arrow-forward"
						class-name="hero-swiper__button-icon hero-swiper__button--prev-icon"
						width="34px"
						height="34px"
					/>
				</button>
				<button class="hero-swiper__button-next swiper-button-next" type="button">
					<span class="visually-hidden">К следующему слайду</span>
					<UIIcon
						icon-name="mdi-arrow-forward"
						class-name="hero-swiper__button-icon hero-swiper__button--next-icon"
						width="34px"
						height="34px"
					/>
				</button>
			</div>
		</div>
		<div class="hero-swiper__inner">
			<UISlider :modules="modules" :swiper-options="swiperOptions" class-name="hero-swiper__list">
				<swiper-slide v-for="(hero, i) in heroList" :key="i" class="hero-swiper__slide">
					<HeroCard :hero="hero" />
				</swiper-slide>
			</UISlider>
		</div>
	</section>
</template>

<style lang="scss">
.hero-swiper {
	&__top {
		margin-bottom: 24px;

		@media (min-width: $tablet) {
			margin-bottom: 32px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	&__title {
		text-transform: uppercase;
	}

	&__navigation-wrapper {
		width: 100%;
		max-width: 130px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__button-prev,
	&__button-next {
		@media (min-width: $desktop) {
			cursor: pointer;
		}
	}

	&__list {
		overflow: hidden;
	}

	&__slide {
		display: flex;
		flex-direction: column;
		height: auto !important;
	}

	&__button-icon {
		width: 32px;
		height: 32px;
		fill: $color-white;
		transition: fill 0.3s ease;
	}
}

.hero-swiper__button-prev.swiper-button-prev,
.hero-swiper__button-next.swiper-button-next {
	display: none;

	@media (min-width: $desktop) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 54px;
		height: 54px;
		background-color: $color-gray-dark;
		border-radius: 50%;
		color: $color-white;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;

		&:hover {
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;

			.hero-swiper__button-icon {
				fill: $color-white;
				transition: fill 0.3s ease;
			}
		}

		&:active {
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;
		}
	}
}

.hero-swiper__button-prev.swiper-button-prev.swiper-button-disabled,
.hero-swiper__button-next.swiper-button-next.swiper-button-disabled {
	background-color: $color-gray-disabled;
	border: none;
	transition:
		background-color 0.3s ease,
		fill 0.3s ease;
	cursor: default;

	.hero-swiper__button-icon {
		fill: $color-gray-light;
		transition: fill 0.3s ease;
	}
}

.hero-swiper__button--prev-icon {
	transform: rotate(-180deg);
}

.swiper-wrapper {
	will-change: transform;
}
</style>
