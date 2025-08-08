<template>
	<Navbar title="工程管家" :pageScroll="pageScroll"></Navbar>

	<view class="banner">
		<image class="bg_cover" src="/static/img/case_main_bg.jpg" mode="scaleToFill"></image>
		<view class="content flex_center">
			<view class="head_portrait">
				<image class="cover" :src="details.image" mode="scaleToFill"></image>
			</view>
			<view class="name">
				{{details.real_name}}
			</view>
			<view class="label">
				<text class="text inlineBlock box_radius">{{details.grade_name}}</text>
			</view>
		</view>
	</view>

	<view class="body">
		<view class="tabs_item">
			<view class="item" v-if="details.qualification">
				<view class="title">个人资质</view>
				<view class="lead">
					<uv-parse :selectable="true" :lazyLoad="true" :content="details.qualification"></uv-parse>
				</view>
			</view>
			<view class="item" v-if="details.design_idea">
				<view class="title">设计理念</view>
				<view class="lead">
					{{details.design_idea}}
				</view>
			</view>
			<view class="item" v-if="details.award">
				<view class="title">工作获奖经历</view>
				<view class="lead">
					<uv-parse :selectable="true" :lazyLoad="true" :content="details.award"></uv-parse>
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
			预约管家
		</view>
	</view>
	<view style="height: 92px;"></view>

	<uv-modal ref="modal" @confirm="confirm" :showConfirmButton="false">
		<view class="slot-content modal">
			<view class="title">预约管家</view>
			<view class="lead">
				今日已有66位业主成功预约管家
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
		onLoad,
		onPageScroll
	} from '@dcloudio/uni-app';

	import {
		stewardDetailsApi,
		subscribeMeasureTheHouse
	} from '../../request/api.js';

	const id = ref(null);
	const modal = ref(null);
	const form = ref(null);
	const stewardCollect = ref(0);
	const details = ref({});
	const subscribeUserNumber = ref(0);

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

	const pageScroll = ref(0);

	onPageScroll((e) => {
		if (e.scrollTop > 300) return;
		pageScroll.value = e.scrollTop;
	})
	
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

	onLoad(async (load) => {
		console.log('load', load);

		if (load.id) {
			id.value = load.id;

			// 管家详情
			const res = await stewardDetailsApi({
				id: id.value
			}, {
				custom: {
					catch: true,
					token: true
				}
			})

			console.log('stewardDeatails', res);
			details.value = res.data;
			stewardCollect.value = res.data.is_collect;
			
			// 各弹窗用户预约数量
			const getSubscribeNumber = await subscribeNumberApi({}, {
				custom: {
					catch: true
				}
			})
			subscribeUserNumber.value = getSubscribeNumber.data.today_measure_sum;
			
		}
	})
</script>

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

		.content {
			padding: 20rpx;
			flex-direction: column;

			.head_portrait {
				width: 228rpx;
				height: 228rpx;
				padding: 8rpx;
				background: #fff;
				border-radius: 50%;
				margin: auto;
				overflow: hidden;

				.cover {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				font-size: 38rpx;
				color: #fff;
				font-weight: 600;
				margin: 20rpx 0;
			}

			.label {
				text-align: center;

				.text {
					padding: 8rpx 20rpx;
					background: $main-color;
					color: #fff;
				}
			}
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
</style>