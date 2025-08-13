<template>
	<Navbar title="关于我们" :pageScroll="pageScroll"></Navbar>
	<view class="banner">
		<image class="cover" :src="details.about_image"
			mode="widthFix"></image>
	</view>
	<view class="main">
		<view class="title">
			{{details.about_title}}
		</view>
		<view class="lead">
			<uv-parse :selectable="true" :lazyLoad="true" :content="details.about_content"></uv-parse>
		</view>
		<view class="return">
			<view class="return_btn inlineBlock" @click="returnClick">
				返回列表
			</view>
		</view>
	</view>
</template>

<script setup>
	import Navbar from '@/component/navbar';

	import {
		ref,
		onMounted
	} from 'vue';

	import {
		onPageScroll
	} from '@dcloudio/uni-app';

	import {
		aboutUsApi
	} from '../../request/api.js';

	const details = ref({});
	const pageScroll = ref(0);

	const returnClick = () => {
		uni.navigateBack()
	}

	onPageScroll((e) => {
		pageScroll.value = e.scrollTop;
	})

	onMounted(async () => {
		const res = await aboutUsApi({
			custom: {
				catch: true
			}
		})

		console.log('aboutUs', res);
		if (res.code == 1) {
			details.value = res.data;
		}
	})
</script>

<style lang="scss" scoped>
	.banner {
		.cover {
			width: 100%;
		}
	}

	.main {
		padding: 60rpx 30rpx;

		.title {
			text-align: center;
			font-weight: 600;
			margin-bottom: 20rpx;
		}

		.lead {
			font-size: 28rpx;
			color: #616161;
			line-height: 1.8;
			padding: 10rpx 0;
		}

		.return {
			padding: 20rpx 0;
			text-align: right;

			.return_btn {
				height: 80rpx;
				line-height: 80rpx;
				background: $main-color;
				color: #fff;
				font-size: 28rpx;
				font-weight: 500;
				border-radius: 46rpx;
				padding: 0 60rpx;
			}
		}
	}
</style>