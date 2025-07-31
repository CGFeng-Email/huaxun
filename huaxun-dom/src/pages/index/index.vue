<template>
	<!-- 导航栏 -->
	<home-navbar :pageScroll="pageScroll"></home-navbar>

	<!-- banner -->
	<view class="banner_box">
		<swiper class="banner" autoplay circular skip-hidden-item-layout>
			<swiper-item v-for="item in banner" :key="item.id">
				<view class="item">
					<image class="img" :src="item.thumb" mode="scaleToFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="menus flex">
			<view class="box">
				<view class="name">A股上市</view>
				<view class="lead">专注豪宅装修26年</view>
			</view>
			<view class="box">
				<view class="name">A160项国家专利</view>
				<view class="lead">全自营 高品质</view>
			</view>
			<view class="box">
				<view class="name">超10万户</view>
				<view class="lead">高净值家庭推荐</view>
			</view>
		</view>
		<view class="banner_icon">
			<ToBottomAnimate></ToBottomAnimate>
		</view>
	</view>

	<!-- 弹窗栏目 -->
	<view class="consult justify_center">
		<view class="item" @click="openModal(0)">
			<view class="cover_box flex_center">
				<image class="cover" src="/static/img/consult_li1.png" mode="widthFix"></image>
			</view>
			<view class="lead">预约量房</view>
		</view>
		<view class="item" @click="openModal(1)">
			<view class="cover_box flex_center">
				<image class="cover" src="/static/img/consult_li2.png" mode="widthFix"></image>
			</view>
			<view class="lead">获取报价</view>
		</view>
		<view class="item" @click="openModal(2)">
			<view class="cover_box flex_center">
				<image class="cover" src="/static/img/consult_li3.png" mode="widthFix"></image>
			</view>
			<view class="lead">预约设计师</view>
		</view>
		<view class="item" @click="openModal(3)">
			<view class="cover_box flex_center">
				<image class="cover" src="/static/img/consult_li4.png" mode="widthFix"></image>
			</view>
			<view class="lead">拨打电话</view>
		</view>
	</view>
	<uv-gap height="20" bgColor="#f8f8f8"></uv-gap>

	<!-- 预约弹窗 -->
	<uv-modal ref="modal" @confirm="confirm" :showConfirmButton="false">
		<view class="slot-content modal">
			<view class="title">预约量房</view>
			<view class="lead">
				今日已有 <text class="red">{{ subscribeUserNumber }}</text> 位业主成功预约工程师量房
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
						<text class="text">免费获取报价</text>
					</view>
				</uv-button>
				<view class="describe">
					<text>*将有工作人员与您联系，提供专属服务</text>
				</view>
			</uv-form>
		</view>
	</uv-modal>

	<!-- 在线报价方案 -->
	<view class="scheme">
		<view class="title">获取家装报价</view>
		<view class="lead">
			现已累计有 <uv-count-to :startVal="0" :endVal="106983" duration="3000" color="#D50000" fontSize="36"
				bold></uv-count-to> 位客户成功获取
		</view>
		<view class="item box_shadow box_radius">
			<uv-count-to :startVal="0" :endVal="squarePrice" :decimals="2" decimal="." duration="3000" color="#FF4E00"
				fontSize="36" bold></uv-count-to>
			<text class="ide">元</text>
		</view>
		<view class="item box_shadow justify_center box_radius" @click="openPicker">
			<uv-picker class="picker" ref="picker" confirmColor="#FF4E00" :loading="regionsLoading"
				:columns="addressList" keyName="name" @change="pickerChange" @confirm="pickerConfirm">
			</uv-picker>
			<view class="picker_text  justify_space">
				<text class="text">{{ selectValue }}</text>
				<i class="iconfont icon-xia"></i>
			</view>
		</view>
		<view class="size_box justify_center">
			<view :class="['box', 'box_shadow', 'box_radius', squareIndex == 0 ? 'active' : '']"
				@click="switchSquare(0, 126387)">80-150㎡</view>
			<view :class="['box', 'box_shadow', 'box_radius', squareIndex == 1 ? 'active' : '']"
				@click="switchSquare(1, 226387)">150-300㎡</view>
			<view :class="['box', 'box_shadow', 'box_radius', squareIndex == 2 ? 'active' : '']"
				@click="switchSquare(2, 326387)">300-600㎡</view>
			<view :class="['box', 'box_shadow', 'box_radius', squareIndex == 3 ? 'active' : '']"
				@click="switchSquare(3, 426387)">600㎡以上</view>
		</view>
		<view class="item box_shadow box_radius">
			<uv-input class="input" v-model="mobile" type="number" placeholder="请输入您的手机号码" color="#000"
				suffixIcon="phone" border="none" fontSize="13px" suffixIconStyle="font-size: 18px;" :customStyle="{
					height: '100rpx',
					'line-height': '100rpx',
				}" placeholderStyle="#5E5E5E">
			</uv-input>
		</view>
		<view class="btn">
			<uv-button color="#FF4E00" openType="contact" :customStyle="{
				height: '100rpx',
				'line-height': '100rpx'
			}">
				<view class="sibmit flex">
					<i class="iconfont icon-Telegram"></i>
					<text class="text">免费获取报价</text>
				</view>
			</uv-button>
		</view>
		<view class="lead textCenter">
			*将有工作人员与您联系，提供专属服务
		</view>
	</view>

	<!-- 案例swiper -->
	<view class="case_swiper">
		<swiper class="swiper" autoplay circular skip-hidden-item-layout @change="caseSwiperChange"
			:current="caseIndex">
			<swiper-item class="item" v-for="(item,index) in 6" :key="index" @click="openCaseDetails">
				<image class="cover" src="/static/img/case_swiper_li1.jpg" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view class="case_main img_bg"
			style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
			<view class="title">“精品案例”</view>
			<swiper class="swiper_main" autoplay @change="caseSwiperChange" :current="caseIndex">
				<swiper-item class="item" v-for="(item,index) in 6" :key="index" @click="openCaseDetails">
					<view class="name">《琉光·雅寓》</view>
				</swiper-item>
			</swiper>
			<view class="more" @click="openCase">查看更多案例</view>
		</view>
	</view>
	<uv-gap height="20" bgColor="#f8f8f8"></uv-gap>

	<!-- 团队 -->
	<view class="teams img_bg"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="title">“设计团队”</view>
		<view class="lead">全国5000+设计师任您选，让您的家焕然一新！</view>
		<swiper class="swiper" autoplay circular skip-hidden-item-layout>
			<swiper-item class="item justify_space" v-for="(item,index) in 6" :key="index" @click="openDesignDetails">
				<view class="modia">
					<image class="cover" src="/static/img/teams_name1.jpg" mode="scaleToFill"></image>
				</view>
				<view class="content">
					<view class="head">
						<text class="name">朱炎东</text>
						<text class="post">总设计师</text>
					</view>
					<view class="lead">
						从事室内设计行业24年擅长风格：新中式，现代简约风格
					</view>
					<view class="list flex">
						<image class="cover" src="/static/img/team_name_li1.jpg" mode="widthFix"></image>
						<image class="cover" src="/static/img/team_name_li1.jpg" mode="widthFix"></image>
						<image class="cover" src="/static/img/team_name_li1.jpg" mode="widthFix"></image>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="common_more inlineBlock" @click="openDesign">查看更多设计师</view>
	</view>
	<uv-gap height="20" bgColor="#f8f8f8"></uv-gap>

	<!-- 管家团队 -->
	<view class="teams img_bg"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="title">“工程管家”</view>
		<view class="lead">让您温馨的家有专属的管家把控</view>
		<swiper class="stewoad_swiper" autoplay circular :display-multiple-items="3" skip-hidden-item-layout>
			<swiper-item class="item" v-for="(item,index) in 6" :key="index" @click="openStewardDetails">
				<view class="modia">
					<image class="cover" src="/static/img/team_techer1.jpg" mode="scaleToFill"></image>
				</view>
				<view class="name">朱炎东</view>
				<view class="port inlineBlock">高级管家</view>
			</swiper-item>
		</swiper>
		<view class="common_more inlineBlock" @click="openSteward">查看更多管家</view>
	</view>
	<uv-gap height="20" bgColor="#f8f8f8"></uv-gap>

	<!-- 项目 -->
	<view class="project img_bg"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="title">“工程监控”</view>
		<view class="sub_head">匠心品质，环保筑家</view>
		<view class="list">
			<view class="row flex">
				<view class="col_md">
					<view class="item box_radius box_shadow">
						<image class="cover" src="/static/img/project_li1.jpg" mode="scaleToFill"></image>
						<view class="name">10</view>
						<view class="lead">10大工程流程管控</view>
					</view>
				</view>
				<view class="col_md">
					<view class="item box_radius box_shadow">
						<image class="cover" src="/static/img/project_li2.jpg" mode="scaleToFill"></image>
						<view class="name">10</view>
						<view class="lead">6大保障</view>
					</view>
				</view>
				<view class="col_md">
					<view class="item box_radius box_shadow">
						<image class="cover" src="/static/img/project_li3.jpg" mode="scaleToFill"></image>
						<view class="name">500+</view>
						<view class="lead">验收节点</view>
					</view>
				</view>
				<view class="col_md">
					<view class="item box_radius box_shadow">
						<image class="cover" src="/static/img/project_li4.jpg" mode="scaleToFill"></image>
						<view class="name">20+</view>
						<view class="lead">国家发明及实用新专利</view>
					</view>
				</view>
				<view class="col_md">
					<view class="item box_radius box_shadow">
						<image class="cover" src="/static/img/project_li4.jpg" mode="scaleToFill"></image>
						<view class="name">环保材料</view>
						<view class="lead">全球甄选，专业定制</view>
					</view>
				</view>
				<view class="col_md">
					<view class="item box_radius box_shadow">
						<image class="cover" src="/static/img/project_li5.jpg" mode="scaleToFill"></image>
						<view class="name">无忧售后</view>
						<view class="lead">一次装修，终身维护</view>
					</view>
				</view>
				<view class="common_more inlineBlock" @click="openProject">查看更多</view>
			</view>
		</view>
	</view>
	<uv-gap height="20" bgColor="#f8f8f8"></uv-gap>

	<!-- 装修案例 -->
	<view class="decoration_case img_bg"
		style="background-image: url('https://project-1317202885.cos.ap-guangzhou.myqcloud.com/case_main_bg.jpg');">
		<view class="title">“装修知识”</view>
		<view class="sub_head">您的装修之旅，从学习装修知识开始</view>
		<swiper class="swiper" autoplay skip-hidden-item-layout circular next-margin="60px">
			<swiper-item class="item" v-for="(item,index) in 6" :key="index" @click="openKnowledgeDeatails">
				<view class="box box_radius box_shadow">
					<view class="modia">
						<image class="cover" src="/static/img/decoration_li1.jpg" mode="scaleToFill"></image>
					</view>
					<view class="lead">
						轻奢大宅设计，呼之欲出的高级感，越看越心水
					</view>
					<view class="date">
						2025.06.09
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="common_more inlineBlock" @click="openKnowledge">查看更多知识</view>
	</view>

	<!-- 登录 -->
	<Login :show="login" @loginHide="loginHide"></Login>

	<!-- 底部栏 -->
	<tabbar></tabbar>
