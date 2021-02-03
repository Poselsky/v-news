import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		modalState: {
			message: "",
			active: false,
		},
	},
	getters: {
		modalState: (state) => state.modalState,
	},
	mutations: {
		changeModalMessage(state, value: string): void {
			state.modalState.message = value;
		},
		changeModalActivity(state, value: boolean): void {
			state.modalState.active = value;
		},
	},
	actions: {},
	modules: {},
});
