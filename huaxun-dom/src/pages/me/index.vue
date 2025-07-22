<template>
	<Navbar title="我的" :pageScroll="pageScroll" :noReturn="true"></Navbar>
	<view class="banner">
		<image class="cover" src="/static/img/me_bg.jpg" mode="widthFix"></image>
	</view>
	<view class="user justify_center">
		<view class="head_portrait justify_center">
			<image class="cover" src="/static/img/head_portrait.png" mode="scaleToFill"></image>
			<view class="content">
				<view class="name">游客</view>
				<view class="mobile justify_center">
					<i class="iconfont icon-shouji"></i>
					<text class="phone">-</text>
				</view>
			</view>
		</view>
		<view class="set justify_center">
			<i class="iconfont icon-shezhi"></i>
			<text class="text">个人资料</text>
		</view>
	</view>
	<view class="collect_list flex">
		<view class="item" @click="openCaseCollect">
			<uv-count-to color="#fff" fontSize="38" bold :startVal="0" :endVal="3"></uv-count-to>
			<view class="name">案例收藏</view>
		</view>
		<view class="item" @click="openDesignCollect">
			<uv-count-to color="#fff" fontSize="38" bold :startVal="0" :endVal="6"></uv-count-to>
			<view class="name">设计师收藏</view>
		</view>
		<view class="item" @click="openStewardCollect">
			<uv-count-to color="#fff" fontSize="38" bold :startVal="0" :endVal="12"></uv-count-to>
			<view class="name">管家收藏</view>
		</view>
	</view>
	<view class="advertising">
		<image class="cover box_radius box_shadow" src="/static/img/advertising.jpg" mode="widthFix"></image>
	</view>
	<view class="platform">
		<view class="wrap">
			<view class="title">平台相关</view>
			<view class="list flex">
				<view class="item" @click="openAbout">
					<view class="icon">
						<i class="iconfont icon-guanyuwomen"></i>
					</view>
					<view class="lead">
						关于我们
					</view>
				</view>
				<view class="item" @click="openKnowledge">
					<view class="icon">
						<i class="iconfont icon-laba"></i>
					</view>
					<view class="lead">
						装修知识
					</view>
				</view>
				<view class="item">
					<uv-button openType="contact" :hairline="false" :plain="true" :customStyle="{
					display: 'inline-block',
					padding: '0',
					textAlign: '10rpx',
					width: '100%',
					height: 'auto',
					border: 0
				}">
						<view class="icon">
							<i class="iconfont icon-kefu1"></i>
						</view>
						<view class="lead">
							在线客服
						</view>
					</uv-button>
				</view>
				<view class="item" @click="makeCall">
					<view class="icon">
						<i class="iconfont icon-24gf-phoneLoudspeaker"></i>
					</view>
					<view class="lead">
						联系信息
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<i class="iconfont icon-tuichu"></i>
					</view>
					<view class="lead">
						退出登录
					</view>
				</view>
			</view>
		</view>
	</view>
	<tabbar></tabbar>
</template>

<script setup>
	import Tabbar from '@/component/tabbar/index.vue';
	import Navbar from '@/component/navbar';
	import {
		ref
	} from 'vue';
	import {
		onPageScroll
	} from '@dcloudio/uni-app';

	const pageScroll = ref(0);

	const makeCall = () => {
		uni.makePhoneCall({
			phoneNumber: '17520583947' //仅为示例
		});
	}

	const openAbout = () => {
		uni.navigateTo({
			url: '/pages/aboutUs/index'
		})
	}
	
	const openKnowledge = () => {
		uni.navigateTo({
			url: '/pages/knowledge/index'
		})
	}
	
	const openCaseCollect = () => {
		uni.navigateTo({
			url: '/pages/case/collect',
		})
	}
	
	const openDesignCollect = () => {
		uni.navigateTo({
			url: '/pages/design/collect'
		})
	}
	
	const openStewardCollect = () => {
		uni.navigateTo({
			url: '/pages/steward/collect'
		})
	}

	onPageScroll((e) => {
		pageScroll.value = e.scrollTop;
	})
</script>

<style>
	page {
		background: #F2F4F5;
	}
</style>

<style lang="scss" scoped>
	.banner {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: -1;

		.cover {
			width: 100%;
		}
	}

	.user {
		padding: 40rpx 0 40rpx 20rpx;

		.head_portrait {
			flex: 1;

			.cover {
				width: 116rpx;
				height: 116rpx;
				flex: none;
			}

			.content {
				flex: 1;
				padding-left: 20rpx;

				.name {
					font-size: 34rpx;
					font-weight: 600;
					color: #fff;
				}

				.mobile {
					.iconfont {
						color: $main-color;
						font-size: 24rpx;
					}

					.phone {
						font-size: 24rpx;
						color: #fff;
					}
				}
			}
		}

		.set {
			flex: none;
			width: 220rpx;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 46rpx 0 0 46rpx;
			background: rgba(255, 255, 255, .3);
			text-align: center;
			justify-content: center;

			.iconfont {
				font-size: 34rpx;
				color: #fff;
				font-weight: 500;
			}

			.text {
				font-size: 28rpx;
				color: #fff;
				font-weight: 500;
				padding-left: 10rpx;
			}
		}
	}

	.collect_list {
		margin-bottom: 40rpx;

		.item {
			flex: 1;
			text-align: center;

			.num {
				font-size: 38rpx;
				color: #fff;
				font-weight: 600;
			}

			.name {
				font-size: 28rpx;
				color: #fff;
				font-weight: 500;
			}
		}
	}

	.advertising {
		padding: 20rpx;

		.cover {
			width: 100%;
			border-radius: 24rpx;
		}
	}

	.platform {
		padding: 20rpx 20rpx 0;

		.wrap {
			border-radius: 24rpx;
			background: #fff;
			padding: 20rpx;

			.title {
				font-size: 32rpx;
				font-weight: 600;
				position: relative;
				padding-left: 20rpx;
				margin-bottom: 20rpx;

				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 10rpx;
					height: 32rpx;
					background: $main-color;
					border-radius: 12rpx;
				}
			}

			.list {
				flex-wrap: wrap;

				.item {
					width: 25%;
					padding: 20rpx 0;
					text-align: center;

					.icon {
						.iconfont {
							font-size: 46rpx;
							color: $main-color;
						}
					}

					.lead {
						font-size: 28rpx;
						color: #000;
					}
				}
			}
		}
	}
</style>