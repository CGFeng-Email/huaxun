<template>
	<view>
		<uv-navbar :bgColor="pageScroll > 70 ? '#fff' : 'transparent'" :placeholder="noReturn">
			<template v-slot:left>
				<view class="search justify_center uv-nav-slot" @click="openSearch">
					<i class="iconfont icon-sousuo"></i>
					<text class="text over1">搜索关键字</text>
				</view>
			</template>
			<template v-slot:center>
				<div class="logo justify_center">
					<image class="image" :src="pageScroll > 70 ? '/static/img/home_logo.png' : '/static/img/logo.png'" mode="widthFix">
					</image>
				</div>
			</template>
		</uv-navbar>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		pageScroll: {
			type: Number,
			default: () => 0
		},
		noReturn: {
			type: Boolean,
			default: false
		}
	})

	const openSearch = () => {
		uni.navigateTo({
			url: '/pages/search/index'
		})
	}
</script>

<style lang="scss" scoped>
	.search {
		width: 180rpx;
		padding: 0 10rpx 0 20rpx;
		background: #abaaa9;
		border-radius: 40rpx;
		color: #fff;
		height: 60rpx;

		.iconfont {
			flex: none;
		}

		.text {
			flex: 1;
			padding-left: 10rpx;
			font-size: 24rpx;
		}
	}

	.logo {
		height: 60rpx;

		.image {
			width: 238rpx;
		}
	}
</style>