<template>
	<view class="main">
		<view class="search">
			<uv-input placeholder="请输入内容" placeholderStyle="#b0b0b0" fontSize="15px" color="#000" prefixIcon="search"
				prefixIconStyle="font-size: 28px; color: #000; font-weight: 500;" border="bottom" v-model="keyword"
				@confirm="confirm" @input="input">
			</uv-input>
		</view>
		<view style="height: 90rpx;"></view>

		<view class="hot_search" v-if="list.length == 0 && !keyword">
			<view class="title">热门搜索</view>
			<view class="list flex">
				<view class="item" v-for="(item,index) in hotSearch" :key="item.name" @click="hotSearchClick(item.name)">
					{{item.name}}
				</view>
			</view>
		</view>

		<view class="all_list flex" v-if="list.length > 0 && keyword">
			<div class="item" v-for="(item,index) in list" :key="item.id" @click="openDetails(item)">
				<view class="cover_box">
					<image class="cover" :src="item.image" mode="widthFix"></image>
				</view>
				<view class="name">
					{{item.title}}
				</view>
			</div>
		</view>

		<view class="empty" v-if="empty">
			<view class="cover_box">
				<image class="cover" src="/static/img/home_logo.png" mode="widthFix"></image>
			</view>
			<view class="name">
				暂无符合搜索的条件
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	import {
		searchApi
	} from '../../request/api.js';

	const keyword = ref('');
	const hotSearch = ref([]);
	const list = ref([]);
	const empty = ref(false);

	const input = () => {
		empty.value = false;
	}

	const confirm = () => {
		console.log('confirm', keyword.value);
		if (!keyword.value) {
			list.value = [];
			empty.value = false;
		} else {
			getSearchList();
		}
	}

	const getSearchList = async () => {
		const res = await searchApi({
			keyword: keyword.value,
			size: 100
		}, {
			custom: {
				catch: true,
			}
		})
		console.log('res', res);
		if (res.code == 1) {
			list.value = res.data.lists;
			if (list.value.length == 0) {
				empty.value = true;
			}
		}
	}
	
	const hotSearchClick = (e) => {
		keyword.value = e;
		getSearchList();
	}

	const openDetails = (e) => {
		console.log(e);
		if(e.type == 'example') {
			uni.navigateTo({
				url: `/pages/case/details?id=${e.id}`
			})
		} else if(e.type == 'butler'){
			uni.navigateTo({
				url: `/pages/steward/details?id=${e.id}`
			})
		} else if(e.type == 'designer') {
			uni.navigateTo({
				url: `/pages/design/details?id=${e.id}`
			})
		} else if(e.type == 'development') {
			uni.navigateTo({
				url: `/pages/knowledge/details?id=${e.id}`
			})
		}
	}

	onMounted(() => {
		const commonData = uni.getStorageSync('commonData');
		console.log('commonData', commonData);
		hotSearch.value = commonData.hot_search;
	})
</script>

<style lang="scss" scoped>
	.main {
		padding: 0 30rpx 40rpx;

		::v-deep .uv-input {
			padding: 20rpx 0 !important;
			border-bottom: 1px solid #000 !important;
		}

		.search {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 90rpx;
			padding: 0 30rpx;
			background: #fff;
		}

		.hot_search {
			padding-top: 20rpx;

			.title {
				font-size: 38rpx;
				font-weight: 600;
				padding: 20rpx 0;
			}

			.list {
				flex-wrap: wrap;

				.item {
					display: inline-block;
					padding: 10rpx 40rpx;
					border: 1px solid rgba(0, 0, 0, .3);
					font-size: 28rpx;
					color: #000;
					font-weight: 500;
					margin: 0 20rpx 20rpx 0;
				}
			}
		}

		.all_list {
			padding-top: 20rpx;
			flex-wrap: wrap;

			.item {
				padding: 10rpx;
				width: 50%;
				text-align: center;

				.cover_box {
					.cover {
						width: 100%;
					}
				}

				.name {
					font-size: 32rpx;
					font-weight: 500;
					color: #000;
					padding: 10rpx 0;
				}
			}
		}

		.empty {
			margin: 140rpx auto;
			text-align: center;

			.cover_box {
				.cover {
					width: 340rpx;
				}
			}

			.name {
				font-size: 32rpx;
				font-weight: 500;
				color: #000;
				padding: 20rpx 0;
			}
		}
	}
</style>