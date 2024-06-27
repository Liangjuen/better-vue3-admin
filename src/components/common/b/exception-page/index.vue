<template>
	<div class="exception-page">
		<div class="exception-page-wrapper">
			<div class="wave-wrapper">
				<div class="backdrop-filter-wrap">
					<div class="page-info">
						<h1 class="code-wrapper">
							<span v-for="item in codes" :key="item">
								{{ item }}
							</span>
						</h1>
						<p class="desc">{{ desc }}</p>
						<div class="btns">
							<el-button @click="back()" plain>cd ..</el-button>
							<el-button type="primary" @click="toHome()" plain>
								返回首页
							</el-button>
						</div>
					</div>
				</div>

				<svg
					class="waves-svg"
					xmlns="http://www.w3.org/2000/svg"
					xlink="http://www.w3.org/1999/xlink"
					viewBox="0 24 150 28"
					preserveAspectRatio="none"
					shape-rendering="auto"
				>
					<defs>
						<path
							id="gentle-wave"
							d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"
						></path>
					</defs>
					<g class="parallax">
						<use href="#gentle-wave" x="48" y="0"></use>
						<use href="#gentle-wave" x="48" y="3"></use>
						<use href="#gentle-wave" x="48" y="5"></use>
						<use href="#gentle-wave" x="48" y="7"></use>
					</g>
				</svg>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
	code: Number,
	desc: String
})
const router = useRouter()

const codes = computed(() => props.code?.toString().split(''))

function back() {
	router.go(-1)
}

function toHome() {
	router.push('/')
}
</script>

<style lang="scss">
.exception-page {
	--fill: var(--el-bg-color);
	height: 100%;
	background-color: var(--fill);
	&-wrapper {
		position: relative;
		height: 100%;
		color: #636e72;
		.page-info {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: var(--el-color-white);
			.code-wrapper span {
				font-size: 120px;
				font-weight: 400;
			}

			.desc {
				text-align: center;
			}

			.btns {
				display: flex;
				justify-content: center;
				margin-top: 20px;
			}
		}

		.backdrop-filter-wrap {
			width: 100%;
			height: 100%;
			backdrop-filter: blur(var(--filter));
			background-color: var(--el-color-primary-light-3);
		}
		.wave-wrapper {
			width: 100%;
			height: 35%;
			min-height: 70%;
			position: absolute;
			top: 0;
		}
	}
}
@media (max-width: 700px) {
	.article-top {
		align-items: center;
	}

	.article-title {
		font-size: 1.8rem !important;
	}
}

@keyframes move {
	0% {
		transform: translate3d(90px, 0, 0);
	}

	100% {
		transform: translate3d(-85px, 0, 0);
	}
}

.waves-svg {
	height: 6%;
	max-height: 60px;
	min-height: 35px;
	width: 100%;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 2;
}

.parallax > use:nth-child(1) {
	--opacity: 0.5;
	--delay: -1s;
	--duration: 14s;
}

.parallax > use:nth-child(2) {
	--opacity: 0.6;
	--delay: -2s;
	--duration: 15s;
}

.parallax > use:nth-child(3) {
	--opacity: 0.7;
	--delay: -3s;
	--duration: 16s;
}

.parallax > use:nth-child(4) {
	--opacity: 1;
	--delay: -4s;
	--duration: 17s;
}

.parallax > use {
	opacity: var(--opacity);
	fill: var(--fill);
	transition: fill var(--ani-duration);
	animation: move var(--duration) cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
	animation-delay: var(--delay);
	/* animation-duration: var(--duration); */
}
</style>
