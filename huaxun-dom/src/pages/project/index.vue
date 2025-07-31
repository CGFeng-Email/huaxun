<template>
	<Navbar title="工程管家" :pageScroll="pageScroll"></Navbar>
	<view class="banner">
		<image class="cover" src="/static/img/project_banner.jpg" mode="widthFix"></image>
	</view>
	<view class="flow img_bg" style="background: url(/static/img/project_bg.jpg);">
		<view class="head flex_center">
			<uv-count-to :startVal="0" :endVal="10" color="#FF4E00" fontSize="56" bold></uv-count-to>
			<text class="title">大流程管控</text>
		</view>
		<view class="sub_head">
			更规范的施工管理，更快的工程交付能力
		</view>
		<swiper class="swiper" autoplay :current="currentIndex" :interval="8000" :display-multiple-items="2"
			skip-hidden-item-layout circular next-margin="40px" @change="swiperChange">
			<swiper-item :class="['item', 'animate',currentIndex == 0 ? 'active' : '']">
				<view class="box justify_center">
					<text class="num">1</text>
					<text class="text over1">基础验收及保护工程</text>
				</view>
			</swiper-item>
			<swiper-item :class="['item', 'animate',currentIndex == 1 ? 'active' : '']">
				<view class="box justify_center">
					<text class="num">2</text>
					<text class="text over1">泥工基础工程</text>
				</view>
			</swiper-item>
			<swiper-item :class="['item', 'animate',currentIndex == 2 ? 'active' : '']">
				<view class="box justify_center">
					<text class="num">3</text>
					<text class="text over1">墙面找平及室内防水工程</text>
				</view>
			</swiper-item>
		</swiper>
		<swiper class="swiper_body" :current="currentIndex" :interval="8000" autoplay skip-hidden-item-layout circular
			next-margin="40px" @change="swiperChange">
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<view class="cover_box">
						<image class="cover" src="/static/img/flow_li1.jpg" mode="scaleToFill"></image>
					</view>
					<view class="lead">
						基础验收及保护工程
					</view>
				</view>
			</swiper-item>
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<view class="cover_box">
						<image class="cover" src="/static/img/flow_li1.jpg" mode="scaleToFill"></image>
					</view>
					<view class="lead">
						泥工基础工程
					</view>
				</view>
			</swiper-item>
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<view class="cover_box">
						<image class="cover" src="/static/img/flow_li1.jpg" mode="scaleToFill"></image>
					</view>
					<view class="lead">
						墙面找平及室内防水工程
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<view class="safeguard img_bg" style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="head flex_center">
			<uv-count-to :startVal="0" :endVal="6" color="#FF4E00" fontSize="56" bold></uv-count-to>
			<text class="title">大保障</text>
		</view>
		<view class="sub_head">
			保障更到位，省心更放心
		</view>
		<swiper class="swiper" :interval="8000" autoplay skip-hidden-item-layout circular next-margin="120px">
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<view class="cover_box">
						<image class="cover" src="/static/img/safeguard_li1.jpg" mode="scaleToFill"></image>
					</view>
					<view class="content">
						<image class="bg" src="/static/img/safeguard_content.png" mode="scaleToFill"></image>
						<view class="wrap justify_space">
							<text class="num">01</text>
							<text class="name">不漏水</text>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<view class="cover_box">
						<image class="cover" src="/static/img/safeguard_li1.jpg" mode="scaleToFill"></image>
					</view>
					<view class="content">
						<image class="bg" src="/static/img/safeguard_content.png" mode="scaleToFill"></image>
						<view class="wrap justify_space">
							<text class="num">02</text>
							<text class="name">不漏水</text>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<view class="cover_box">
						<image class="cover" src="/static/img/safeguard_li1.jpg" mode="scaleToFill"></image>
					</view>
					<view class="content">
						<image class="bg" src="/static/img/safeguard_content.png" mode="scaleToFill"></image>
						<view class="wrap justify_space">
							<text class="num">03</text>
							<text class="name">不漏水</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<view class="honor img_bg" style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="head flex_center">
			<uv-count-to :startVal="0" :endVal="20" color="#FF4E00" fontSize="56" bold></uv-count-to>
			<text class="title">余项国家发明及实用新型专利</text>
		</view>
		<view class="sub_head">
			专利加持，给您更美好的生活体验
		</view>
		<swiper class="swiper" :interval="8000" autoplay skip-hidden-item-layout circular :display-multiple-items="2"
			next-margin="60px">
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<image class="cover" src="/static/img/honor_li1.jpg" mode="scaleToFill"></image>
				</view>
			</swiper-item>
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<image class="cover" src="/static/img/honor_li1.jpg" mode="scaleToFill"></image>
				</view>
			</swiper-item>
			<swiper-item class="item">
				<view class="box box_radius box_shadow">
					<image class="cover" src="/static/img/honor_li1.jpg" mode="scaleToFill"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
	<view class="project_cover">
		<image class="cover" src="/static/img/project_cover.jpg" mode="widthFix"></image>
	</view>
	<view class="serve img_bg" style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="head flex_center">
			<text class="num">一次装修</text>
			<text class="title">终身维护</text>
		</view>
		<view class="serve_list">
			<view class="item">
				<image class="cover" src="/static/img/serve_li1.jpg" mode="widthFix"></image>
				<view class="title">
					全国联保
				</view>
			</view>
			<view class="box flex">
				<view class="content">
					<i class="iconfont icon-31dianpu"></i>
					<view class="title">
						回访活动
					</view>
					<view class="lead">
						每年不定期开展客户回访活动，为客户提供贴心、高效的售后服务
					</view>
				</view>
				<view class="cover_box">
					<image class="cover" src="/static/img/serve_li2.jpg" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="box flex">
				<view class="content">
					<i class="iconfont icon-31dianpu"></i>
					<view class="title">
						客服贴心服务
					</view>
					<view class="lead">
						售后客服专员贴心为您解答交付后遇到的困扰，给您更满意的装修体验。
					</view>
				</view>
				<view class="cover_box">
					<image class="cover" src="/static/img/serve_li3.jpg" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
	</view>
	<view class="form img_bg" style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="modal box_radius box_shadow">
			<view class="title">预约全屋装修</view>
			<view class="lead">
				今日已有66位业主成功获取报价
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
</template>

<script setup>
	import Navbar from '@/component/navbar';
	import {
		ref
	} from 'vue';
	import {
		onPageScroll
	} from '@dcloudio/uni-app';

	const currentIndex = ref(0);
	const pageScroll = ref(0);
	const form = ref(null);

	const swiperChange = (e) => {
		currentIndex.value = e.detail.current
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
		.cover {
			width: 100%;
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
		}
	}
</style>