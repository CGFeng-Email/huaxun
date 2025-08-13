<template>
	<Search></Search>
	<view class="list">
		<view class="item box_radius box_shadow" v-for="(item,index) in designList" :key="index"
			@click="openDetails(item.id)">
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
</template>

<script setup>
	import Search from '@/component/search';

	import {
		ref,
		onMounted
	} from 'vue';

	import {
		onReachBottom
	} from '@dcloudio/uni-app';

	import {
		designerCollectListApi
	} from '../../request/api.js';

	const size = ref(10);
	const page = ref(1);
	const totalPage = ref(0);
	const status = ref('loadmore');
	const designList = ref([]);

	const openDetails = (id) => {
		uni.navigateTo({
			url: `/pages/design/details?id=${id}`
		})
	}

	const getDesignList = async (more) => {
		if (!more) {
			page.value = 1;
			designList.value = [];
		}

		const res = await designerCollectListApi({
			page: page.value,
			size: size.value
		}, {
			custom: {
				catch: true,
				token: true
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
		padding: 20rpx 20rpx 40rpx;

		.item {
			padding: 30rpx 30rpx 20rpx;
			margin-bottom: 30rpx;
			background: #fff;

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
					width: 190rpx;
					margin: 0 10rpx 10rpx 0;
				}
			}
		}
	}
</style>