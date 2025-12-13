<template>

	<div class="result">

		<div class="breadcrumb">
			<span> Tipos de Apps </span>
			<svg width="8" height="12">
				<path d="M1 1l5 5-5 5" stroke="#979797" stroke-width="2" fill="none" fill-rule="evenodd" />
			</svg>
			<span> {{ selectedJson.title }} </span>
		</div>

		<div class="product-details">

			<div class="panel-left">
				<img :src="selectedJson.props.splashUrl" alt="">
			</div>

			<div class="panel-right">
				<h3 class="product-title">
					{{ selectedJson.title }}
				</h3>
				<p class="product-description">
					{{ selectedJson.props.description }}
				</p>
				<div class="product-meta">
					<p>
						Branding:
						<span>{{ selectedJson.props.branding }} </span>
					</p>
					<p>
						Tipologia de utilizadores:
						<span>{{ selectedJson.props.tipologia }}</span>
					</p>
					<p>
						Exemplo:
						<span> {{ selectedJson.props.exemplo }}</span>
						<img :src="selectedJson.props.exemploThumb">
					</p>
				</div>
			</div>
		</div>

		<div class="top-level-cat">
			<a
				href="#"
				@click="activeTab = 1"
				:class="{ '-active' : activeTab === 1}"
			>
				User experience (ux)
			</a>
			<a
				href="#"
				@click="activeTab = 2"
				:class="{ '-active' : activeTab === 2}"
			>
				User interface (UI)
			</a>
		</div>

		<div class="tab-container">
			<div v-if="activeTab === 1 || activeTab === 2">
				<div class="cat-wrapper">
					<a
						href="#"
						v-for="(tab, tabIndex) in selectedJson.children" v-bind:key="tabIndex"
						v-bind:class="[
							'cat-tab',
							tabIndex === selectedTabIndex ? '-current' : null
						]"
						v-on:click="switchTab(tabIndex)">

						<span>{{ tab.title }}</span>
					</a>
				</div>

				<div
					class="tab-wrapper"
					v-if="selectedTabIndex !== 3"
				>
					<div class="left-tab">

						<a
							v-for="(category, categoryIndex) in selectedTabObject.children"
							v-bind:key="categoryIndex"
							v-bind:class="{
								'-tab': 'tab',
								'-current': categoryIndex == selectedCategoryIndex }"
							v-on:click="switchCategory(categoryIndex), scrollBoom()"
						>

							<h3> {{ category.title }} </h3>

							<p
								class="sub-tab -indent"
								v-for="(sub, subIndex) in category.children" v-bind:key="subIndex">
								{{ sub.title }}
							</p>

						</a>

					</div>

					<!-- ref for smoth scroll -->
					<div class="right-tab" ref="scrollable">

						<h2 class="tab-title">
							{{ selectedCategoryObject.title }}
						</h2>

						<div class="content-wrapper">

							<div
								class="-indent"
								v-for="(field, index) in selectedCategoryObject.children"
								v-bind:key="index"
							>

								<h3 class="sub-title">

									{{ field.title }}

									<span v-if="field.importance">
										[{{ field.importance }}]
									</span>
								</h3>

								<div
									class="-indent -block"
									v-if="field.props"
								>
									<h5
										class="-indent comon-title -mt-30" v-if="field.importance"
									>
										What is
									</h5>

									<p
										:class="[
											'details',
											field.importance ? '-indent -light' : null
										]"
									>
										{{ field.props.description }}
									</p>

									<p
										v-if="!userResponse[0].ans"
										:class="[
											'details',
											field.importance ? '-indent -light' : null
										]"
									>
										{{ field.props.descriptionnonclient }}
									</p>
									<p
										v-if="userResponse[0].ans"
										:class="[
											'details',
											field.importance ? '-indent -light' : null
										]"
									>
										{{ field.props.descriptionclient }}
									</p>

									<h5
										:class="[
											'-indent comon-title',
											field.importance ? '-mt-30' : null
										]"
										v-if="field.props.components"
									>
										Components
									</h5>

									<ul class="component-list">
										<li
											class="-indent"
											v-for="(prop, index) in field.props.components"
											v-bind:key="index">
											{{ prop }}
										</li>
									</ul>

								</div>

								<div
									class="-double-indent -block"

									v-else-if="field.children"

									v-for="(child, index) in field.children"
									v-bind:key="index"
								>
									<h3 class="comon-title">
										{{ child.title }}
									</h3>


									<p class="details -light">
										{{ child.props.description }}
									</p>

									<div class="-indent">
										<h5
											v-if="child.props.components" 		class="-indent comon-title"
										>
											Components
										</h5>

										<ul class="component-list">
											<li
												class="-indent"
												v-for="(comp, index) in child.props.components"
												v-bind:key="index"
											>
												{{ comp }}
											</li>

										</ul>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					class="tech-specs"
					v-if="selectedTabIndex == 3"
				>
					<div class="header-wrapper flex-table">

						<div
							v-for="header in selectedTabObject.headers"
							:key="header.id"
							class="header-text"
						>
							{{ header.text }}

							<span v-if="header.subtext">
								{{ header.subtext }}
							</span>

						</div>

					</div>

					<div
						v-for="data in selectedTabObject.data"
						:key="data.id"
						class="data-wrapper flex-table"
					>
						<div class="data-label">
							{{ data.label }}
						</div>

						<div class="data-outsystem">
							<div
								v-for="out in data.outsystem"
								:key="out.id"
								:class="[
									out.link ? '-margin-bottom' : null
								]"
							>
								<span
									:class="[
										'link-text',
										out.link ? '-bold' : null
									]"
								>
									{{ out.text }}
								</span>

								<a
									class="link-url"
									v-if="out.link"
									:href="out.link"
									target="_blank">
									({{out.link}})
								</a>
							</div>
						</div>

						<div> <span>{{ data.native }}</span> </div>
					</div>

				</div>
			</div>
		</div>

	</div>

