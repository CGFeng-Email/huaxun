<template>
	<Navbar title="案例展馆" :pageScroll="pageScroll"></Navbar>
	<view class="swiper">
		<swiper class="banner" autoplay circular skip-hidden-item-layout>
			<swiper-item>
				<view class="item">
					<image class="img" src="/static/img/case_swiper.jpg" mode="scaleToFill"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="item">
					<image class="img" src="/static/img/case_swiper.jpg" mode="scaleToFill"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<view class="details">
		<view class="title">
			长沙润府-轻奢风格-220㎡-四房
		</view>
		<view class="specification flex box_radius box_shadow">
			<view class="item">
				<text class="name inlineBlock">楼盘</text>
				<text class="text inlineBlock">长沙润府</text>
			</view>
			<view class="item">
				<text class="name inlineBlock">风格</text>
				<text class="text inlineBlock">现代轻奢</text>
			</view>
			<view class="item">
				<text class="name inlineBlock">户型</text>
				<text class="text inlineBlock">四居室</text>
			</view>
			<view class="item">
				<text class="name inlineBlock">面积</text>
				<text class="text inlineBlock">220㎡</text>
			</view>
		</view>
		<view class="property justify_center">
			<view class="click justify_center">
				<i class="iconfont icon-chakan"></i>
				<text class="text inlineBlock">533</text>
			</view>
			<view class="click justify_center">
				<i class="iconfont icon-shoucang"></i>
				<text class="text inlineBlock">368</text>
			</view>
		</view>
		<uv-line margin="10px 0"></uv-line>
		<view class="title">
			设计理念
		</view>
		<view class="lead">
			本案不仅注重空间的美观与实用性，客餐厅采用开放式设计，模糊了传统功能区的界限，强调了空间的流畅性与互动性。
		</view>
		<view class="vr">
			<view class="cover_box box_radius box_shadow">
				<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="widthFix"></image>
			</view>
			<view class="sign justify_center">
				<i class="iconfont icon-vr"></i>
				<text class="text">360全景</text>
			</view>
		</view>
	</view>
	<view class="case" style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="title">“客厅展示”</view>
		<view class="cover_box">
			<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="widthFix"></image>
		</view>
		<view class="cover_box">
			<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="widthFix"></image>
		</view>
	</view>
	<uv-gap height="20" bgColor="#fff"></uv-gap>
	<view class="case" style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="title">“主卧展示”</view>
		<view class="cover_box">
			<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="widthFix"></image>
		</view>
		<view class="cover_box">
			<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="widthFix"></image>
		</view>
	</view>
	<uv-gap height="20" bgColor="#fff"></uv-gap>
	<view class="case_swiper">
		<swiper class="swiper" autoplay circular skip-hidden-item-layout @change="caseSwiperChange"
			:current="caseIndex">
			<swiper-item class="item">
				<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="scaleToFill"></image>
			</swiper-item>
			<swiper-item class="item">
				<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view class="case_main img_bg" style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
			<view class="title">“推荐案例”</view>
			<swiper class="swiper_main" autoplay @change="caseSwiperChange" :current="caseIndex">
				<swiper-item class="item">
					<view class="name">《琉光·雅寓》</view>
				</swiper-item>
				<swiper-item class="item">
					<view class="name">《琉光·雅致》</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
	<view class="consult justify_space">
		<view class="left justify_center">
			<view class="logo justify_center">
				<image class="cover" src="/static/img/tabbar_consult.png" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="head justify_center">
					<text class="title">微信咨询</text>
					<i class="iconfont icon-weixin"></i>
				</view>
				<view class="lead">
					免预约·高协同·更全面
				</view>
			</view>
		</view>
		<view class="right justify_center">
			<uv-button openType="contact" color="#FD7B4D" :customStyle="{
				display: 'inline-block',
				padding: '10rpx 20rpx',
				textAlign: '10rpx',
				height: 'auto'
			}">
				<i class="iconfont icon-kefu"></i>
				<view class="lead">
					在线客服
				</view>
			</uv-button>
			<view class="box box_radius box_shadow" @click="makeCall">
				<i class="iconfont icon-dianhua"></i>
				<view class="lead">
					在线咨询
				</view>
			</view>
		</view>
	</view>
	<view style="height: 89px;"></view>
</template>

