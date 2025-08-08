<template>
	<Navbar title="装修知识" :pageScroll="pageScroll"></Navbar>
	<view class="banner">
		<image class="cover" :src="details.image" mode="widthFix"></image>
	</view>
	<view class="main">
		<view class="title">
			{{details.title}}
		</view>
		<view class="author">
			<text class="text">时间：{{details.publish_date}}</text>
			<text class="text">来源：{{details.source}}</text>
		</view>
		<view class="lead">
			<uv-parse :selectable="true" :lazyLoad="true" :content="details.content" :tagStyle="{
				p: 'color: #000; font-size: 28rpx; line-height: 1.8;',
				img: 'margin: 10rpx 0;'
			}"></uv-parse>
		</view>
		<view class="cover_box">
			<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="widthFix"></image>
		</view>
		<view class="share justify_center">
			<uv-button openType="share" color="transparent" :customStyle="{
				display: 'inline-block',
				padding: '20rpx 30rpx 20rpx 0',
				textAlign: 'center',
				height: 'auto',
			}">
				<view class="wrap justify_center">
					<i class="iconfont inlineBlock icon-rizhi"></i>
					<view class="text">
						分享
					</view>
				</view>
			</uv-button>
			<view class="wrap justify_center">
				<i class="iconfont inlineBlock icon-chakan"></i>
				<view class="text">
					{{details.view_actual}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Navbar from '@/component/navbar';

	import {
		ref
	} from 'vue';

	import {
		onPageScroll,
		onLoad
	} from '@dcloudio/uni-app';

	import {
		knowledgeDetailsApi
	} from '../../request/api.js';

	const id = ref(null);
	const pageScroll = ref(0);
	const details = ref({});

	const returnClick = () => {
		uni.navigateBack()
	}

	onPageScroll((e) => {
		pageScroll.value = e.scrollTop;
	})

	onLoad(async (load) => {
		console.log('load', load);
		if (load.id) {
			id.value = load.id;

			const res = await knowledgeDetailsApi({
				id: id.value
			}, {
				custom: {
					catch: true,
					token: true
				}
			})

			console.log('knowledgeDetails', res);
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
		}

		.author {
			padding: 20rpx 0;
			text-align: center;
			border-bottom: 1px solid rgba(0, 0, 0, .1);
			margin-bottom: 20rpx;

			.text {
				font-size: 28rpx;
				color: #B7B7B7;
				padding: 0 20rpx;
			}
		}

		.lead {
			font-size: 28rpx;
			color: #616161;
			line-height: 1.9;
			padding: 10rpx 0;
		}

		.cover_box {
			.cover {
				width: 100%;
			}
		}
	}

	.share {
		padding: 20rpx 0;

		.wrap {
			margin-right: 20rpx;

			.iconfont {
				flex: none;
				font-size: 38rpx;
				font-weight: 500;
				color: #777777;
			}

			.text {
				flex: 1;
				font-size: 32rpx;
				font-weight: 500;
				color: #777777;
				padding-left: 8rpx;
			}
		}
	}
</style>