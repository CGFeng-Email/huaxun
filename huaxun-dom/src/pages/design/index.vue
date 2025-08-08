<template>
	<Search></Search>
	<Tabs :type="1" title="等级" :list="gradeList" :offsetTop="0" :currentIndex="gradeIndex" @tabsClick="tabsClick">
	</Tabs>
	<Tabs :type="2" title="风格" :list="styleList" :offsetTop="45" :currentIndex="styleIndex" @tabsClick="tabsClick">
	</Tabs>
	<view class="list">
		<view class="item box_radius box_shadow" v-for="(item,index) in 7" :key="index" @click="openDetails">
			<view class="info flex">
				<view class="head_portrait">
					<image class="cover" src="/static/img/team_techer1.jpg" mode="scaleToFill"></image>
				</view>
				<view class="content">
					<view class="head">
						<text class="name inlineBlock">朱炎东</text>
						<text class="text">总设计师</text>
					</view>
					<view class="lead">
						从事室内设计行业24年
						擅长风格：新中式，现代简约风格
					</view>
				</view>
			</view>
			<view class="case flex">
				<image class="cover" src="/static/img/team_name_li1.jpg" mode="widthFix"></image>
				<image class="cover" src="/static/img/team_name_li1.jpg" mode="widthFix"></image>
				<image class="cover" src="/static/img/team_name_li1.jpg" mode="widthFix"></image>
			</view>
		</view>
	</view>
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

	const openDetails = () => {
		uni.navigateTo({
			url: '/pages/design/details'
		})
	}

	const getDesignList = async (more) => {
		if (!more) {
			page.value = 1;
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
	}

	onMounted(() => {
		const commonData = uni.getStorageSync('commonData');
		gradeList.value = commonData.designer_grade_select;
		styleList.value = commonData.style_select;

		getDesignList()
	})
	
	onReachBottom(() => {
		if (page.value >= totalPage.value) {
			status.value = 'nomore';
		} else {
			status.value = 'loading';
			page.value++;
			getCaseList(true);
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
					width: 190rpx;
					margin: 0 10rpx 10rpx 0;
				}
			}
		}
	}
</style>