<template>
	<div class="news-list__wrapper">
		<ul class="news-list scrollbar">
			<li
				v-for="singleNews in news"
				:key="singleNews.key"
				@click="changeArticle(singleNews)"
			>
				<img :src="singleNews.media" v-if="singleNews.media" alt="" />
				<img class="not-found" src="../assets/no-image.png" v-else />
				<div class="info-wrapper">
					<h3 class="font--s-5 text--primary text--black">
						{{ shortenedTitle(singleNews.title) }}
					</h3>
					<p class="font--s-3 text--secondary">
						{{ singleNews.clean_url }}
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>


<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { PropOptions } from "vue";

import Article from "../interfaces/Article";

@Component
export default class NewsList extends Vue {
	@Prop(Array as PropOptions<Array<Article>>) news!: Array<Article>;

	@Emit()
	changeArticle(val: Article): Article {
		return val;
	}

	shortenedTitle(title: string): string {
		const numberOfWords = 14;
		const words = title.split(" ");
		if (words.length <= numberOfWords) return title;

		return words.slice(0, numberOfWords).join(" ").concat("...");
	}
}
</script>

<style lang="scss" scoped>
.news-list {
	box-sizing: content-box;
	width: 100%;
	height: 100%;
	list-style-type: none;
	grid-row: 2;
	display: flex;
	flex-direction: column;
	gap: $size-2;
	overflow-y: scroll;

	&__wrapper {
		position: relative;
		overflow: hidden;

		&::before {
			content: "";
			position: absolute;
			background-image: linear-gradient($white, transparent);
			top: 0;
			left: 0;
			right: 0;
			height: 40px;
			z-index: 1;
		}

		&::after {
			content: "";
			position: absolute;
			background-image: linear-gradient(transparent, $white);
			bottom: 0;
			left: 0;
			right: 0;
			height: 40px;
			z-index: 1;
		}
	}
}

li {
	display: grid;
	box-sizing: content-box;
	padding: $size-3;
	margin: 0 $size-2;
	grid-auto-flow: column;
	grid-template-columns: 35% auto;
	gap: $size-3;
	cursor: pointer;

	transition: 0.1s linear;

	@mixin hoverLi($color) {
		&:hover {
			background-color: rgba($color, 0.4);
			transition: 0.3s linear;
		}
	}

	&:first-of-type {
		margin-top: $size-3;
	}

	&:last-of-type {
		margin-bottom: $size-3;
	}

	&:nth-of-type(even) {
		background-color: rgba($primary-color, 0.1);

		@include hoverLi($primary-color);
	}

	&:nth-of-type(odd) {
		background-color: rgba($secondary-color, 0.1);

		@include hoverLi($secondary-color);
	}
}

h3 {
	margin-bottom: $size-3;
}

img {
	object-fit: cover;
	border-radius: 3px;
	width: 100%;
	justify-self: center;
	align-self: center;
	max-height: 100px;

	&.not-found {
		height: 100%;
		object-fit: contain;
	}
}

.info-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

	> p {
		color: rgba($black, 0.85);
	}
}
</style>
