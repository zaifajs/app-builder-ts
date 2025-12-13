<template>
	<button
		type="button"
		:class="[
			'el-button',
			large ? '-large' : null,
			disabled ? '-disabled' : null
		]"
		:disabled="disabled"
	>
		{{ text }}
	</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend ({
	name: 'ElButton',
	props: {
		text: {
			type: String,
			description: 'Text for button.',
			default: 'null'
		},
		large: {
			type: Boolean,
			description: 'If true button is large',
			default: false
		},
		disabled: {
			type: Boolean,
			description: 'If true button is disabled',
			default: false
		}
	},
});
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "../assets/sass/media" as *;
@use "../assets/sass/config" as *;

.el-button {
	display: flex;
	margin: 0 auto;
	border: 0;
	height: 6rem;
	width: 20rem;
	padding: 2rem 0;

	font-size: 1.4rem;
	text-transform: uppercase;
	font-weight: 600;
	color: $color-white;
	justify-content: center;
	background-color: $color-main;
	cursor: pointer;
	letter-spacing: 0.08rem;
	border-radius: .8rem;
	transition: background-color .2s linear;
	&.-large {
		width: 26rem;
	}
	&.-disabled,
	&.-disabled:hover,
	&.-disabled:active {
		background-color: #AFB9C1;
		cursor: not-allowed;
		pointer-events: none;
	}
	&:hover,
	&:active {
		outline: 0;
		background-color: color.adjust($color-main, $lightness: 5%);

	}
}
</style>


