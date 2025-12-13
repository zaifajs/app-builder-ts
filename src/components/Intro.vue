<template>
	<div class="align-center">
		<transition name="fade">
			<div class="intro">
				<div class="splash-screen">
					<picture>
						<source srcset="../assets/splash-screen.png 1x, ../assets/splash-screen@2x.png 2x">
						<img src="../assets/splash-screen.png" alt="">
					</picture>
				</div>
				<div class="intro-content">
					<div class="user-name">
						Olá,
					</div>
					<h2 class="intro-text">
						Vamos encontrar o
						<span>tipo de App que procura?</span>
					</h2>
					<p class="sub-text">
						Através de uma série de questões breves, a plataforma
						Fidelidade App Builder descobre que tipo de app procura.
					</p>
					<el-button @click.native="Intro()" text="Iniciar" large />
				</div>
			</div>
		</transition>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import {EventBus} from '@/Events.ts';
import ElButton from '@/components/ElButton.vue';

export default Vue.extend ({
	name: 'Intro',
	components: {
		ElButton
	},
	methods: {
		Intro() {
			EventBus.$emit('continue', {'pageName': 'QusItems', 'itemIndex': null});
		}
	}
});
</script>

<style lang="scss" scoped>
@use "../assets/sass/media" as *;
@use "../assets/sass/config" as *;

.intro {
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	height: 100%;
	min-height: 100%;
	overflow: hidden;

	.intro-container {
		height: 100%;
		width: 100%;
		position: relative;
	}

	.splash-screen {
		display: flex;
		flex-basis: 50rem;
		justify-content: center;
		flex-wrap: wrap;

		img {
			min-width: 100%;
		}

		@include max-screen($medium) {
			img {
				max-width: 35rem;
			}
		}
	}
	.intro-content {
		flex-basis: 70rem;
		justify-content: center;
		text-align: center;

		.user-name {
			font-size: 3rem;
			font-weight: 300;
		}
		.intro-text {
			font-size: 4rem;
			letter-spacing: .3rem;
			text-transform: uppercase;
			font-weight: 300;
			line-height: 5.5rem;
			margin: 6rem 0 4rem;


			span {
				display: block;
				font-weight: 600;
			}
			@include max-screen($medium) {
				line-height: 4rem;
				margin: 4rem 0 2rem;
			}
		}
		.sub-text {
			font-size: 1.8rem;
			line-height: 2.5rem;
			max-width: 60rem;
			display: block;
			margin: 3rem auto 8rem;
		}
		::v-deep .el-button {
			margin: 4rem auto;
		}
	}
}
</style>
