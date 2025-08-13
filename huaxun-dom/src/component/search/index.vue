<template>
	<view class="search" @click="openSearch">
		<view class="box justify_center">
			<i class="iconfont icon-sousuo"></i>
			<view class="text">大家都在搜：现代简约</view>
		</view>
	</view>
</template>

<script setup>
	const openSearch = () => {
		uni.navigateTo({
			url: '/pages/search/index'
		})
	}
</script>

<style lang="scss" scoped>
	.search {
		padding: 10rpx 20rpx;
		background: #fff;

		.box {
			background: #F6F6F6;
			border-radius: 44rpx;
			height: 80rpx;
			padding: 0 20rpx;

			.iconfont {
				font-size: 32rpx;
				color: #000;
				font-weight: 600;
			}

			.text {
				flex: 1;
				color: #858585;
				font-size: 24rpx;
				padding-left: 20rpx;
			}
		}
	}

	.search_placeholder {
		height: 120rpx;
	}
</style>