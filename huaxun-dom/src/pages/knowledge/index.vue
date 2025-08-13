<template>
	<Search></Search>
	<view class="list">
		<view class="item box_radius box_shadow flex" v-for="(item,index) in knowledgeList" :key="index" @click="openDetails(item.id)">
			<image class="cover box_radius box_shadow" :src="item.image" mode="scaleToFill"></image>
			<view class="content">
				<view class="title over2">
					{{item.title}}
				</view>
				<view class="date">
					{{item.publish_date}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Search from '@/component/search';

	import {
		onMounted,
		ref
	} from 'vue';
	
	import {
		onReachBottom
	} from '@dcloudio/uni-app';

	import {
		descrationListApi
	} from '../../request/api.js';

	const size = ref(10);
	const page = ref(1);
	const totalPage = ref(0);
	const status = ref('loadmore');
	const knowledgeList = ref([]);

	const openDetails = (id) => {
		uni.navigateTo({
			url: `/pages/knowledge/details?id=${id}`
		})
	}

	const getKnowledgeList = async (more) => {
		if (!more) {
			page.value = 1;
			knowledgeList.value = [];
		}

		const res = await descrationListApi({
			page: page.value,
			size: size.value
		}, {
			custom: {
				catch: true
			}
		});

		console.log('knowledgeList', res);

		if (res.code == 1) {
			if (more) {
				knowledgeList.value = [...knowledgeList.value, res.data.lists];
				status.value = 'loadmore';
			} else {
				knowledgeList.value = res.data.lists;
				totalPage.value = res.data.page_no;
				if (totalPage.value <= 1) {
					status.value = 'nomore';
				}
			}
		}
	}

	onMounted(() => {
		getKnowledgeList();
	})

	onReachBottom(() => {
		if (page.value >= totalPage.value) {
			status.value = 'nomore';
		} else {
			status.value = 'loading';
			page.value++;
			getKnowledgeList(true);
		}
	})
</script>

<style>
	page {
		background: #f8f8f8;
	}
</style>

<style lang="scss" scoped>
	.list {
		padding: 20rpx 20rpx 40rpx;

		.item {
			margin-bottom: 20rpx;
			background: #fff;
			padding: 20rpx;

			.cover {
				width: 268rpx;
				height: 220rpx;
				flex: none;
			}

			.content {
				flex: 1;
				padding-left: 20rpx;

				.title {
					font-size: 28rpx;
					font-weight: 600;
					color: #000;
				}

				.date {
					font-size: 24rpx;
					padding: 10rpx 0;
					color: #000;
				}

				.lead {
					font-size: 24rpx;
					color: #666666;
				}
			}
		}
	}
</style>