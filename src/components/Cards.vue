<template>
	<div class="cards-wrapper">
		<div class="align-center">

		<div class="title-wrapper">
			<h2>
				Com base no que eu procuro,
				<span>a minha app DEVE SER:</span>
			</h2>
		</div>

			<div class="cards">
					<label
						v-for="(card, cardIndex) in cards"
						v-bind:key="cardIndex"
						:class="[
							'-single-card',
							selected === cardIndex ? '-selected' : null,
							hovered === cardIndex || ( hovered === null && selected === cardIndex) ? '-hovered' : null,
						]"
						@mouseenter="hovered = cardIndex"
						@mouseleave="hovered = null"
					>
						<img
							class="card-icon"
							:src="card.iconUrl"
						>

						<div class="inside-container">
							<span class="card-title">
								{{ card.name }}
							</span>

							<span class="card-description">
								{{ card.description }}
							</span>
						</div>

						<input
							type="radio"
							:value="cardIndex"
							:name="card.name"
							v-model="selected"
						>

						<div class="slider">
							<transition-group name="slide" mode="out-in">
							<div
								class="single-slide"
								v-for="(slide, slideIndex) in card.slides"
								:key="slideIndex + cardIndex"
								v-show="slideIndex === slideControlIndex"
							>
								<div class="slide-thumbnail">
									<img :src="slide.thumbUrl" alt="">
								</div>
								<div class="slide-meta">
									<span class="title"> {{ slide.title }} </span>
									<span class="description"> {{ slide.description }} </span>
									<span class="example">
										Exemplo
									</span>
								</div>

								<div
									v-if="card.slides.length > 0"
									class="slide-control"
								>
									<a
										v-if="slideIndex >= 1"
										class="prev"
										@click="prev()"
									>
										<img src="../assets/icon/arrow.svg">
									</a>
									<a
										v-if="slideIndex <
											card.slides.length - 1"
										class="next"
										@click="next()"
									>
										<img src="../assets/icon/arrow.svg">
									</a>
								</div>
								<div class="slide-count">
									{{ slideIndex + 1 }} / {{ card.slides.length }}
								</div>
							</div>
							</transition-group>

						</div>

					</label>
			</div>
			<el-button
				@click.native="confirm()"
				text="Confirmar"
				:disabled="false"
				large
			/>

		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { EventBus } from '@/Events.ts';
import ElButton from '@/components/ElButton.vue';

export default Vue.extend ({
	name: 'Cards',
	components: {
		ElButton
	},
	props: ['itemIndex'],
	data() {
		return {
			slideControlIndex: 0,
			selected: this.itemIndex,
			hovered: this.itemIndex,
			cards: [
				{
					name: 'Product',
					description: 'Uma app Product é onde existe gestão dos produtos e da relação com a Fidelidade',
					iconUrl: require('../assets/icon/product.svg'),
					slides: [
						{
							title: 'MyFidelidade',
							description: 'A app MyFidelidade é uma forma inovadora de gerir os seus seguros.',
							thumbUrl: require('../assets/icon/myfid.png')
						}
					]
				},
				{
					name: 'Product as Service',
					description: 'Uma app Product as a Service permite utilizar coberturas ou serviços de um seguro',
					iconUrl: require('../assets/icon/proasservice.svg'),
					slides: [
						{
							title: 'My Savings',
							description: 'Defina a melhor opção de poupança/investimento para chegar ao objetivo.',
							thumbUrl: require('../assets/icon/mysav.png')
						}
					]
				},
				{
					name: 'Service',
					description: 'Uma app Service é onde estão disponíveis serviços da Fidelidade',
					iconUrl: require('../assets/icon/service.svg'),
					slides: [
						{
							title: 'Medicina Online',
							description: 'A Multicare oferece médicos especialistas através da vídeo consulta.',
							thumbUrl: require('../assets/icon/multi.png')
						},
						{
							title: 'Assistance',
							description: 'Os clientes Fidelidade podem pedir assistência automóvel, em viagem…',
							thumbUrl: require('../assets/icon/assis.png')
						}
					]
				},
				{
					name: 'Beyond Insurance',
					description: 'Uma app Beyond Insurance é para criar awareness e acessível a não clientes.',
					iconUrl: require('../assets/icon/beyond.svg'),
					slides: [
						{
							title: 'Drive',
							description: 'É uma nova forma de conhecer e melhorar os seus comportamentos…',
							thumbUrl: require('../assets/icon/drive.png')
						},
						{
							title: 'My Pets',
							description: 'Desenvolvida por uma equipa de veterinários, e existe para ajudar os…',
							thumbUrl: require('../assets/icon/pet.png')
						}
					]
				}
			]
		}
	},
	methods: {
		confirm(): any {
			EventBus.$emit('continue', {'pageName': 'Result', 'itemIndex': this.selected} );
		},
		next() {
			if (this.slideControlIndex <
			this.cards[this.hovered].slides.length - 1) {
				this.slideControlIndex++
			}
		},
		prev() {
			if (this.slideControlIndex > 0) {
				this.slideControlIndex--
			}
		}
	},
	watch: {
		hovered() {
			this.slideControlIndex = 0
		}
	}
})
</script>

<style lang="scss" scoped>
@use "../assets/sass/media" as *;
@use "../assets/sass/config" as *;

