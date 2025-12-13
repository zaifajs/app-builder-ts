<template>
	<div class="align-center">
		<div class="welcome">
			<div class="welcome-container">
				<div class="circle-wrapper">
					<div class="circle-one -circle">
						<svg class="circle">
							<circle class="outlined" cx="50%" cy="50%" r="49.9%"></circle>
						</svg>
						<span class="bubble -myfid">MyFidelidade</span>
					</div>
					<div class="circle-two -circle">
						<svg class="circle">
							<circle class="outlined" cx="50%" cy="50%" r="49.9%"></circle>
						</svg>
						<span class="bubble -care">MyMulticare</span>
						<span class="bubble -save">MySavings</span>
					</div>
					<div class="circle-three -circle">
						<svg class="circle">
							<circle class="outlined" cx="50%" cy="50%" r="49.9%"></circle>
						</svg>
						<span class="bubble -assi">Fidelidade<br>Assistance</span>
						<span class="bubble -medic">Medicina<br>Online</span>
					</div>
					<div class="circle-four -circle">
						<svg class="circle">
							<circle class="outlined" cx="50%" cy="50%" r="49.9%"></circle>
						</svg>
						<span class="bubble -drive">FidelidadeDrive</span>
						<span class="bubble -smart">Smart<br>Drive</span>
						<span class="bubble -faus">Faustudo</span>
						<span class="bubble -pets">MyPets</span>
					</div>
					<div class="circle-center">
						<img src="../assets/logo-center.svg" />
					</div>
				</div>
			</div>

			<div class="welcome-content">
				<h2 class="intro-text">
					Bem vindo ao
					<span>Fidelidade App Builder</span>
				</h2>
				<p class="sub-text">
					O Fidelidade App Builder é uma plataforma que promove a coerência entre as aplicações mobile de seu ecossistema.
				</p>
				<el-button @click.native="Intro()" text="Iniciar" large />
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import {EventBus} from '@/Events.ts';
import ElButton from '@/components/ElButton.vue';

export default Vue.extend ({
	name: 'Welcome',
	components: {
		ElButton
	},
	methods: {
		Intro() {
			EventBus.$emit('continue', {'pageName': 'Intro', 'itemIndex': null});
		}
	}
});
</script>

<style lang="scss" scoped>
@import "../assets/sass/media";
@import "../assets/sass/config";

