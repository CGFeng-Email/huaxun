<template>
	<Navbar title="设计师" :pageScroll="pageScroll"></Navbar>
	<view class="banner">
		<image class="bg_cover" src="/static/img/banner_bg.jpg" mode="scaleToFill"></image>
		<view class="info flex">
			<view class="head_portrait">
				<image class="cover" src="/static/img/teams_name1.jpg" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="head">
					<text class="name inlineBlock">朱炎东</text>
					<text class="text inlineBlock">总设计师</text>
				</view>
				<view class="lead justify_center">
					<text class="name">服务指数：</text>
					<uv-rate :count="5" v-model="recommend" activeColor="#FF4E00" size="24" readonly
						activeIcon="heart-fill" inactiveIcon="heart"></uv-rate>
				</view>
				<view class="lead">
					<text class="name">服务地区：</text>
					<text class="text">全国</text>
				</view>
				<view class="lead">
					从事室内设计行业24年
				</view>
				<view class="lead">
					<text class="name">擅长风格：</text>
					<text class="text">新中式，现代简约风格</text>
				</view>
			</view>
		</view>
	</view>
	<view class="tabs justify_center">
		<view :class="['item', tabsIndex == 0 ? 'active' : '']" @click="tabsIndex = 0">设计师简介</view>
		<view :class="['item', tabsIndex == 1 ? 'active' : '']" @click="tabsIndex = 1">代表案例</view>
	</view>
	<view class="body">
		<view class="tabs_item" v-if="tabsIndex == 0">
			<view class="item">
				<view class="title">个人资质</view>
				<view class="lead">
					H A 艺墅设计院佛山院
				</view>
				<view class="lead">
					华浔品味装饰集团佛山公司 | 设计总监
				</view>
				<view class="lead">
					CIDA中国室内装饰协会会员
				</view>
				<view class="lead">
					国家注册高级室内设计师（中装协）
				</view>
				<view class="lead">
					湖南理工大学
				</view>
			</view>
			<view class="item">
				<view class="title">设计理念</view>
				<view class="lead">
					让艺术和生活零距离，用设计诠释生活，用灵感点亮生活。
				</view>
			</view>
			<view class="item">
				<view class="title">工作获奖经历</view>
				<view class="lead">
					SADI建筑装饰协会“最佳创意奖” <br>
					2016年进修“齐云生活美学馆”大师班 <br>
					2016年华浔品味装饰集团百变空间“优秀奖” <br>
					2019年中国建筑装饰CIDF华鼎奖 “银奖” <br>
					第五届金马克室内设计大赛别墅方案类 “优秀奖” <br>
					2020-2024年华浔品味装饰集团佛山大区年度 “优秀设计师” <br>
					华浔品味装饰集团 年度“全国金牌设计师” <br>
					第七届金马克室内设计大赛别墅实景类 “TOP100” <br>
					2024年佛山大区设计享未来设计大赛别墅大宅方案类“金奖” <br>
					2024设计-山海经年度优秀单空间设计奖 <br>
					曾游学于：希腊、英国、意大利、西班牙、葡萄牙、新西兰、泰国等
				</view>
			</view>
		</view>
		<view class="tabs_item" v-else>
			<view v-for="(item, index) in 4" :key="index" class="waterfall-item box_radius box_shadow">
				<view class="waterfall-item__image">
					<image class="cover" src="/static/img/team_name_li1.jpg" mode="widthFix"></image>
				</view>
				<view class="content">
					<view class="title">
						长沙润府-轻奢风格-220㎡-四房
					</view>
					<view class="bottom justify_space">
						<view class="label_list">
							<text class="text inlineBlock box_radius box_shadow">现代轻奢</text>
							<text class="text inlineBlock box_radius box_shadow">四居室</text>
							<text class="text inlineBlock box_radius box_shadow">220</text>
						</view>
						<view class="property justify_space">
							<view class="click justify_center">
								<i class="iconfont icon-chakan"></i>
								<text class="text">568</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

	<view class="make justify_space">
		<view class="content justify_center">
			<view class="item">
				<view class="icon">
					<i class="iconfont inlineBlock icon-shoucang"></i>
				</view>
				<view class="lead">
					收藏
				</view>
			</view>
			<uv-button openType="share" color="transparent" :customStyle="{
				display: 'inline-block',
				padding: '20rpx 30rpx',
				textAlign: 'center',
				height: 'auto',
				
			}">
				<view class="icon">
					<i class="iconfont inlineBlock icon-zhuanfa"></i>
				</view>
				<view class="lead">
					转发
				</view>
			</uv-button>
		</view>
		<view class="to_make" @click="openModal">
			预约设计
		</view>
	</view>
	<view style="height: 92px;"></view>

	<uv-modal ref="modal" @confirm="confirm" :showConfirmButton="false">
		<view class="slot-content modal">
			<view class="title">预约设计</view>
			<view class="lead">
				今日已有66位业主成功预约设计师
			</view>
			<uv-form labelPosition="left" :model="modalForm" :rules="rules" ref="form">
				<uv-form-item prop="name">
					<uv-input v-model="modalForm.name" placeholder="请输入您的姓名" suffixIcon="account" fontSize="13px"
						suffixIconStyle="font-size: 18px;">
					</uv-input>
				</uv-form-item>
				<uv-form-item prop="mobile">
					<uv-input v-model="modalForm.mobile" type="number" placeholder="请输入您的手机号码" suffixIcon="phone"
						fontSize="13px" suffixIconStyle="font-size: 18px;">
					</uv-input>
				</uv-form-item>
				<view class="tips justify_center">
					<i class="iconfont icon-gantanhao"></i>
					<text>信息保护中，请放心填写</text>
				</view>
				<uv-button color="#FF4E00" @click="submit">
					<view class="sibmit flex">
						<i class="iconfont icon-Telegram"></i>
						<text class="text">提交提交</text>
					</view>
				</uv-button>
				<view class="describe">
					<text>*将有工作人员与您联系，提供专属服务</text>
				</view>
			</uv-form>
		</view>
	</uv-modal>
