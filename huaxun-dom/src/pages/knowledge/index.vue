<template>
	<Search></Search>
	<view class="list">
		<view class="item box_radius box_shadow flex" v-for="(item,index) in 10" :key="index" @click="openDetails">
			<image class="cover box_radius box_shadow" src="/static/img/case_li2.jpg" mode="scaleToFill"></image>
			<view class="content">
				<view class="title over2">
					轻奢大宅设计，呼之欲出的高级感，越看越心水
				</view>
				<view class="date">
					2025.06.09
				</view>
				<view class="lead over2">
					坚守“诚信、专业、创新、共享”的经营理念，不断打造“责任、敬业、感恩...
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Search from '@/component/search';
	
	const openDetails = () => {
		uni.navigateTo({
			url: '/pages/knowledge/details'
		})
	}
</script>

<style>
	page {
		background: #f8f8f8;
	}
</style>

<style lang="scss" scoped>
	.list {
		padding: 20rpx;

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