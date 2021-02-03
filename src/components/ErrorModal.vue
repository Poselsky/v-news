<template>
	<modal name="error-modal">
		<div class="error-container">
			<h3 class="text--primary font--s-10">{{ modalState.message }}</h3>
		</div>
	</modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";

@Component({
	computed: {
		...mapGetters(["modalState"]),
	},
	methods: {
		...mapMutations(["changeModalMessage", "changeModalActivity"]),
	},
})
export default class ErrorModal extends Vue {
	mounted() {
		document.body.addEventListener("click", this.handleClose);
	}

	handleClose() {
		// @ts-ignore: Unreachable code error
		this.$modal.hide("erorr-modal");
		// @ts-ignore: Unreachable code error
		this.changeModalActivity(false);

		document.body.removeEventListener("click", this.handleClose);
	}
}
</script>


<style lang="scss">
@import "/node_modules/vue-js-modal/dist/styles.css";

.error-container {
	display: grid;
	height: 100%;
	color: red;
	place-items: center;
}
</style>
