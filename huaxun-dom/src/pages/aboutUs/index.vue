<template>
	<Navbar title="关于我们" :pageScroll="pageScroll"></Navbar>
	<view class="banner">
		<image class="cover" src="/static/img/about_banner.jpg" mode="widthFix"></image>
	</view>
	<view class="main">
		<view class="title">
			广东华浔品味装饰集团有限公司
		</view>
		<view class="lead">
			广东华浔品味装饰集团有限公司成立于1998年，是一家集全案设计、整装服务、配套材料、集成施工和定制服务于一体的大型直营连锁装饰集团，主要从事家居、写字楼、商铺、酒店等空间的设计与施工，同时还提供教育培训、家居建材供应、生态木制品生产加工、家居商城服务等上下游产业链配套服务。

			2003年，华浔率先通过ISO9001国际质量体系认证。目前已取得了专项设计乙级资质、专项施工壹级资质，是中国建筑装饰协会副会长单位，中国家居行业品质建设成就理事会副理事长单位，全国各省市建筑装饰行业协会会长/副会长单位。

			迄今为止，华浔先后获得了“全国住宅装饰装修百强企业及行业知名品牌企业”“亚洲装饰业质量服务信得过企业”“全国住宅装饰装修行业质量服务诚信五星级企业”“中国建筑装饰行业最具工匠精神设计机构”“全国最具影响力设计机构”等200多项重磅荣誉，且从2010年起，每年都获得“广东省守合同重信用企业”荣誉称号。

			华浔人始终以“做品味空间的引领者，让中国人住得更美好”为使命愿景，践行“海纳百川，有容乃大；壁立千仞，无欲则刚”的企业精神，坚守“诚信、专业、创新、共享”的经营理念，不断打造“责任、敬业、感恩、友爱”的华浔大家庭！
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