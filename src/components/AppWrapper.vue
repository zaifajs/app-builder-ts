<template>
<transition name="fade">
	<div class="app-wrapper">

		<Welcome v-if="pageName === 'Welcome'" />

		<transition name="fade">
			<Intro v-if="pageName === 'Intro'" />
		</transition>

		<transition name="fade">
			<QusItems v-if="pageName === 'QusItems'" />
		</transition>

		<transition name="fade">
			<Cards
					v-if="pageName === 'Cards'"
					:itemIndex="itemIndex"
			/>
		</transition>

		<transition name="fade">
		<Result
			v-if="pageName === 'Result'"
			:selected="itemIndex" :userResponse="ansData"
		/>
		</transition>

	</div>


</transition>
</template>

<script lang="ts">
import Vue from 'vue';
import {EventBus} from '@/Events.ts';

import Intro from '@/components/Intro.vue';
import QusItems from '@/components/QusItems.vue';
import Cards from '@/components/Cards.vue';
import Result from '@/components/Result.vue';
import Welcome from '@/components/Welcome.vue';


export default Vue.extend({
	name: 'AppWrapper',
	components: {
		Intro,
		QusItems,
		Cards,
		Result,
		Welcome
	},
	data() {
		return {
			pageName: 'Welcome',
			itemIndex: undefined,
			ansData: undefined
		}
	},
	mounted() {
		EventBus.$on('continue', (data: any) => {
			if (data.pageName) {
				this.pageName = data.pageName;
				this.itemIndex = data.itemIndex;
			}
			if (data.child) {
				this.ansData = data.child
			}
		});
	},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@use "../assets/sass/media" as *;
@use "../assets/sass/config" as *;

.app-wrapper {
	display: flex;
	position: relative;
	min-height: fit-content;
	max-width: calc(100% - 6rem);
	padding-top: 6.1rem;
	left: 6rem;
	flex: 1;
	background: linear-gradient(155.54deg, #FFFFFF 0%, #D8D8D8 100%);
	@include max-screen($medium) {
		padding-top: 0;
	}
}
</style>
