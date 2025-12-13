<template>
	<div class="qus-items">

		<div class="display-response">
			<transition-group name="fade" tag="ul">
					<li
						v-for="(picked, pickedIndex) in pickedList"
						:key="pickedIndex + 0"
					>
						{{picked.message}}
					</li>
			</transition-group>
		</div>

		<div class="qus-wrapper align-center">
				<div class="item-list">
					<transition name="fade">
						<div
							class="single-item"
							:key="stepIndex"
						>
							<div class="title-wrapper">
								<h2>
									{{ stepObj.subtitle }}
									<span>{{ stepObj.title }}</span>
								</h2>
							</div>

							<label
								v-for="(question, questionIndex) in stepObj.children"
								:key="questionIndex"
								:class="[
									'label',
									picked === questionIndex ? '-selected' : null
								]"
							>

								{{ question.title }}

								<input
									type="radio"
									:id="questionIndex"
									:name="questionIndex"
									:value="questionIndex"
									v-model="picked"
								>

								<!-- <span class="tick-oval"> </span> -->

							</label>
						</div>
					</transition>
				</div>

				<el-button
					v-if="stepIndex === qus.length - 1"
					@click.native="next()"
					text="Submeter"
					:disabled="!canSubmit"
					large
				/>

				<a
					v-if="stepIndex > 0"
					href="#"
					@click="prev()"
					class="prev"
				>
					<svg width="33" height="59">
						<path d="M30 3L4 29.5 30 56" stroke="#EE2429" stroke-width="5" fill="none" fill-rule="evenodd" stroke-linecap="round"/>
					</svg>
				</a>

		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { EventBus } from '@/Events.ts';
import ElButton from '@/components/ElButton.vue';

export default Vue.extend ({
	name: 'QusItems',
	components: {
		ElButton
	},
	data() {
		return {
			canSubmit: true,
			stepIndex: 0,
			picked: null as any,
			pickedList: [] as any[],
			qus: [
				{
					title: 'exclusiva para clientes?',
					subtitle: 'é uma app',
					message: 'exclusiva para clientes',
					children: [
						{ title: 'Sim'},
						{ title: 'Não',
							response: [ { target: 3 } ]
						}
					]
				},
				{
					title: 'ativar cobertura?',
					subtitle: 'serve para',
					message: 'Ativa coberturas',
					children: [
						{ title: 'Sim'},
						{ title: 'Não',
							response: [ { target: 2 } ]
						}
					]
				},
				{
					title: 'gerir as apólices?',
					subtitle: 'serve para',
					message: 'exclusiva para clientes',
					children: [
						{ title: 'Sim',
							response: [ { target: 0 } ]
						},
						{ title: 'Não',
							response: [ { target: 1 } ]
						}
					]
				}
			]
		}
	},
	computed: {
		stepObj(): any {
			return this.qus[this.stepIndex];
		},
		itemIndex(): any {
			return this.stepObj.children[this.picked].response[0].target;
		},
		isLastItem(): boolean {
			return this.picked !== null &&
			this.stepIndex === this.qus.length - 1;
		},
		isMiddleItems(): boolean {
			return this.picked !== null &&
			this.stepIndex < this.qus.length - 1;
		},
		userResponse(): boolean {
			return this.picked === 1 ? true : false;
		}
	},
	methods: {
		prev() {
			this.stepIndex--
			this.pickedList.pop();
			this.picked = null
		},
		next() {

			if (this.isLastItem) {

				this.pickedList.push(
					{
						message: this.qus[this.stepIndex].message,
						response: this.userResponse
					}
				);

				EventBus.$emit('continue',
					{
						'pageName': 'Cards',
						'itemIndex': this.itemIndex,
						'child': [...this.pickedList]
					},
				);
			}

			this.picked = null
		}
	},
	watch: {
		picked() {

			if (this.isMiddleItems) {

				this.pickedList.push(
					{
						message: this.qus[this.stepIndex].message,
						response: this.userResponse
					}
				);

				if (this.userResponse) {
					EventBus.$emit('continue',
						{
							'pageName': 'Cards',
							'itemIndex': this.itemIndex,
							'child': [...this.pickedList]
						}
					);

				} else if (!this.userResponse) {
					this.stepIndex++
				}

				this.picked = null;

			}

			this.canSubmit = this.picked !== null;
		}
	}
});
</script>

