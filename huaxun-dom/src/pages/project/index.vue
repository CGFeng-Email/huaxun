<template>
	<Navbar title="工程管家" :pageScroll="pageScroll"></Navbar>

	<view class="banner">
		<image class="cover" :src="details.control_image" mode="widthFix"></image>
	</view>

	<view class="flow img_bg" style="background: url(/static/img/project_bg.jpg);">
		<view class="head flex_center">
			<uv-count-to :startVal="0" :endVal="details.process_control_number" color="#FF4E00" fontSize="56"
				bold></uv-count-to>
			<text class="title">{{details.process_control_title}}</text>
		</view>
		<view class="sub_head">
			{{details.process_control_remark}}
		</view>
		<swiper class="swiper" :current="currentIndex" :display-multiple-items="2" skip-hidden-item-layout circular
			next-margin="40px" @change="swiperChange">
			<swiper-item :class="['item', 'animate', currentIndex == index ? 'active' : '']"
				v-for="(item,index) in details.process_control_list" :key="item.title" @click="swiperClick(index)">
				<view class="box justify_center">
					<text class="num">{{index + 1}}</text>
					<text class="text over1">{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
		<swiper class="swiper_body" :interval="8000" autoplay skip-hidden-item-layout circular next-margin="40px">
			<swiper-item class="item" v-for="(item,index) in details.process_control_list[currentIndex].list"
				:key="item.title" @click="previewImg(index)">
				<view class="box box_radius box_shadow">
					<view class="cover_box">
						<image class="cover" :src="item.image" mode="scaleToFill"></image>
					</view>
					<view class="lead">
						{{item.remark}}
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<view class="safeguard img_bg"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="head flex_center">
			<uv-count-to :startVal="0" :endVal="details.engineer_guard_number" color="#FF4E00" fontSize="56"
				bold></uv-count-to>
			<text class="title">{{details.engineer_guard_title}}</text>
		</view>
		<view class="sub_head">
			{{details.engineer_guard_remark}}
		</view>
		<swiper class="swiper" :interval="5000" autoplay skip-hidden-item-layout circular next-margin="120px">
			<swiper-item class="item" v-for="(item,index) in details.engineer_guard_list" :key="item.title">
				<view class="box box_radius box_shadow">
					<view class="cover_box">
						<image class="cover" :src="item.image" mode="scaleToFill"></image>
					</view>
					<view class="content">
						<image class="bg" src="/static/img/safeguard_content.png" mode="scaleToFill"></image>
						<view class="wrap justify_space">
							<text class="num">0{{index+1}}</text>
							<text class="name">{{item.title}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>

	<!-- 证书 -->
	<view class="honor img_bg"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="head flex_center">
			<uv-count-to :startVal="0" :endVal="details.invention_patent_number" color="#FF4E00" fontSize="56"
				bold></uv-count-to>
			<text class="title">{{details.invention_patent_title}}</text>
		</view>
		<view class="sub_head">
			{{details.invention_patent_remark}}
		</view>
		<swiper class="swiper" :interval="5000" autoplay skip-hidden-item-layout circular :display-multiple-items="2"
			next-margin="60px">
			<swiper-item class="item" v-for="(item,index) in details.invention_patent_list" :key="item.image">
				<view class="box box_radius box_shadow">
					<image class="cover" :src="item.image" mode="scaleToFill"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>

	<!-- 质量 -->
	<swiper class="project_cover" :interval="5000" autoplay skip-hidden-item-layout circular>
		<swiper-item class="item" v-for="(item,index) in details.quality_image" :key="item.image">
			<view class="box box_radius box_shadow">
				<image class="cover" :src="item" mode="scaleToFill"></image>
			</view>
		</swiper-item>
	</swiper>

	<view class="serve img_bg"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="head flex_center">
			<text class="num">{{details.guarantee_left_title}}</text>
			<text class="title">{{details.guarantee_right_title}}</text>
		</view>
		<view class="serve_list">
			<view class="item">
				<image class="cover" :src="details.guarantee_image" mode="widthFix"></image>
				<view class="title">
					全国联保
				</view>
			</view>

			<view class="box flex" v-for="(item,index) in details.sale_service_list" :key="item.title">
				<view class="content">
					<view class="icon">
						<image class="cover" :src="item.image" mode="widthFix"></image>
					</view>
					<view class="title">
						{{item.title}}
					</view>
					<view class="lead">
						{{item.remark}}
					</view>
				</view>
				<view class="cover_box">
					<image class="cover" :src="item.icon" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
	</view>
	
	<view class="form img_bg"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="modal slot-content box_radius box_shadow">
			<view class="title">预约全屋装修</view>
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
				<view class="tips flex">
					<i class="iconfont icon-gantanhao"></i>
					<text>信息保护中，请放心填写</text>
				</view>
				<uv-button color="#FF4E00" @click="submit">
					<view class="sibmit flex">
						<i class="iconfont icon-Telegram"></i>
						<text class="text">免费获取报价</text>
					</view>
				</uv-button>
				<view class="describe">
					<text>*将有工作人员与您联系，提供专属服务</text>
				</view>
			</uv-form>
		</view>
	</view>
	
	<!-- 登录 -->
	<Login :show="login" @loginHide="loginHide" :placeHeight="false"></Login>
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
		projectDetailsApi,
		getAQuote
	} from '../../request/api.js';
	
	const login = ref(false);
	const currentIndex = ref(0);
	const pageScroll = ref(0);
	const form = ref(null);
	const details = ref({});

	const swiperChange = (e) => {
		currentIndex.value = e.detail.current
	}

	const swiperClick = (e) => {
		currentIndex.value = e;
	}

	const previewImg = (index) => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});

		const list = details.value.process_control_list[currentIndex.value].list.map(item => {
			return item.image
		})

		uni.previewImage({
			current: index,
			urls: list
		})

		uni.hideLoading();
	}

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

	const submit = () => {
		form.value.validate().then(async res => {
			console.log('res');
			
			const token = uni.getStorageSync('token');
			
			if (!token) {
				login.value = true;
				return;
			}
			
			const subscribe = await getAQuote({
				real_name: modalForm.value.name,
				mobile: modalForm.value.mobile
			}, {
				custom: {
					catch: true,
					token: true,
					toast: true,
					msg: '预约成功'
				}
			})
			
			console.log('subscribe', subscribe);
			if(subscribe.code == 1) {
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
	
	const loginHide = () => {
		login.value = false;
	}

	onPageScroll((e) => {
		pageScroll.value = e.scrollTop;
	})

	const getProjectData = async () => {
		const res = await projectDetailsApi({
			custom: {
				catch: true
			}
		})

		console.log('projectDetails', res);
		if (res.code == 1) {
			details.value = res.data
		}
	}

	onMounted(() => {
		getProjectData();
	})
</script>

<style lang="scss" scoped>
	.banner {
		.cover {
			width: 100%;
		}
	}

	.flow {
		padding: 60rpx 20rpx;

		.head {
			.title {
				font-weight: 600;
				padding-left: 8rpx;
			}

		}

		.sub_head {
			font-size: 26rpx;
			color: #686868;
			font-weight: 500;
			padding: 10rpx 0;
			text-align: center;
			margin-bottom: 40rpx;
		}

		.swiper {
			height: 80rpx;
			margin-bottom: 40rpx;

			.item {
				padding: 0 30rpx;

				.box {
					height: 80rpx;
					border-bottom: 4rpx solid $main-color;

					.num {
						color: $main-color;
						font-weight: 600;
						font-size: 34rpx;
					}

					.text {
						padding-left: 6rpx;
						font-size: 24rpx;
						font-weight: 500;
					}
				}
			}

			.active {
				border-radius: 46rpx;
				background: $main-color;

				.box {
					.num {
						color: #fff;
					}

					.text {
						color: #fff;
					}
				}
			}
		}

		.swiper_body {
			height: 410rpx;

			.item {
				padding: 0 20rpx;

				.box {
					padding: 10rpx 10rpx 0;
					background: #fff;

					.cover_box {
						.cover {
							width: 100%;
							height: 300rpx;
						}
					}

					.lead {
						text-align: center;
						font-size: 28rpx;
						font-weight: 500;
						padding: 20rpx 0;
					}
				}
			}
		}
	}

	.safeguard {
		padding: 80rpx 20rpx;

		.head {
			.title {
				font-weight: 600;
				padding-left: 8rpx;
				color: #fff;
			}
		}

		.sub_head {
			font-size: 26rpx;
			color: #fff;
			font-weight: 500;
			padding: 10rpx 0;
			text-align: center;
			margin-bottom: 50rpx;
		}

		.swiper {
			height: 520rpx;

			.item {
				padding: 0 20rpx;

				.box {
					position: relative;

					.cover_box {
						.cover {
							width: 100%;
							height: 520rpx;
						}
					}

					.content {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;

						.bg {
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							height: 120rpx;
						}

						.wrap {
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							height: 100rpx;
							z-index: 1;
							padding: 0 40rpx;

							.num,
							.name {
								font-size: 34rpx;
								font-weight: 600;
								color: #fff;
							}
						}
					}
				}
			}
		}
	}

	.honor {
		padding: 80rpx 20rpx;

		.head {
			.title {
				font-weight: 600;
				padding-left: 8rpx;
				color: #fff;
			}
		}

		.sub_head {
			font-size: 26rpx;
			color: #fff;
			font-weight: 500;
			padding: 10rpx 0;
			text-align: center;
			margin-bottom: 50rpx;
		}

		.swiper {
			height: 420rpx;

			.item {
				padding: 0 20rpx;

				.cover {
					width: 100%;
					height: 380rpx;
				}
			}
		}
	}

	.project_cover {
		height: 1200rpx;

		.cover {
			width: 100%;
			height: 1200rpx;
		}
	}

	.serve {
		padding: 80rpx 20rpx;

		.head {
			.num {
				font-weight: 600;
				color: $main-color;
				font-size: 34rpx;
			}

			.title {
				font-weight: 600;
				padding-left: 8rpx;
				color: #fff;
			}
		}

		.serve_list {
			padding-top: 50rpx;

			.item {
				position: relative;
				margin-bottom: 20rpx;

				.cover {
					width: 100%;
				}

				.title {
					position: absolute;
					left: 0;
					bottom: 60rpx;
					padding: 0 40rpx;
					color: #fff;
					font-size: 34rpx;
					font-weight: 500;
				}
			}

			.box {
				height: 280rpx;
				background: #fff;
				margin-bottom: 20rpx;

				.icon {
					.cover {
						width: 32rpx;
					}
				}

				.content {
					flex: 1;
					padding: 20rpx;

					.iconfont {
						color: $main-color;
						font-size: 38rpx;
						font-weight: 500;
					}

					.title {
						font-size: 28rpx;
						font-weight: 500;
						color: #000;
						padding: 10rpx 0;
					}

					.lead {
						font-size: 24rpx;
						color: #A5A5A5;
					}
				}

				.cover_box {
					width: 320rpx;
					flex: none;

					.cover {
						width: 100%;
						height: 280rpx;
					}
				}
			}

			.box:nth-child(odd) {
				flex-flow: row-reverse;
			}
		}
	}

	.form {
		padding: 100rpx 20rpx;

		.modal {
			width: 100%;
			background: #fff;
			padding: 60rpx 40rpx;

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

			::v-deep .uv-form-item__body__right__message {
				margin-left: 0 !important;
			}
		}
	}
</style>