<script setup>
	import Navbar from '@/component/navbar';
	
	import {
		onPageScroll
	} from '@dcloudio/uni-app';
	
	import {
		ref
	} from 'vue';

	// 案例swiper
	const caseIndex = ref(0);
	const caseSwiperChange = (e) => {
		console.log(e);
		caseIndex.value = e.detail.current;
	}

	const pageScroll = ref(0);

	onPageScroll((e) => {
		pageScroll.value = e.scrollTop;
	})

	const makeCall = () => {
		uni.makePhoneCall({
			phoneNumber: '17520583947' //仅为示例
		});
	}
</script>

<style lang="scss" scoped>
	.swiper {
		.banner {
			height: 820rpx;

			.item {
				.img {
					width: 750rpx;
					height: 820rpx;
				}
			}
		}
	}

	.details {
		padding: 20rpx;

		.title {
			font-weight: 600;
		}

		.specification {
			background: #F9F9F9;
			padding: 30rpx 30rpx 0;
			flex-wrap: wrap;
			margin: 20rpx 0;

			.item {
				width: 50%;
				margin-bottom: 30rpx;

				.name {
					padding: 6rpx 28rpx;
					border-radius: 24rpx;
					background: #FFE5D9;
					color: $main-color;
					font-size: 24rpx;
					font-weight: 500;
					margin-right: 20rpx;
				}
			}
		}

		.property {
			.click {
				margin-right: 30rpx;

				.iconfont {
					font-size: 34rpx;
					margin-right: 10rpx;
					color: #777777;
					font-weight: 500;
				}

				.text {
					font-size: 28rpx;
					color: #777777;
					font-weight: 500;
				}
			}
		}

		.lead {
			color: #878787;
			margin: 20rpx 0;
			line-height: 1.7;
		}

		.vr {
			position: relative;

			.cover_box {
				overflow: hidden;

				.cover {
					width: 100%;
				}
			}

			.sign {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 228rpx;
				height: 70rpx;
				border-radius: 34px;
				background: rgba(0, 0, 0, .6);
				justify-content: center;
				line-height: 70rpx;

				.iconfont {
					font-size: 48rpx;
					color: #fff;
					font-weight: 500;
				}

				.text {
					font-size: 26rpx;
					color: #fff;
					font-weight: 500;
				}
			}
		}
	}

	.case {
		padding: 60rpx 20rpx;

		.title {
			color: $main-color;
			text-align: center;
			font-size: 34rpx;
			font-weight: 600;
			margin-bottom: 40rpx;
		}

		.cover_box {
			margin-bottom: 20rpx;

			.cover {
				width: 100%;
			}
		}
	}

	.case_swiper {
		.swiper {
			height: 518rpx;

			.cover {
				width: 100%;
				height: 100%;
			}
		}

		.case_main {
			padding: 60rpx 20rpx;

			.title {
				color: $main-color;
				text-align: center;
				font-size: 34rpx;
				font-weight: 600;
			}

			.swiper_main {
				height: 100rpx;

				.item {
					padding: 20rpx 0 0;

					.name {
						font-size: 26rpx;
						color: #a3a2a1;
						text-align: center;
					}
				}
			}

			.more {
				width: 238rpx;
				height: 66rpx;
				text-align: center;
				line-height: 66rpx;
				border-radius: 45rpx;
				background: $main-color;
				color: #fff;
				font-size: 24rpx;
				margin: auto;
			}
		}
	}

	.consult {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 30rpx 20rpx 40rpx;
		background: linear-gradient(180.00deg, #ff4e00 0%, #e40000 100%);
		color: #fff;

		.left {
			.logo {
				width: 100rpx;
				height: 100rpx;
				padding: 20rpx;
				background: #fff;
				border-radius: 50%;
				justify-content: center;

				.cover {
					width: 54rpx;
				}
			}

			.content {
				padding-left: 20rpx;

				.head {
					padding-bottom: 6rpx;

					.title {
						font-size: 28rpx;
						padding-right: 6rpx;
					}

					.iconfont {
						font-size: 28rpx;
					}
				}

				.lead {
					border: 1px solid #fff;
					border-radius: 45rpx;
					padding: 6rpx 20rpx;
					font-size: 22rpx;
				}
			}
		}

		.right {
			.box {
				padding: 10rpx 20rpx;
				background: #FD7B4D;
				text-align: center;
				margin-left: 10rpx;
			}
		}
	}
</style>