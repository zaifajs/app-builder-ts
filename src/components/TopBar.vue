<template>
	<div class="top-bar">
		<a href="#" @click="intro"><img class="logo-head" src="../assets/logo-head.svg" alt=""></a>
		<!-- <div class="right-wrapper">
			<div class="search-box"/>
			<div class="user">
				<a class="user-avatar">
					<div
						class="user-photo"
						:style="'background-image:url(' + avatar + ')'"
					/>
				</a>
			</div>
		</div> -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {EventBus} from '@/Events.ts';

export default Vue.extend({
	name: 'TopBar',
	props: {
		avatar: {
			type: String,
			description: 'Path for the user\'s photo.',
			default: 'https://source.unsplash.com/ly_qiiXb4mE/100x100'
		}
	},
	methods: {
		intro() {
			EventBus.$emit('continue', {
				'pageName': 'Welcome',
				'itemIndex': null
			});
		}
	}
});
</script>

<style lang="scss" scoped>
@use "../assets/sass/media" as *;
@use "../assets/sass/config" as *;

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: .1rem solid #E6E8F1;
		width: 100%;
		height: 6.1rem;
		background: white;
		z-index: 999;
		position: fixed;
		top: 0;

		transition: all .3s ease-in;

		&.--bar-transparent {
			transform: translateY(-50%);
			opacity: 0;
		}

		@include max-screen($medium) {
			background: transparent;
			border: 0;
		}

		a {
			margin-top: .8rem;
			margin-left: 1.5rem;
			display: block;

			.logo-head {
				max-width: 3rem;
				max-height: 3.6rem;
				border: 0;
			}
		}
		.logo-wrapper {
			display: flex;

			.logo-text {
				display: flex;
				align-items: center;
				font-size: 2.5rem;
				font-weight:400;
				color: $color-main;
				margin-left: 2rem;

				span {
					font-weight:500;
				}
			}
		}

		.right-wrapper {
			.user {
				padding: 1.5rem 4rem;
				border-left: .1rem solid rgba(61, 86, 169, 0.2);

				.user-avatar {
					display: flex;
					width: 4rem;
					height: 4rem;
					overflow: hidden;
					border-radius: 50%;

					.user-photo {
						width: 100%;
						height: 100%;
						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;
					}
				}
			}
		}
	}
</style>

