<template>
	<Search></Search>
	<view class="list">
		<div class="row flex">
			<view class="col_md" v-for="(item,index) in 8" :key="index">
				<view class="item box_radius box_shadow" @click="openDetails">
					<view class="head_portrait box_shadow">
						<image class="cover" src="/static/img/team_techer1.jpg" mode="scaleToFill"></image>
					</view>
					<view class="name">
						朱炎东
					</view>
					<view class="label">
						<text class="text inlineBlock box_radius">高级管家</text>
					</view>
				</view>
			</view>
		</div>
	</view>
</template>

<script setup>
	import Search from '@/component/search';
	
	const openDetails = () => {
		uni.navigateTo({
			url: '/pages/steward/details'
		})
	}
</script>

<style>
	page {
		background: #F8F8F8;
	}
</style>

<style lang="scss" scoped>
	.list {
		padding: 20rpx 0;

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
					color: #000;
					font-weight: 600;
					margin: 10rpx 0;
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
	}
</style>