</template>

<script setup>
	import HomeNavbar from '@/component/homeNavbar/index.vue';
	import Tabbar from '@/component/tabbar/index.vue';
	import ToBottomAnimate from '@/component/toBottomAnimate/index.vue';
	import regions from '@/static/json/regions.json';
	import {
		onPageScroll
	} from '@dcloudio/uni-app';
	import {
		ref,
		computed,
		onMounted,
		nextTick
	} from 'vue';
	import {
		postBanner,
		subscribeNumber
	} from '../../request/api.js';

	const pageScroll = ref(0);
	const squareIndex = ref(0);
	const squarePrice = ref(126387);
	const modal = ref(null);
	const form = ref(null);
	const picker = ref(null);
	const modalIndex = ref(0);
	const login = ref(false);
	const banner = ref([]);
	const subscribePopupIndex = ref(0); // 预约弹窗下标
	const subscribeUserNumber = ref(0); // 预约弹窗客户预约数量
	const today_measure_sum = ref(0); // 今日预约量房客户数量
	const today_quotation_sum = ref(0); // 今日家装报价客户数量
	const today_designer_sum = ref(0); // 今日预约设计师客户数量

	const loginHide = () => {
		login.value = false;
	}

	const switchSquare = (index, price) => {
		squareIndex.value = index;
		squarePrice.value = price;
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

	const openModal = (index) => {
		const token = uni.getStorageSync('token');

		if (!token) {
			login.value = true;
			return;
		}

		if (index == 0) {
			subscribeUserNumber.value = today_measure_sum.value;
		} else if (index == 1) {
			subscribeUserNumber.value = today_quotation_sum.value;
		} else if (index == 2) {
			subscribeUserNumber.value = today_designer_sum.value;
		} else {
			subscribeUserNumber.value = 0;
		}

		subscribePopupIndex.value = index;

		modal.value.open();
	}

	const submit = () => {
		form.value.validate().then(res => {
			console.log('res');
		}).catch(err => {
			console.log('err');
		})
	}

	/* 省市区 */
	const regionsLoading = ref(true); // 加载
	const provinces = ref([]); // 省
	const citys = ref([]); // 市
	const areas = ref([]); // 区
	const pickerValue = ref([0, 0, 0]); // 选中的
	const selectValue = ref('请选择城市地址');

	const handlePickValueDefault = () => {
		console.log('regions', regions);
		// 设置省
		provinces.value = regions.sort((left, right) => (Number(left.code) > Number(right.code) ? 1 : -1));
		// 设置市
		citys.value = provinces.value[pickerValue.value[0]]?.children || [];
		// 设置区
		areas.value = citys.value[pickerValue.value[1]]?.children || [];
		// 停止加载
		regionsLoading.value = false;
	}

	const addressList = computed(() => {
		return [provinces.value, citys.value, areas.value];
	})

	const openPicker = () => {
		picker.value.open();
	}

	const pickerChange = (e) => {
		if (regionsLoading.value) return;
		const {
			columnIndex,
			index,
			indexs
		} = e
		// 改变了省
		if (columnIndex === 0) {
			citys.value = provinces.value[index]?.children || [];
			areas.value = citys.value[0]?.children || [];
			picker.value.setIndexs([index, 0, 0], true);
		} else if (columnIndex === 1) {
			areas.value = citys.value[index]?.children || [];
			picker.value.setIndexs(indexs, true);
		}
	}

	const pickerConfirm = (e) => {
		console.log('确认选择的地区：', `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`);
	}

	// 案例swiper
	const caseIndex = ref(0);
	const caseSwiperChange = (e) => {
		caseIndex.value = e.detail.current;
	}

	// 装修知识
	const decorationList = ref([
		'/static/img/decoration_li1.jpg',
		'/static/img/decoration_li1.jpg',
		'/static/img/decoration_li1.jpg'
	])

	const openCase = () => {
		uni.switchTab({
			url: '/pages/case/index'
		})
	}

	const openCaseDetails = () => {
		uni.navigateTo({
			url: '/pages/case/details'
		})
	}

	const openDesign = () => {
		uni.switchTab({
			url: '/pages/design/index'
		})
	}

	const openDesignDetails = () => {
		uni.navigateTo({
			url: '/pages/design/details'
		})
	}

	const openSteward = () => {
		uni.navigateTo({
			url: '/pages/steward/index'
		})
	}

	const openStewardDetails = () => {
		uni.navigateTo({
			url: '/pages/steward/details'
		})
	}

	const openProject = () => {
		uni.navigateTo({
			url: '/pages/project/index'
		})
	}

	const openKnowledge = () => {
		uni.navigateTo({
			url: '/pages/knowledge/index'
		})
	}

	const openKnowledgeDeatails = () => {
		uni.navigateTo({
			url: '/pages/knowledge/details'
		})
	}

	onMounted(async () => {
		handlePickValueDefault();

		const bannerList = await postBanner({
			custom: {
				catch: true,
				toast: false
			}
		});

		banner.value = bannerList.lists;

		const getSubscribeNumber = await subscribeNumber({
			custom: {
				catch: true,
				toast: false
			}
		})

		today_designer_sum.value = getSubscribeNumber.today_designer_sum;
		today_measure_sum.value = getSubscribeNumber.today_measure_sum;
		today_quotation_sum.value = getSubscribeNumber.today_quotation_sum;
	})

	onPageScroll((e) => {
		if (e.scrollTop > 300) return;
		pageScroll.value = e.scrollTop;
	})
</script>

<style lang="scss" scoped>
	.banner_box {
		position: relative;

		.banner {
			height: 100vh;

			image {
				width: 100%;
				height: 100vh;
			}
		}

		.menus {
			position: absolute;
			bottom: 25%;
			left: 0;
			width: 100%;

			.box {
				flex: 1;
				padding: 0 10rpx;
				text-align: center;

				.name {
					font-size: 28rpx;
					font-weight: 600;
					color: $main-color;
					margin-bottom: 10rpx;
				}

				.lead {
					font-size: 20rpx;
					color: #fff;
				}
			}
		}

		.banner_icon {
			position: absolute;
			bottom: 17%;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}

	.consult {
		padding: 30rpx 0;

		.item {
			flex: 1;
			padding: 20rpx;
			text-align: center;

			.cover_box {
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
				background: #FFF4EF;
				margin: auto;

				.cover {
					width: 40rpx;
				}
			}

			.lead {
				margin-top: 20rpx;
				font-weight: 500;
			}
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

	.scheme {
		padding: 40rpx 20rpx;

		.lead {
			margin: 20rpx 0;
			font-size: 26rpx;
			color: #848484;
		}

		.item {
			background: #FBFBFB;
			height: 100rpx;
			line-height: 100rpx;
			text-align: right;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			position: relative;
			border: 1px solid #C5C5C5;

			.ide {
				color: #FF4E00;
				padding-left: 6rpx;
				font-size: 24rpx;
				font-weight: 600;
			}

			.picker {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: #D50000;
			}


			.picker_text {

				.text,
				.iconfont {
					color: #5E5E5E;
					font-size: 26rpx;
				}
			}

			.input {
				height: 100rpx;
			}
		}

		.size_box {
			margin: 0 -10rpx;
			margin-bottom: 20rpx;

			.box {
				flex: 1;
				margin: 0 10rpx;
				background: #FBFBFB;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
				color: #5E5E5E;
				font-size: 26rpx;
				font-weight: 400;
				border: 1px solid #C5C5C5;
			}

			.active {
				border-color: $main-color;
				color: #000;
				font-weight: 500;
			}
		}

		.btn {
			.iconfont {
				margin-right: 6rpx;
			}

			.text {
				font-size: 28rpx;
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

	.teams {
		padding: 60rpx 20rpx;
		text-align: center;

		.title {
			color: $main-color;
			text-align: center;
			font-size: 34rpx;
			font-weight: 600;
			margin-bottom: 20rpx;
		}

		.lead {
			font-size: 26rpx;
			color: #a3a2a1;
			text-align: center;
		}

		.swiper {
			margin: 40rpx 0 20rpx;

			.item {
				background: #454545;
				align-items: start;

				.modia {
					flex: none;
					width: 250rpx;

					.cover {
						width: 100%;
						height: 300rpx;
					}
				}

				.content {
					flex: 1;
					padding: 30rpx 20rpx 0 30rpx;
					text-align: left;

					.head {
						.name {
							padding: 4rpx 10rpx;
							background: $main-color;
							color: #fff;
							font-size: 28rpx;
						}

						.post {
							font-size: 24rpx;
							color: #fff;
							padding-left: 10rpx;
						}
					}

					.lead {
						font-size: 24rpx;
						color: #fff;
						margin: 10rpx 0;
						text-align: left;
					}

					.list {
						.cover {
							width: 125rpx;
							margin: 0 10rpx 10rpx 0;
						}
					}
				}
			}
		}

		.stewoad_swiper {
			margin: 40rpx 0 20rpx;
			height: 186px;

			.item {
				padding: 0 10rpx;

				.modia {
					height: 216rpx;
					border-radius: 50%;
					overflow: hidden;
					background: #fff;
					padding: 6rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.name {
					font-size: 24rpx;
					color: #fff;
					padding: 10rpx 0;
				}

				.port {
					background: $main-color;
					color: #fff;
					font-size: 24rpx;
					padding: 6rpx 14rpx;
				}
			}
		}
	}

	.project {
		padding: 40rpx 0;

		.title {
			color: $main-color;
			text-align: center;
			font-size: 34rpx;
			font-weight: 600;
			margin-bottom: 20rpx;
		}

		.sub_head {
			font-size: 26rpx;
			color: #a3a2a1;
			text-align: center;
		}

		.list {
			padding-top: 40rpx;

			.row {
				flex-wrap: wrap;
				padding: 0 5rpx;

				.col_md {
					padding: 0 10rpx;
				}

				.item {
					background: #fff;
					padding: 30rpx 20rpx;
					width: 350rpx;
					margin-bottom: 20rpx;
					text-align: center;

					.cover {
						width: 170rpx;
						height: 170rpx;
						border-radius: 50%;
					}

					.name {
						font-size: 46rpx;
						color: $main-color;
						font-weight: 600;
						margin: 10rpx 0;
					}
				}
			}
		}
	}

	.decoration_case {
		padding: 40rpx 10rpx 60rpx;
		text-align: center;

		.title {
			color: $main-color;
			text-align: center;
			font-size: 34rpx;
			font-weight: 600;
			margin-bottom: 20rpx;
		}

		.sub_head {
			font-size: 26rpx;
			color: #a3a2a1;
			text-align: center;
		}

		.swiper {
			margin: 30rpx 0;
			height: 496rpx;

			.item {
				padding: 0 10rpx;

				.box {
					padding: 20rpx;
					background: #fff;
				}

				.modia {
					.cover {
						width: 100%;
						height: 310rpx;
					}
				}

				.lead {
					font-size: 28rpx;
					font-weight: 500;
					color: #000;
					padding: 10rpx 0;
					text-align: left;
				}

				.date {
					font-size: 24rpx;
					color: #A2A2A2;
					text-align: left;
				}
			}
		}
	}
</style>