<style lang="scss" scoped>
@use "../assets/sass/media" as *;
@use "../assets/sass/config" as *;

$borderWidth: .6rem;
$height: 2rem;
$width: 1.3rem;
$box-shadow: 0 3rem 2rem 0 rgba(0,0,0,0.1);

.qus-items {
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: relative;

	.display-response {
		position: absolute;
		top: 6rem;
		left: 50%;
		transform: translateX(-50%);

		ul {
			list-style: none;
			padding: 0;

			li {
				position: relative;
				padding-left: 3.5rem;
				font-size: 1.4rem;
				color: #9B9B9B;
				font-weight: 600;
				letter-spacing: .1rem;
				line-height: 3rem;
				text-transform: uppercase;
				margin: .8rem 0;

				&:before {
					position: absolute;
					top: 0;
					left: 0;
					content: ' ';
					width: 2.4rem;
					height: 2.4rem;
					background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cpath d='M20.445 20.445c-4.673 4.678-12.259 4.678-16.937 0-4.677-4.678-4.677-12.259 0-16.937 4.678-4.677 12.26-4.677 16.937 0 4.678 4.678 4.678 12.26 0 16.937zM9.685 14.35l-3.158-3.213-1.395 1.445 4.603 4.61 9.514-9.88-1.395-1.445-8.168 8.483z' fill='%23EE2429' fill-rule='nonzero'/%3E%3C/svg%3E");
					background-repeat: no-repeat;
					background-size: 2.4rem 2.4rem;
				}

			}
		}
	}
	.qus-wrapper {
		padding: 1.8rem 0;
		flex-direction: column;

		@include screen($medium, $large) {
			justify-content: flex-start;
			padding-top: 20rem;
			padding-bottom: 5rem;
		}

		@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
			padding-top: 20rem;
		}

		.item-list {
			display: flex;
			justify-content: center;
			position: relative;

			.single-item {

				.title-wrapper {
					@include title
				}

				label {
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 5rem;
					margin: 2rem auto;
					height: 10rem;
					width: 29.4rem;
					border-radius: .5rem;
					background-color: #FFFFFF;
					box-shadow: 0 0 .3rem 0 rgba(126,151,171,0.23);
					font-size: 1.8rem;
					font-weight: 700;
					text-transform: uppercase;
					cursor: pointer;
					border: .1rem solid transparent;
					transition: border-color .3s linear, box-shadow .3s linear, z-index .3s linear;

					&:active,
					&:focus {
						box-shadow: $box-shadow;
						border-color: $color-main;
						z-index: 1;
					}


					&.-selected {
						box-shadow: $box-shadow;
						border-color: $color-main;
						z-index: 1;
						.tick-oval {
							background-color: $color-main;
							box-shadow: inset 0 0 .3rem 0 $color-main;
							&:before {
								border-bottom: $borderWidth solid white;
								border-right: $borderWidth solid white;
							}
						}
					}
					&:focus-within,
					&:hover:not(.-selected) {
						box-shadow: $box-shadow;
						z-index: 1;
					}
					&:focus-within {
						border-color: $color-main;
					}

					/* .tick-oval {
						position: relative;
						min-height: 40rem;
						min-width: 40rem;
						border-radius: 50%;
						background-color: #F2F5F8;
						box-shadow: inset 0 0 3rem 0 #C9D2D7;
						&:before {
							position: absolute;
							content: '';
							display: block;
							height: $height;
							width: $width;
							border-bottom: $borderWidth solid transparent;
							border-right: $borderWidth solid transparent;
							transform: translateY(-60%) translateX(-50%) rotate(45deg);
							top: 50%;
							left: 50%;
						}
					} */

					input[type="radio"] {
						opacity: 0;
						position: absolute;
						z-index: -1;

						/* &:checked ~ .tick-oval {
							background-color: $color-main;
							box-shadow: inset 0 0 3rem 0 $color-main;
							&:before {
								border-bottom: $borderWidth solid white;
								border-right: $borderWidth solid white;
							}
						} */
					}
				}
			}
		}
		::v-deep .el-button {
			position: relative;
			top: 2.5rem;
		}
		.prev {
			position: absolute;
			top: 50%;
			left: 10%;

			opacity: .5;
			transition: opacity .1s ease-in-out;

			&:hover {
				opacity: 1;
			}
		}

	}
}
</style>
