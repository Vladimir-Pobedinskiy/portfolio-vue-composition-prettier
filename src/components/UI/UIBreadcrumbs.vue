<template>
	<div class="breadcrumbs-wrapper">
		<div class="breadcrumbs-wrap">
			<ul class="breadcrumbs" itemtype="https://schema.org/BreadcrumbList" aria-label="Хлебные крошки">
				<li
					v-for="(item, index) in breadcrumbs"
					:key="index"
					class="breadcrumbs__item"
					itemprop="itemListElement"
					itemscope
					itemtype="https://schema.org/ListItem"
				>
					<router-link
						v-if="index !== breadcrumbs.length - 1"
						class="breadcrumbs__link p4"
						:to="`${item.url}`"
						:title="item.title"
						itemprop="item"
					>
						<meta itemprop="position" :content="index" />
						<span itemprop="name">{{ item.title }}</span>
					</router-link>
					<span v-else class="breadcrumbs__link p4" :title="item.title" itemprop="item" aria-current="page">
						<meta itemprop="position" :content="index" />
						<span itemprop="name">{{ item.title }}</span>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UIBreadcrumbs',
	props: {
		breadcrumbs: {
			type: Array,
			required: true
		}
	}
}
</script>

<style lang="scss">
.breadcrumbs-wrapper {
	margin-bottom: 20px;
	overflow: hidden;

	@media (min-width: $desktop) {
		margin-bottom: 32px;
	}
}

.breadcrumbs {
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	&__item:not(:last-of-type) {
		position: relative;
		margin-right: 18px;
		color: $color-gray-medium;
	}

	li:not(:last-of-type) {
		&::after {
			content: '>';
			position: absolute;
			margin-left: 4px;
			top: 50%;
			transform: translateY(-50%);
			width: 10px;
			height: 21px;
		}
	}
}

.blog-post {
	.breadcrumbs {
		&__item:not(:last-of-type) {
			&:first-child {
				color: $color-white;
			}
		}

		li:not(:last-of-type) {
			&::after {
				content: '>';
				position: absolute;
				margin-left: 4px;
				top: 50%;
				transform: translateY(-50%);
				width: 10px;
				height: 21px;
			}
		}
	}
}
</style>