</template>

<script lang="ts">
import Vue from 'vue';
import {EventBus} from '@/Events.ts';

import product from '@/jsons/product.json';
import proasservice from '@/jsons/proasservice.json';
import service from '@/jsons/service.json';
import beyond from '@/jsons/beyond.json';


export default Vue.extend ({
	name: 'Result',
	data() {
		return {
			activeTab: 1,
			product,
			proasservice,
			service,
			beyond,
			selectedTabIndex: 0,
			selectedCategoryIndex: 0,
		}
	},
	props: {
		userResponse: {
			type: Array as ()=> any[],
			default: null
		},
		selected: {
			type: Number,
			default: null
		},
	},
	computed: {
		selectedJson(): any {
			switch (this.selected) {
			case 1:
				return this.proasservice;
			case 2:
				return this.service;
			case 3:
				return this.beyond;
			default:
				return this.product;
			}
		},
		selectedTabObject(): any {
			return this.selectedJson.children[this.selectedTabIndex];
		},
		selectedCategoryObject(): any {
			return this.selectedTabObject.children[this.selectedCategoryIndex];
		}
	},
	mounted() {
		window.addEventListener('scroll', this.onScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.onScroll);
	},
	methods: {
		switchTab(index: number): any {
			this.selectedTabIndex = index;
			this.selectedCategoryIndex = 0;
		},
		switchCategory(index: number): any {
			this.selectedCategoryIndex = index;
		},
		scrollBoom() {
			const scrollable = this.$refs.scrollable as HTMLElement;
			scrollable.scrollTop = 0;
		},
		onScroll() {
			let header = document.querySelector(".top-bar");

			if (header) {
				if (window.scrollY > 200 && !header.className.includes('--bar-transparent')) {
					header.classList.add('--bar-transparent');
				} else if (window.scrollY < 200) {
					header.classList.remove('--bar-transparent');
				}
			}
		}
	}
});
</script>