.welcome {
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	height: 100%;
	min-height: 100%;
	overflow: hidden;
	position: relative;

	.welcome-container {

		height: 100%;
		width: 100%;
		position: relative;



		.circle-wrapper {
			height: 100vh;
			width: 100%;
			margin-top: -9vh;
			position: relative;

			display: flex;
			justify-content: center;
			align-items: center;

			.-circle {
				position: absolute;
				// IE support
				top: 50%;
				left: 50%;
				transform: translateY(-50%) translateX(-50%);

				@for $i from 1 through 4 {
				&:nth-child(#{$i}) .circle {
						animation-delay: $i * 0.05s;
					}
				}
				@for $i from 1 through 4 {
				&:nth-child(#{$i}) .bubble {
						animation-delay: $i * 0.15s + 1s;
					}
				}
			}

			.bubble {
				position: absolute;
				display: flex;
				justify-content: center;
				text-align: center;
				align-items: center;
				border-radius: 50%;
				opacity: 0;
				width: 6rem;
				height: 6rem;
				font-size: 1rem;
				font-weight: 500;
				background: #fff;
				box-shadow: 0 .1rem .1rem 0 rgba(0,0,0,0.11);
				opacity: 0;
				transform: scale(0);

				animation: popsup .3s ease-in-out forwards;
				transform-origin: center;

				@keyframes popsup {
					to {
						opacity: 1;
						transform: scale(1);
					}
				}
			}
			.circle {
				height: 100%;
				width: 100%;

				.outlined {
					fill: transparent;
					stroke-width: 1;
					stroke: $color-main;
					stroke-dasharray: 10;
					stroke-dashoffset: 10;
				}
			}
			.circle,
			.circle-center {
				animation: boom 1s ease-in-out forwards;
				transform-origin: center;
				opacity: 0;
			}
			@keyframes boom {
				0% {
					transform: scale(0);
				}
				70% {
					transform: scale(1.1);
				}
				100% {
					opacity: 1;
					transform: scale(1);
				}
			}
			.circle-four {
				height: 95vh;
				width: 95vh;

				.circle {
					.outlined {
						//stroke: red;
						opacity: 0.2;
					}
				}
				.bubble {
					&.-drive {
						width: 8rem;
						height: 8rem;
						left: 4vh;
						top: 15vh;
					}
					&.-smart {
						top: auto;
						left: -15vh;
						bottom: 25vh;
					}
					&.-faus {
						left: auto;
						right: -8vh;
						top: 12vh;
					}
					&.-pets {
						width: 5rem;
						height: 5rem;
						left: auto;
						right: -1vh;
						top: 60vh;
					}
				}

				// ipad portrail and bellow

				@include max-screen($small) {
					height: 70vh;
					width: 70vh;

					.bubble {
						&.-drive {
							width: 7rem;
							height: 7rem;
							top: 8vh;
						}
						&.-pets {
							right: 3vh;
							top: 50vh;
						}
					}
				}
				@include ipad(portrait) {
					height: 70vh;
					width: 70vh;

					.bubble {
						&.-drive {
							left: 4vh;
							top: 10vh;
						}
						&.-pets {
							right: 6vh;
							top: 55vh;
						}
					}
				}
				@include ipad(landscape) {
					height: 85vh;
					width: 85vh;

					.bubble {
						&.-drive {
							left: 4vh;
							top: 12vh;
						}
						&.-pets {
							right: 2vh;
						}
					}
				}
			}
			.circle-three {
				height: 80vh;
				width: 80vh;

				.outlined {
						//stroke: lightseagreen;
						opacity: 0.4;
				}

				.bubble {
					&.-assi {
						left: -3vh;
						top: 30vh;
					}
					&.-medic {
						left: auto;
						right: 12vh;
						top: 6vh;
					}
				}

				// ipad portrail and bellow

				@include max-screen($small) {
					height: 55vh;
					width: 55vh;

					.bubble {
						&.-medic {
							height: 6rem;
							width: 6rem;
							top: 0;
						}
					}
				}
				@include ipad(portrait) {
					height: 55vh;
					width: 55vh;

					.bubble {
						&.-medic {
							top: 2vh;
						}
					}
				}
				@include ipad(landscape) {
					height: 70vh;
					width: 70vh;

					.bubble {
						&.-medic {
							top: 2vh;
						}
					}
				}


			}
			.circle-two {
				height: 65vh;
				width: 65vh;

				.outlined {
					opacity: 0.6;
				}
				.bubble {
					&.-care {
						left: -3vh;
						top: 38vh;
					}
					&.-save {
						height: 7rem;
						width: 7rem;
						left: auto;
						right: 0;
						top: 15vh;
					}
				}

				// ipad portrail and bellow

				@include max-screen($small) {
					height: 40vh;
					width: 40vh;

					.bubble {
						&.-care {
							left: 2vh;
							top: 30vh;
						}
						&.-save {
							height: 5rem;
							width: 5rem;
							right: -3vh;
						}
					}
				}

				@include ipad(portrait) {
					height: 40vh;
					width: 40vh;

					.bubble {
						&.-care {
							left: 2vh;
							top: 30vh;
						}
						&.-save {
							right: -2vh;
						}
					}
				}

				@include ipad(landscape) {
					height: 55vh;
					width: 55vh;
					.bubble {
						&.-care {
							left: -3vh;
							top: 30vh;
						}
						&.-save {
							right: -2vh;
						}
					}
				}


			}
			.circle-one {
				height: 50vh;
				width: 50vh;

				.outlined {
					opacity: 0.8;
						//stroke: $color-main;
				}
				.bubble {
					&.-myfid {
						height: 10rem;
						width: 10rem;
						left: 5vh;
						top: 0;
					}
				}
				// ipad portrail and bellow
				@include max-screen($small) {
					height: 25vh;
					width: 25vh;

					.bubble {
						&.-myfid {
						height: 7rem;
						width: 7rem;
						left: 0;
						}
					}
				}

				@include ipad(portrait) {
					height: 25vh;
					width: 25vh;

					.bubble {
						&.-myfid {
							height: 8rem;
							width: 8rem;
							left: 2vh;
						}
					}
				}
				@include ipad(landscape) {
					height: 40vh;
					width: 40vh;
					.bubble {
						&.-myfid {
							height: 7.5rem;
							width: 7.5rem;
							left: 4vh;
						}
					}
				}
			}
			.circle-center {
				height: 20vh;
				width: 20vh;
				background: $color-main;
				border-radius: 50%;

				display:flex;
				justify-content: center;
				align-items: center;

				/*	// IE support
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateY(-50%) translateX(-50%); */

				img {
					margin-top: 1rem;
				}



				// ipad portrail and bellow

				@include max-screen($medium) {
					img {
						width: 80%;
					}
				}
				@include max-screen($small) {
					height: 12vh;
					width: 12vh;
					img {
						width: 60%;
					}
				}
				@include ipad(portrait) {
					height: 10vh;
					width: 10vh;
					img {
						width: 60%;
					}
				}

				@include ipad(landscape) {
					height: 14vh;
					width: 14vh;
					img {
						width: 70%;
					}
				}

			}
		}
	}

	.welcome-content {

		flex-basis: 70rem;
		justify-content: center;
		text-align: center;
		position: absolute;
		bottom: 0;
		padding-bottom: 3vh;
		left: 0;
		width: 100%;
		height: 50vh;
		background: linear-gradient(rgba(255, 255, 255, 0), hsl(0, 0%, 93%));
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		animation: fade .2s ease-in-out 1.8s forwards;
		opacity: 0;
		@keyframes fade {
			to {
				opacity: 1;
			}
		}

		.intro-text {
			font-size: 4rem;
			letter-spacing: .3rem;
			text-transform: uppercase;
			font-weight: 300;

			padding-top: 1.5rem;
			padding-bottom: 1.5rem;

			margin: 0;
			line-height: 4.5rem;
			span {
				display: block;
				font-weight: 600;
			}
		}
		.sub-text {
			font-size: 1.8rem;
			line-height: 2.5rem;
			max-width: 60rem;
			display: block;

			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
			margin: 0 auto;
		}
		::v-deep .el-button {
			margin: 2.5rem auto;
		}
	}
}
</style>