</template>

<script setup>
	import Navbar from '@/component/navbar';
	import {
		ref
	} from 'vue';
	import {
		onPageScroll
	} from '@dcloudio/uni-app';

	const recommend = ref(4);
	const tabsIndex = ref(0);
	const pageScroll = ref(0);

	const modal = ref(null);
	const form = ref(null);

	const rules = ref({
		'name': {
			type: 'string',
			required: true,
			whitespace: true,
			message: '请输入您的姓名',
			trigger: ['blur', 'change']
		},
		'mobile': {
			type: 'number',
			required: true,
			whitespace: true,
			validator: (rule, value) => {
				console.log('value', uni.$uv.test.mobile(value));
				return uni.$uv.test.mobile(value);
			},
			message: '请输入您的手机号码',
			trigger: ['blur', 'change']
		}
	})

	const modalForm = ref({
		name: '',
		mobile: null
	})

	const openModal = () => {
		modal.value.open();
	}

	const submit = () => {
		form.value.validate().then(res => {
			console.log('res');
		}).catch(err => {
			console.log('err');
		})
	}

	onPageScroll((e) => {
		pageScroll.value = e.scrollTop;
	})
</script>

<style>
	page {
		background: #F9F9F9;
	}
</style>

<style lang="scss" scoped>
	.banner {
		position: relative;
		height: 640rpx;
		padding-top: 200rpx;

		.bg_cover {
			position: absolute;
			top: 0;
			left: 0;
			width: 750rpx;
			height: 100%;
			z-index: -1;
		}

		.info {
			padding: 20rpx 30rpx;

			.head_portrait {
				flex: none;

				.cover {
					width: 250rpx;
				}
			}

			.content {
				flex: 1;
				padding-left: 30rpx;
				color: #fff;

				.head {
					padding-bottom: 10rpx;

					.name {
						background: $main-color;
						color: #fff;
						padding: 4rpx 28rpx;
						font-size: 28rpx;
					}

					.text {
						padding-left: 10rpx;
						font-size: 22rpx
					}
				}

				.lead {
					font-size: 24rpx;
					line-height: 1.7;
					padding: 6rpx 0;

					.name {
						padding-right: 4rpx;
					}
				}
			}
		}
	}

	.tabs {
		padding: 40rpx 20rpx;
		background: #fff;
		justify-content: center;
		box-shadow: 0 0 25px #b7b7b71c;

		.item {
			border-radius: 46rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			font-weight: 500;
			border: 2px solid $main-color;
			margin: 0 30rpx;
			width: 240rpx;
			text-align: center;
			color: $main-color;
			font-size: 28rpx;
		}

		.active {
			background: $main-color;
			color: #fff;
		}
	}

	.body {

		.tabs_item {
			padding: 30rpx;

			.item {
				.title {
					font-size: 28rpx;
					font-weight: 600;
					padding: 10rpx 0;
				}

				.lead {
					line-height: 1.7;
					color: #808080;
					font-size: 24rpx;
				}
			}
		}

		.waterfall-item {
			overflow: hidden;
			margin-top: 30rpx;
			border-radius: 6px;
			padding: 20rpx;
			
			.waterfall-item__image {
				.cover {
					width: 750rpx;
				}
			}

			.content {
				padding: 20rpx 0 0;

				.label_list {
					.text {
						background: #FFE3D6;
						padding: 6rpx 28rpx;
						color: $main-color;
						margin: 0 10rpx 10rpx 0;
					}
				}

				.title {
					font-size: 28rpx;
					font-weight: 600;
					margin-bottom: 20rpx;
				}

				.click {
					font-size: 28rpx;
					font-weight: 500;
					color: #777777;

					.iconfont {
						margin-right: 4rpx;
						font-size: 28rpx;
					}
				}
			}
		}
	}

	.make {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0 20rpx 40rpx;
		background: linear-gradient(180.00deg, #ff4e00 0%, #e40000 100%);
		color: #fff;

		.content {
			flex: none;

			.item {
				text-align: center;
				padding: 20rpx 30rpx;
			}

			.iconfont {
				font-size: 36rpx;
			}

			.lead {
				font-size: 28rpx;
			}

			.icon {
				height: 56rpx;
			}
		}

		.to_make {
			flex: 1;
			margin-left: 40rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #fb764c;
			border-radius: 46rpx;
			text-align: center;
			font-size: 28rpx;
		}
	}

	.modal {
		width: 100%;

		.title {
			text-align: center;
		}

		.lead {
			font-size: 26rpx;
			color: #000;
			font-weight: 500;
			text-align: center;
			padding: 20rpx 0 10rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #C1C1C1;
			padding: 20rpx 0;

			.iconfont {
				color: #D50000;
				margin-right: 6rpx;
			}
		}

		.sibmit {
			.text {
				padding-left: 6rpx;
				font-size: 26rpx;
			}
		}

		.describe {
			text-align: center;
			color: #989898;
			padding: 20rpx 0;
		}
	}
</style>