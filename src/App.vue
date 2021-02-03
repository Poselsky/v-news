<template>
	<div id="app" :class="{ 'app-loading': loading }">
		<div class="grid-container">
			<div class="search-wrapper">
				<FormulateInput
					label="Search by a keyword:"
					name="keyword"
					type="text"
					v-model="searchKeyword"
					placeholder="Search by keyword..."
					error-behavior="live"
					validation="required"
					validation-name="Keyword"
					@keyup.enter="fetchNewsHandler"
				/>
				<FormulateInput
					label="Search by topic:"
					name="topic"
					type="select"
					:options="topics"
					v-model="activeTopic"
					error-behavior="live"
					validation-name="Topic"
					@keyup.enter="fetchNewsHandler"
				/>
				<FormulateInput
					label="Choose a language:"
					name="language"
					type="select"
					:options="langs"
					v-model="activeLang"
					error-behavior="live"
					validation-name="Topic"
					@keyup.enter="fetchNewsHandler"
				/>
				<img
					class="search-wrapper__search-icon"
					src="./assets/search.png"
					alt="Search icon"
					@click="fetchNewsHandler"
				/>
			</div>
			<NewsList
				:news="fetchedNews"
				@change-article="articleChangedHandler"
			/>
			<SingleNews v-if="activeNews" :activeNews.sync="activeNews" />
		</div>
		<ErrorModal ref="errorModal" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";
import axios, { AxiosRequestConfig } from "axios";

import NewsList from "./components/NewsList.vue";
import SingleNews from "./components/SingleNews.vue";
import ErrorModal from "./components/ErrorModal.vue";

import Article from "./interfaces/Article";

import { Topic } from "./enums/Topic";
import { Language } from "./enums/Language";

@Component({
	components: {
		NewsList,
		SingleNews,
		ErrorModal,
	},
	methods: {
		...mapMutations(["changeModalActivity", "changeModalMessage"]),
	},
})
export default class App extends Vue {
	fetchedNews: Array<Article> = [];

	private pActiveNews: Article | null = null;

	get activeNews(): Article | null {
		return this.pActiveNews || this.fetchedNews[0] || null;
	}

	set activeNews(val: Article | null) {
		this.pActiveNews = val;
	}

	searchKeyword = "Elon Musk";
	activeTopic = "tech";
	activeLang = "en";

	topics = ["", ...this.enumToArray(Topic)];
	langs = this.enumToArray(Language);

	loading = false;

	private get queryOptions(): AxiosRequestConfig {
		return {
			method: "GET",
			url: "https://newscatcher.p.rapidapi.com/v1/search",
			params: {
				q: this.searchKeyword,
				topic: this.activeTopic,
				lang: this.activeLang,
				/* eslint-disable @typescript-eslint/camelcase */
				sort_by: "relevancy",
				/* eslint-enable @typescript-eslint/camelcase */
				page: "1",
				media: "True",
			},
			headers: {
				"x-rapidapi-key": process.env.VUE_APP_NEWSCATCHER_KEY,
				"x-rapidapi-host": "newscatcher.p.rapidapi.com",
			},
		};
	}

	async fetchNews(): Promise<Array<Article>> {
		const fetchedNews = await axios
			.request(this.queryOptions)
			.then((response) => response.data.articles)
			.catch((e) =>
				this.showErrorModal(`Could not fetch any news, error: ${e}`)
			);

		if (fetchedNews && fetchedNews.length > 0) return fetchedNews;
		else {
			this.showErrorModal("No news found");
			return this.fetchedNews;
		}
	}

	async mounted() {
		await this.fetchNewsHandler();
	}

	articleChangedHandler(article: Article): void {
		this.activeNews = article;
	}

	async fetchNewsHandler(): Promise<void> {
		this.loading = true;
		this.fetchedNews = await this.fetchNews();
		this.loading = false;
	}

	enumToArray(en: any): Array<string> {
		return Object.keys(en).filter(
			//eslint-disable-next-line
			(k) => typeof en[k as any] === "number"
		);
	}

	showErrorModal(message: string): void {
		this.loading = false;
		// @ts-ignore: Unreachable code error
		this.changeModalMessage(message);
		// @ts-ignore: Unreachable code error
		this.changeModalActivity(true);
		const modal = this.$refs.errorModal;
		// @ts-ignore: Unreachable code error
		modal.$modal.show("error-modal");
	}
}
</script>

<style lang="scss">
@import "../node_modules/@braid/vue-formulate/themes/snow/snow.scss";

#app {
	box-sizing: content-box;
	margin: $size-1;
	height: 80vh;
	background-color: $white;
}

.app-loading {
	position: relative;

	&::before {
		content: "";
		position: absolute;
		background-color: rgba($black, 0.15);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
}

.grid-container {
	display: grid;
	grid-template-columns: 3fr 7fr;
	grid-template-rows: min-content auto;
	grid-auto-flow: column;
	column-gap: $size-8;
	height: inherit;
}

.search-wrapper {
	display: flex;
	justify-content: space-between;
	grid-column: 1;
	grid-row: 1;
	padding: 0 $size-4;
	align-items: center;

	&__search-icon {
		width: $size-8;
		height: $size-8;
		align-self: center;
		cursor: pointer;
	}
}
</style>
