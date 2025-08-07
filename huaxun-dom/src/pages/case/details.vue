<template>
	<Navbar title="案例展馆" :pageScroll="pageScroll"></Navbar>
	<view class="swiper">
		<swiper class="banner" autoplay circular skip-hidden-item-layout indicator-dots
			indicator-active-color="#FF4E00">
			<swiper-item v-for="(item,index) in details.images" :key="item">
				<view class="item">
					<image class="img" :src="item" mode="scaleToFill"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<view class="details">
		<view class="title">
			{{details.title}}
		</view>
		<view class="specification flex box_radius box_shadow">
			<view class="item" v-if="details.place">
				<text class="name inlineBlock">楼盘</text>
				<text class="text inlineBlock">{{details.place}}</text>
			</view>
			<view class="item" v-if="details.style_name">
				<text class="name inlineBlock">风格</text>
				<text class="text inlineBlock">{{details.style_name}}</text>
			</view>
			<view class="item" v-if="details.house_name">
				<text class="name inlineBlock">户型</text>
				<text class="text inlineBlock">{{details.house_name}}</text>
			</view>
			<view class="item" v-if="details.area_name">
				<text class="name inlineBlock">面积</text>
				<text class="text inlineBlock">{{details.area_name}}</text>
			</view>
		</view>
		<view class="property justify_center">
			<view class="click justify_center">
				<i class="iconfont icon-chakan"></i>
				<text class="text inlineBlock">{{details.view_actual || 0}}</text>
			</view>
			<view class="click justify_center" @click="isCollect">
				<i class="iconfont icon-shoucang" v-if="CaseCollect == 0"></i>
				<i class="iconfont icon-shoucang1 active" v-else></i>
				<text class="text inlineBlock">{{CaseCollectNumber || 0}}</text>
			</view>
		</view>
		<uv-line margin="10px 0"></uv-line>
		<view class="title">
			设计理念
		</view>
		<view class="lead">
			{{details.design_idea}}
		</view>
		<view class="vr">
			<view class="cover_box box_radius box_shadow" @click="previewIde">
				<image class="cover" :src="details.image" mode="widthFix"></image>
			</view>
			<view class="sign justify_center" v-if="details.vr_url">
				<i class="iconfont icon-vr"></i>
				<text class="text">360全景</text>
			</view>
		</view>
	</view>
	<view class="case"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');"
		v-if="details.living_room_images.length > 0">
		<view class="title">“客厅展示”</view>
		<view class="cover_box" v-for="(item,index) in details.living_room_images" :key="item" @click="previewLivingRoom(index)">
			<image class="cover" :src="item" mode="widthFix"></image>
		</view>
	</view>
	<uv-gap height="20" bgColor="#fff"></uv-gap>
	<view class="case"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');"
		v-if="details.main_room_images.length > 0">
		<view class="title">“主卧展示”</view>
		<view class="cover_box" v-for="(item,index) in details.main_room_images" :key="item" @click="perviewMaster(index)">
			<image class="cover" :src="item" mode="widthFix"></image>
		</view>
	</view>
	<uv-gap height="20" bgColor="#fff"></uv-gap>
	<view class="case_swiper">
		<swiper class="swiper" autoplay circular skip-hidden-item-layout @change="caseSwiperChange"
			:current="caseIndex">
			<swiper-item class="item" v-for="(item,index) in caseList" :key="index" @click="openCaseDetails(item.id)">
				<image class="cover" :src="item.image" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view class="case_main img_bg"
			style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
			<view class="title">“推荐案例”</view>
			<swiper class="swiper_main" autoplay @change="caseSwiperChange" :current="caseIndex">
				<swiper-item class="item" v-for="(item,index) in caseList" :key="index"
					@click="openCaseDetails(item.id)">
					<view class="name">{{item.title}}</view>
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
		onPageScroll,
		onLoad
	} from '@dcloudio/uni-app';

	import {
		ref,
		onMounted
	} from 'vue';

	import {
		caseDetailsApi,
		isCaseCollectApi,
		caseListApi
	} from '../../request/api.js';

	const id = ref(null); // 案例id
	const caseList = ref([]); // 推荐案例
	const details = ref({}); // 详情
	const CaseCollect = ref(0); // 是否收藏
	const CaseCollectNumber = ref(0); // 收藏数量
	// 案例swiper
	const caseIndex = ref(0);
	const caseSwiperChange = (e) => {
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

	// 收藏
	const isCollect = async () => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});

		const res = await isCaseCollectApi({
			id: id.value,
			type: CaseCollect.value == 0 ? 1 : 0
		}, {
			custom: {
				catch: true,
				token: true
			}
		})
		console.log('isCollect', res);
		if (res.code == 1) {
			CaseCollect.value = CaseCollect.value == 0 ? 1 : 0;
			if (CaseCollect.value == 1) {
				CaseCollectNumber.value = CaseCollectNumber.value += 1;
			} else {
				CaseCollectNumber.value = CaseCollectNumber.value -= 1;
			}
		}
		uni.hideLoading();
	}

	// 推荐案例
	const openCaseDetails = (id) => {
		uni.navigateTo({
			url: `/pages/case/details?id=${id}`
		})
	}

	onLoad(async (load) => {
		console.log('load', load);

		if (load.id) {
			id.value = load.id;
			const res = await caseDetailsApi({
				id: id.value
			}, {
				custom: {
					catch: true,
					token: true
				}
			})

			details.value = res.data;
			CaseCollect.value = res.data.is_collect;
			CaseCollectNumber.value = res.data.collect_num;
			console.log('caseDetails', res);
		}

		// 推荐案例
		const recommendCaseList = await caseListApi({
			is_jingpin: 1
		}, {
			custom: {
				catch: true
			}
		})

		caseList.value = recommendCaseList.data.lists;
	})

	// 设计理念预览
	const previewIde = () => {
		const list = [];
		list.push(details.value.image);
		uni.previewImage({
			showmenu: true,
			urls: list
		})
	}
	
	// 客厅展示预览
	const previewLivingRoom = (index) => {
		uni.previewImage({
			current: index,
			showmenu: true,
			urls: details.value.living_room_images
		})
	}
	
	// 主卧展示预览
	const perviewMaster = (index) => {
		uni.previewImage({
			current: index,
			showmenu: true,
			urls: details.value.main_room_images
		})
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

				.active {
					color: $main-color;
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