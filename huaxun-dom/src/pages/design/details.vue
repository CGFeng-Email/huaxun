<template>
	<Navbar title="设计师" :pageScroll="pageScroll"></Navbar>
	<view class="banner">
		<image class="bg_cover" src="/static/img/banner_bg.jpg" mode="scaleToFill"></image>
		<view class="info flex">
			<view class="head_portrait">
				<image class="cover" :src="details.image" mode="widthFix"></image>
			</view>
			<view class="content">
				<view class="head">
					<text class="name inlineBlock">{{details.real_name}}</text>
					<text class="text inlineBlock">{{details.grade_name}}</text>
				</view>
				<view class="lead justify_center">
					<text class="name">服务指数：</text>
					<uv-rate :count="5" v-model="details.service_index" activeColor="#FF4E00" size="24" readonly
						activeIcon="heart-fill" inactiveIcon="heart"></uv-rate>
				</view>
				<view class="lead" v-if="details.service_place">
					<text class="name">服务地区：</text>
					<text class="text">{{details.service_place}}</text>
				</view>
				<view class="lead">
					{{details.remark}}
				</view>
				<view class="lead">
					<text class="name">擅长风格：</text>
					<text class="text">{{details.style_name}}</text>
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
					<uv-parse :selectable="true" :lazyLoad="true" :content="details.qualification"></uv-parse>
				</view>
			</view>
			<view class="item">
				<view class="title">设计理念</view>
				<view class="lead">
					{{details.design_idea}}
				</view>
			</view>
			<view class="item">
				<view class="title">工作获奖经历</view>
				<view class="lead">
					<uv-parse :selectable="true" :lazyLoad="true" :content="details.award"></uv-parse>
				</view>
			</view>
		</view>
		<view class="tabs_item" v-else>
			<view v-for="(item, index) in caseList" :key="index" class="waterfall-item box_radius box_shadow" @click="openCaseDetails(item.id)">
				<view class="waterfall-item__image">
					<image class="cover" :src="item.image" mode="widthFix"></image>
				</view>
				<view class="content">
					<view class="title">
						{{item.title}}
					</view>
					<view class="lead">
						{{item.design_idea}}
					</view>
					<view class="bottom justify_space">
						<view class="label_list">
							<text class="text inlineBlock box_radius box_shadow">{{item.style_name}}</text>
						</view>
						<view class="property justify_space">
							<view class="click justify_center">
								<i class="iconfont icon-chakan"></i>
								<text class="text">{{item.view_actual}}</text>
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
				<view class="icon" @click="isCollect">
					<i class="iconfont inlineBlock icon-shoucang" v-if="designCollect"></i>
					<i class="iconfont inlineBlock icon-shoucang1" v-else></i>
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
				今日已有 <text class="red">{{ subscribeUserNumber }}</text> 位业主成功预约设计师
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
					<view class="sibmit justify_center">
						<i class="iconfont icon-Telegram"></i>
						<text class="text">确认提交</text>
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
		onLoad,
		onPageScroll
	} from '@dcloudio/uni-app';

	import {
		designDetailsApi,
		caseListApi,
		designCollectApi,
		subscribeNumberApi,
		subscribeStylist
	} from '../../request/api.js';

	const id = ref(null);
	const recommend = ref(4);
	const tabsIndex = ref(0);
	const pageScroll = ref(0);
	const modal = ref(null);
	const form = ref(null);
	const details = ref({});
	const caseList = ref([]);
	const designCollect = ref(0); // 是否收藏
	const subscribeUserNumber = ref(0); // 预约设计师数量

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
		form.value.validate().then(async (res) => {
			console.log('res');
			// 预约设计师
			const stylist = await subscribeStylist({
				real_name: modalForm.value.name,
				mobile: modalForm.value.mobile
			}, {
				custom: {
					token: true,
					catch: true,
					toast: true,
					msg: '预约成功'
				}
			})
			console.log('stylist', stylist);
			if (stylist.code == 1) {
				setTimeout(() => {
					form.value.resetFields();
					form.value.clearValidate();
					modal.value.close();
				}, 1000)
			}
		}).catch(err => {
			console.log('err');
		})
	}

	// 收藏、取消收藏
	const isCollect = async () => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});

		const res = await designCollectApi({
			id: id.value,
			type: designCollect.value == 0 ? 1 : 0
		}, {
			custom: {
				catch: true,
				token: true
			}
		})

		if (res.code == 1) {
			designCollect.value = designCollect.value == 0 ? 1 : 0;
		}

		uni.hideLoading();
	}
	
	const openCaseDetails = (id) => {
		uni.navigateTo({
			url: `/pages/case/details?id=${id}`
		})
	}

	onPageScroll((e) => {
		pageScroll.value = e.scrollTop;
	})

	onLoad(async (load) => {
		console.log('load', load);
		if (load.id) {
			id.value = load.id;

			// 设计师详情
			const res = await designDetailsApi({
				id: id.value
			}, {
				custom: {
					catch: true,
					token: true
				}
			})

			console.log('designDeatails', res);
			details.value = res.data;
			designCollect.value = res.data.is_collect;

			// 设计师案例
			const getCaseList = await caseListApi({
				designer_id: id.value
			}, {
				custom: {
					catch: true
				}
			})

			console.log('getCaseList', getCaseList);
			caseList.value = getCaseList.data.lists;

			// 各弹窗用户预约数量
			const getSubscribeNumber = await subscribeNumberApi({}, {
				custom: {
					catch: true
				}
			})
			subscribeUserNumber.value = getSubscribeNumber.data.today_designer_sum;

		}
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

				.lead {
					margin-bottom: 10rpx;
				}

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
					margin-bottom: 10rpx;
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