.cards-wrapper {
	display: block;
	min-width: 100%;
	min-height: 100%;
	padding-top: 5rem;
	padding-bottom: 5rem;

	@include ipad {
		padding-bottom: 5rem;
	}


	.align-center {
		flex-direction: column;
	}
	.title-wrapper {

		@include title;

		h2 {
			font-size: 3rem;
			text-transform: inherit;
		}
	}
	.cards {
		display: flex;
		margin: 1.5rem auto;

		flex-wrap: wrap;
		justify-content: center;

		margin-top: 5rem;
		margin-bottom: 14rem;

		height: 35rem;

		@include ipad(landscape) {
			margin-top: 3rem;
			margin-bottom: 8rem;
		}

		@include ipad(portrait) {
			min-height: 65rem;
			max-width: 400px;
		}

		@include max-screen($small) {
			height: auto;
			max-width: 400px;
		}

		@include max-screen($xsmall) {
			height: auto;
			max-width: 300px;
		}

		label {
			&.-single-card {
				display: flex;
				position: relative;
				flex-direction: column;

				cursor: pointer;

				justify-content: flex-start;
				align-items: center;
				text-align: center;

				padding: 1.5rem;
				padding-top: 4.5rem;

				margin: 1.8rem 1.5rem;

				width: 20rem;

				height: 27rem;

				// max-height: 250rem;
				@include ipad(landscape) {
					height: 25rem;
				}

				border-radius: .5rem;
				background-color: #FFFFFF;
				box-shadow: 0 0 .3rem 0 rgba(126,151,171,0.23);
				border: .1rem solid transparent;

				opacity: 0.6;

				transition: all .4s ease-in-out;
				/* transition-property: opacity, transform, max-height, min-height, width; */

				&.-hovered {
					box-shadow: 0 3rem 2rem 0 rgba(0,0,0,0.1);
					transform: scale(1.3);

					height: 33rem;
					width: 22rem;

					margin-left: 5rem;
					margin-right: 5rem;

					@include ipad(landscape) {
						height: 32rem;
						transform: scale(1.3);
					}
					@include max-screen($medium) {
						margin-top: 1.5rem;
						transform: scale(1.1);
						margin-left: 1rem;
						margin-right: 1rem;
						height: 30rem;
						padding-top: 2.5rem;
					}

					opacity: 1;
					z-index: 1;

					.slider {
						left: 0;
						transform: scale(1);
						opacity: 1;
					}

					&:after {
						width: 8rem;
					}

					.inside-container {
						.card-description {
							font-weight: 400;
						}
					}
				}

				&.-selected {
					opacity: 1 !important;
					border: .1rem solid $color-main;

					&:after {
						background-color: $color-main;
					}
				}

				.card-icon {
					height: 4rem;
					width: auto;
					margin-bottom: 1.8px;
				}

				.inside-container {
					display: flex;
					flex-direction: column;
					max-width: 15rem;

					.card-title {
						display: block;
						font-size: 1.6rem;
						font-weight: 600;
						text-transform: uppercase;
						line-height: 2.2rem;
						margin-bottom: 1rem;
						max-width: 18.6rem;
					}
					.card-description {
						max-width: 18.6rem;
						font-size: 1rem;
						font-weight: 300;
						line-height: 1.5rem;
					}
				}

				&:after {
					position: absolute;
					content: '';
					height: .3rem;
					width: 12rem;
					border-radius: .3rem;
					bottom: -.1rem;
					left: 50%;
					transform: translateX(-50%);
					background-color: #7E7E7E;

					transition: width .3s ease-in-out, background-color .3s ease-in-out;
				}

				input[type="radio"] {
					opacity: 0;
					position: absolute;
				}
				.slide-enter-active, .slide-leave-active {
					transition: opacity .2s ease-in-out, transform .2s ease-in-out;
				}

				.slide-enter, .slide-leave-to {
					transform: translateX(-1rem);
					opacity: 0;
				}

				.slider {
					position: relative;
					width: 17rem;
					margin-top: 2rem;

					opacity: 0;

					transition: all .3s .2s ease-in-out;
					transition-property: transform, opacity;
					position: relative;

					.single-slide {
						display: flex;
						position: absolute;
						left: 0;
						width: 100%;

						box-shadow: 0 .5rem 1.5rem 0 rgba(126,151,171,0.2);
						border-radius: .5rem;
						padding: 1rem .5rem .5rem;
						background-color: #FFFFFF;

						.slide-thumbnail {
							margin-right: .8rem;
							img {
								width: 4.2rem;
								height: auto;
							}
						}

						.slide-meta {
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							text-align: left;
							width: 100%;

							.title {
								font-size: 1rem;
								display: block;
								font-weight: 600;
								margin-bottom: .5rem;
							}

							.description {
								display: block;
								max-width: 12rem;
								font-size: .8rem;
								font-weight: 300;
								margin-bottom: .6rem;
							}
							.example {
								font-size: .8rem;
								color: rgba(126,126,126,0.5)
							}
						}

						.slide-control {
							position: absolute;
							left: 0;
							top: 50%;
							width: 100%;

							.prev {
								img {
									position: absolute;
									transform: translateY(-50%);
									left: -1.2rem;
									width: .6rem;
								}

							}
							.next {
								img {
									width: .6rem;
									position: absolute;
									transform: translateY(-50%) rotate(180deg);
									right: -1.2rem;
								}
							}
						}
					}
					.slide-count {
						font-size: .8rem;
						color: rgba(126,126,126,0.5);
						position: absolute;
						bottom: -1.5rem;
						left: 50%;
						transform: translateX(-50%)
					}
				}
			}
		}
	}
}
</style>
