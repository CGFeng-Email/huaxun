<template>
	<Search></Search>
	<Tabs :index="1" title="极品" :list="rankList" :offsetTop="-1" :currentIndex="rankIndex" @tabsClick="tabsClick">
	</Tabs>
	<Tabs :index="2" title="风格" :list="styleList" :offsetTop="45" :currentIndex="styleIndex" @tabsClick="tabsClick">
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
		ref
	} from 'vue';

	const rankIndex = ref(0);
	const rankList = ref([{
			name: '总设计师'
		},
		{
			name: '设计总监'
		}, {
			name: '主案设计师'
		}, {
			name: '设计师'
		}
	])

	const styleIndex = ref(0);
	const styleList = ref([{
			name: '现代简约'
		},
		{
			name: '现代轻奢'
		}, {
			name: '中式'
		}, {
			name: '欧式风'
		}, {
			name: '简欧式风'
		}, {
			name: '复古'
		}
	])

	const tabsClick = (e) => {
		console.log('tabs-click', e);
	}
	
	const openDetails = () => {
		uni.navigateTo({
			url: '/pages/design/details'
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