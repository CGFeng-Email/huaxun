<template>
	<Search></Search>
	<Tabs :type="1" title="等级" :list="gradeList" :offsetTop="0" :currentIndex="gradeIndex" @tabsClick="tabsClick">
	</Tabs>
	<Tabs :type="2" title="风格" :list="styleList" :offsetTop="45" :currentIndex="styleIndex" @tabsClick="tabsClick">
	</Tabs>
	<view class="list">
		<view class="item box_radius box_shadow" v-for="(item,index) in designList" :key="index" @click="openDetails(item.id)">
			<view class="info flex">
				<view class="head_portrait">
					<image class="cover" :src="item.image" mode="scaleToFill"></image>
				</view>
				<view class="content">
					<view class="head">
						<text class="name inlineBlock">{{item.real_name}}</text>
						<text class="text">{{item.grade_name}}</text>
					</view>
					<view class="lead">
						{{item.remark}}
					</view>
					<view class="lead">
						{{item.style_name}}
					</view>
				</view>
			</view>
			<view class="case flex">
				<image class="cover" :src="item2" mode="widthFix" v-for="(item2,index2) in item.images" :key="index2">
				</image>
			</view>
		</view>
		
		<!-- 加载更多 -->
		<uv-load-more :status="status" fontSize="24" color="#000" marginTop="20" marginBottom="50"
			loadmoreText="上拉加载更多" />
	</view>

	<!-- 登录 -->
	<Login :show="login" @loginHide="loginHide"></Login>

	<tabbar></tabbar>
</template>

<script setup>
	import Search from '@/component/search';
	import Tabs from '@/component/tabs';
	import Tabbar from '@/component/tabbar';

	import {
		ref,
		onMounted
	} from 'vue';

	import {
		onReachBottom
	} from '@dcloudio/uni-app';

	import {
		designListApi
	} from '../../request/api.js';

	// 登录弹窗
	const login = ref(null);
	// 等级
	const gradeList = ref([]);
	const gradeIndex = ref(null);
	// 风格
	const styleList = ref([]);
	const styleIndex = ref(null);
	const size = ref(10);
	const page = ref(0);
	const totalPage = ref(0);
	const status = ref('loadmore');
	const rankIndex = ref(0);
	const designList = ref([]);

	const tabsClick = (e) => {
		if (e.type == 1) {
			if (gradeIndex.value == e.index) {
				gradeIndex.value = null;
			} else {
				gradeIndex.value = e.index;
			}
		} else if (e.type == 2) {
			if (styleIndex.value == e.index) {
				styleIndex.value = null;
			} else {
				styleIndex.value = e.index;
			}
		}

		getDesignList()
	}

	const openDetails = (id) => {
		const token = uni.getStorageSync('token');

		if (!token) {
			login.value = true;
			return;
		}

		uni.navigateTo({
			url: `/pages/design/details?id=${id}`
		})
	}

	const loginHide = () => {
		login.value = false;
	}

	const getDesignList = async (more) => {
		if (!more) {
			page.value = 1;
			designList.value = [];
		}

		const res = await designListApi({
			page: page.value,
			size: size.value,
			grade_id: gradeIndex.value != null ? gradeList.value[gradeIndex.value].value : '',
			style_id: styleIndex.value != null ? styleList.value[styleIndex.value].value : ''
		}, {
			custom: {
				catch: true
			}
		});

		console.log('designDetails', res);

		if (res.code == 1) {
			if (more) {
				designList.value = [...designList.value, res.data.lists];
				status.value = 'loadmore';
			} else {
				designList.value = res.data.lists;
				totalPage.value = res.data.page_no;
				if (totalPage.value <= 1) {
					status.value = 'nomore';
				}
			}
		}
	}

	onMounted(() => {
		const commonData = uni.getStorageSync('commonData');
		gradeList.value = commonData.designer_grade_select;
		styleList.value = commonData.style_select;

		getDesignList();
	})

	onReachBottom(() => {
		if (page.value >= totalPage.value) {
			status.value = 'nomore';
		} else {
			status.value = 'loading';
			page.value++;
			getDesignList(true);
		}
	})
</script>

<style>
	page {
		background: #F8F8F8;
	}
</style>

<style lang="scss" scoped>
	.list {
		padding: 20rpx;

		.item {
			padding: 30rpx 30rpx 20rpx;
			margin-bottom: 30rpx;

			.info {
				margin-bottom: 20rpx;

				.head_portrait {
					background: #fff;
					border-radius: 50%;
					width: 180rpx;
					height: 180rpx;
					padding: 6rpx;
					overflow: hidden;
					flex: none;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.content {
					flex: 1;
					padding-left: 20rpx;

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
					}
				}
			}

			.case {
				flex-wrap: wrap;

				.cover {
					width: 200rpx;
					margin: 0 10rpx 10rpx 0;
				}
			}
		}
	}
</style>