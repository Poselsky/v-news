<template>
	<div class="single-news scrollbar">
		<div
			:class="{ 'single-news--no-image': !activeNews.media }"
			class="single-news__wrapper"
			v-if="activeNews"
		>
			<h2 class="text--primary font--s-12">
				{{ activeNews.title }}
			</h2>
			<img v-if="activeNews.media" :src="activeNews.media" alt="" />
			<p class="text--secondary font--s-6">{{ activeNews.summary }}</p>
			<a class="text--secondary font--s-4" :href="activeNews.link">{{
				activeNews.clean_url
			}}</a>
		</div>
		<div single-news__error v-else>
			<h2 class="text--primary font--s-12">Nothing found</h2>
		</div>
	</div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PropOptions } from "vue";

import Article from "../interfaces/Article";

@Component
export default class SingleNews extends Vue {
	@Prop(Object as PropOptions<Article>) activeNews!: Article;
}
</script>

<style lang="scss" scoped>
.single-news {
	grid-row: 1/3;
	box-sizing: content-box;
	background-color: rgba($primary-color, 0.1);
	border-radius: 5px;
	height: inherit;
	overflow-y: scroll;

	&--no-image {
		justify-content: center;
		h2 {
			margin-bottom: $size-8;
		}

		p {
		}
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: $size-5;
		height: calc(100% - 2 * #{$size-5});

		h2 {
			align-self: center;
			text-align: center;
		}

		p {
			line-height: $size-7;
			text-align: justify;
			align-self: center;
		}

		img {
			align-self: center;
			margin: $size-10 0;
			border-radius: 5px;
		}

		a {
			align-self: center;
			margin: $size-6 0;
			padding-bottom: $size-5;
			text-decoration: none;
			color: $secondary-color;
		}

		> * {
			width: 70%;
		}
	}

	&__error {
		display: grid;
		place-items: center;
	}
}
</style>