<style lang="scss" scoped>
@use "../assets/sass/media" as *;
@use "../assets/sass/config" as *;

	.result {
		width: 100%;
		padding-top: 3rem;

		display: flex;
		flex-direction: column;

		.breadcrumb {
			margin-left: 5.5rem;

			span {
				font-size: 1.4rem;
				text-transform: capitalize;

				&:first-of-type {
					color: #717171;
					font-weight: 300;
				}

				&:last-of-type {
					color: #717171;
					font-weight: 500;
				}
			}

			svg {
				margin: 0 1rem;
			}
		}

		.product-details {
			display: flex;
			justify-content: flex-start;
			width: 73.5rem;

			@include max-screen($small) {
				max-width: 70rem;
			}

			margin: 4rem auto 5rem;

			.panel-left {
				flex: 0 0 15rem;
				justify-content: center;
				margin-right: 5rem;

				img {
					max-width: 100%;
					height: auto;
				}
			}

			.panel-right {

				.product-title {
					color: #7E7E7E;
					text-transform: uppercase;
					font-size: 3rem;
					font-weight: 300;
					letter-spacing: .3rem;
					line-height: 6rem;
					margin: 0 0 1rem;
				}

				.product-description {
					font-size: 1.6rem;
					font-weight: 500;
					line-height: 2.5rem;
					margin-bottom: 2rem;
				}

				.product-meta {
					p {
						display: flex;
						font-size: 1.3rem;
						font-weight: 300;
						line-height: 2.5rem;
						padding-right: .3rem;

						img {
							margin-left: .5rem;
						}

						span {
							padding-left: .5rem;
							padding-right: .3rem;
							font-weight: 500;
						}
					}
				}
			}
		}
		.top-level-cat {
			display: flex;

			a {
				display: flex;
				flex: 1 1 0;
				justify-content: center;
				padding: 3rem;

				color: inherit;

				font-size: 1.8rem;
				text-decoration: none;
				font-size: 1.8rem;
				font-weight: 300;
				text-transform: uppercase;

				letter-spacing: .3rem;
				border-top-right-radius: 2rem;
				border-top-left-radius: 2rem;
				background-color: transparent;

				transition: background-color .1s linear, box-shadow .1s linear;

				&.-active,
				&:hover {
					box-shadow: 1rem -1rem 2rem 0 rgba(0,0,0,0.03);
					background-color:#F8F8F8;
					z-index: 2;
				}
				&.-active {
					font-weight: 600;
				}

				pointer-events: none;

				&:first-of-type {
					pointer-events: auto;
				}
			}
		}
		.tab-container {
			background: #fff;
			flex: 1;

			scroll-behavior: smooth;
			/* position: sticky;
			top: 0; */


			.cat-wrapper {
				display: flex;
				justify-content: flex-start;
				box-shadow: 1rem -1rem 2rem 0 rgba(0,0,0,0.03);
				background-color: #F8F8F8;

				.cat-tab {
					padding: 0 8rem;
					height: 100%;
					display: inline-block;

					&:nth-child(3) {
						pointer-events: none;
					}

					span {
						color: #848484;
						font-size: 1.6rem;
						font-weight: 300;
						letter-spacing: .3rem;
						text-transform: uppercase;

						padding: 3rem 0;
						display: flex;
						position: relative;
					}

					@include max-screen($medium) {
						padding: 0 3.5rem;

						span {
							letter-spacing: .2rem;
						}
					}

					&.-current span {
						font-weight: 600;
						color: #2C363E;


						&:after {
							content: '';
							position: absolute;
							bottom: 0;
							left: 50%;
							transform: translateX(-50%);
							height: .4rem;
							border-radius: .2rem;
							width: calc(100% + 1rem);
							background-color: $color-main;
						}
					}
				}
			}

			.tab-wrapper {
				display: flex;

				.left-tab {
					flex: 0 0 35%;
					overflow-x: hidden;
					overflow-y: auto;
					position: sticky;
					top: 0;
					min-height: 100vh;
					padding-top: 5rem;
					background-color: #F9F9F9;
					border-right: .1rem solid rgba(126,126,126,0.2);

					&::-webkit-scrollbar {
						width: .5rem;
					}

					&::-webkit-scrollbar-thumb {
						background: rgba(126,126,126,0);
					}

					&:hover {
						&::-webkit-scrollbar-thumb {
							background: rgba(126, 126, 126, 0.116);;
						}
					}

					.-tab {
						display: block;
						padding: 2rem 1rem 4rem 6rem;

						cursor: pointer;
						font-size: 1.6rem;
						color: #7E7E7E;

						h3 {
							font-size: 1.6rem;
							font-weight: 500;
							margin-bottom: 2.5rem;
							margin-top: 0;
						}

						.sub-tab {
							font-size: 1.6rem;
							font-weight: 400;
							padding: .8rem 0;
						}

						&.-current {
							position: relative;

							h3 {
								font-weight: 600;
								color: $color-main;
							}

							.sub-tab {
								font-weight: 600;
								color: #2C363E;
							}

							&:after {
								content: '';
								position: absolute;
								display:inherit;
								height: 100%;
								width: .4rem;
								top: 0;
								right: 0;
								background-color: $color-main;
								border-radius: .2rem;
							}
						}
					}
				}

				.right-tab {
					background-color: #fff;
					padding-top: 6.5rem;
					padding-left: 11rem;
					padding-right: 5rem;

					scroll-behavior: smooth;

					overflow-x: hidden;
					overflow-y: auto;
					position: sticky;
					top: 0;
					max-height: 100vh;
					width: 100%;


					@include max-screen($medium) {
						padding-top: 4.5rem;
						padding-left: 4rem;
					}


					.tab-title {
						font-weight: 600;
						font-size: 3rem;
					}

					.content-wrapper {
						max-width: 75rem;
						margin: 4rem 0;

						.sub-title {
							font-weight: 400;
							font-size: 2rem;
							padding: .8rem 0;
							span {
								font-size: 60%;
							}
						}
						.details {
							font-size: 1.6rem;
							font-weight: 400;
							line-height: 2.3rem;
							padding: .8rem 0;
							//white-space: pre-line;
						}
						.comon-title {
							font-size: 1.6rem;
							font-weight: 500;
						}
						ul.component-list {
							list-style: none;
							padding: 0;
							li {
								display: block;
								font-size: 1.6rem;
								font-weight: 300;
								line-height: 2.5rem;
							}
						}
						.-block {
							margin-bottom: 4rem;
						}
						.-light {
							font-weight: 300;
						}
						.-mt-30 {
							margin-top: 3rem;
						}
					}
				}


				.-indent {
					margin-left: 3rem;
				}
				.-double-indent {
					margin-left: 6rem;
				}
			}
			.tech-specs {
				display: flex;
				flex-direction: column;
				padding: 2.5rem;

				.header-wrapper {
					display: flex;
					background-color: #ECECEC;

					.header-text {
						text-align: center;
						font-size: 2rem;
						font-weight: bold;
						font-family: 'Azo Sans';
						letter-spacing: 0.05rem;
						text-transform: uppercase;

						> span {
							display: block;
							font-size: 1.4rem;
							font-weight: 400;
						}
					}
				}
				.data-wrapper {
					display: flex;
					position: relative;
					z-index: 1;
					background-color: #fff;
					box-shadow: 0 3rem 2rem 0 rgba(0,0,0,0.1);

					.data-label {
						font-size: 2rem;
						font-weight: 500;
					}

					.data-outsystem {
						> div {
							&.-margin-bottom {
								margin-bottom: 2rem;
							}
							.link-text {
								display: block;

								&.-bold {
									font-weight: 400;
								}
							}
							.link-url {
								padding-bottom: 1.5rem;
							}
						}
					}

					> div:not(:first-child) {
						padding-right: 3rem;
						a, span {
							line-height: 2.5rem;
							font-size: 1.4rem;
						}
					}

					&::after {
						position: absolute;
						content: '';
						height: calc(100% - 3rem);
						width: .5rem;
						background: #D8D8D8;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						z-index: 0;
						border-radius: .4rem;
						transition: background-color .2s linear;
					}
				}

				.flex-table {
					display: flex;
					width: 100%;
					border-radius: .5rem;
					margin-top: .6rem;
					margin-bottom: .6rem;
					transition: transform .2s linear;

					&:hover {
						&:not(:first-child) {
							transform: scale(1.01);
						}

						&::after {
							background-color: $color-main;
						}
					}

					> div {
						padding-top: 3.5rem;
						padding-bottom: 2.5rem;
						flex: 2;
					}

					> div:first-child {
						flex: 1;
						text-align: center;
					}
				}
			}
		}
	}
</style>
