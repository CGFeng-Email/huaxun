<template>
	<Navbar title="装修知识" :pageScroll="pageScroll"></Navbar>
	<view class="banner">
		<image class="cover" src="/static/img/case_swiper.jpg" mode="widthFix"></image>
	</view>
	<view class="main">
		<view class="title">
			轻奢大宅设计，呼之欲出的高级感，越看越心水
		</view>
		<view class="author">
			<text class="text">时间：2025.06.09</text>
			<text class="text">来源：华浔装饰</text>
		</view>
		<view class="lead">
			广东华浔品味装饰集团有限公司成立于1998年，是一家集全案设计、整装服务、配套材料、集成施工和定制服务于一体的大型直营连锁装饰集团，主要从事家居、写字楼、商铺、酒店等空间的设计与施工，同时还提供教育培训、家居建材供应、生态木制品生产加工、家居商城服务等上下游产业链配套服务。

			2003年，华浔率先通过ISO9001国际质量体系认证。目前已取得了专项设计乙级资质、专项施工壹级资质，是中国建筑装饰协会副会长单位，中国家居行业品质建设成就理事会副理事长单位，全国各省市建筑装饰行业协会会长/副会长单位。
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
					533
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
		onPageScroll
	} from '@dcloudio/uni-app';

	const pageScroll = ref(0);

	const returnClick = () => {
		uni.navigateBack()
	}

	onPageScroll((e) => {
		pageScroll.value = e.scrollTop;
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