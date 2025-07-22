<template>
	<div class="icon-container">
		<div class="icon icon-1">
			<i class="iconfont icon-xia"></i>
		</div>
		<div class="icon icon-2">
			<i class="iconfont icon-xia"></i>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.icon-container {
		position: relative;
		width: 200rpx;
		height: 100rpx;
	}

	.icon {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
		
		.iconfont {
			font-size: 54rpx;
		}
	}

	.icon-1 {
		color: #fff;
		animation-name: pulse1;
		text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
	}

	.icon-2 {
		color: #fff;
		animation-name: pulse2;
		text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
	}

	@keyframes pulse1 {

		0%,
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}

		50% {
			opacity: 0.5;
			transform: translateY(24rpx) scale(0.9);
		}
	}

	@keyframes pulse2 {

		0%,
		100% {
			opacity: 0.5;
			transform: translateY(24rpx) scale(0.9);
		}

		50% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>