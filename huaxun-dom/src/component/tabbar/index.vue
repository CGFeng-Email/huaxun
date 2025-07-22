<template>
	<view class="tabbar_placeholder"></view>
	<view class="tabbar">
		<view v-for="(item,index) in list" :key="item.iconfont" :class="['item', item.bulge ? 'bulge' : '' ]"
			@click="switchTab(item,index)">
			<view v-if="item.bulge" class="bulgeItem">
				<image class="image" :src="item.iconPath" mode="widthFix" />
			</view>
			<block v-else>
				<!-- <image class="image" :src="selected == index ? item.selectedIconPath : item.iconPath" mode="widthFix" /> -->
				<view class="icon">
					<i :class="['iconfont', selected == index ? item.selectedIconfont : item.iconfont] "></i>
				</view>
			</block>
			<view :class="['text', selected == index ? selectedColor : '']">{{item.text}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	let selected = ref(0);
	const list = ref([{
			pagePath: "/pages/index/index",
			iconfont: 'icon-shouye1',
			selectedIconfont: 'icon-shouye',
			text: "首页"
		}, {
			pagePath: "/pages/case/index",
			iconfont: 'icon-shuji',
			selectedIconfont: 'icon-book-open-fill',
			text: "案例展馆"
		},
		{
			pagePath: "/pages/consult/index",
			iconPath: "/static/img/tabbar_consult.png",
			text: "预约咨询",
			bulge: true,
		}, {
			pagePath: "/pages/design/index",
			iconfont: 'icon-pen',
			selectedIconfont: 'icon-gangbi',
			text: "设计团队"
		},
		{
			pagePath: "/pages/me/index",
			iconfont: 'icon-wode',
			selectedIconfont: 'icon-wode2',
			text: "我的"
		}
	])

	onMounted(() => {
		// 获取全局应用实例
		const app = getApp();
		selected.value = app.globalData.selected;
	})

	const switchTab = (e, index) => {
		const url = e.pagePath;
		getApp().globalData.selected = index;
		uni.switchTab({
			url
		})
	}

	// 隐藏原生tabbar
	uni.hideTabBar();
</script>

<style lang="scss" scoped>
	.tabbar_placeholder {
		height: 160rpx;
	}

	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 160rpx;
		background: linear-gradient(180.00deg, #ff4e00 0%, #e40000 100%);
		display: flex;
		flex-direction: row;
		padding-bottom: env(safe-area-inset-bottom);
		pointer-events: auto;
		z-index: 100;

		.item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding-top: 20rpx;

			.image {
				width: 46rpx;
			}

			.text {
				color: #FFF;
				font-size: 24rpx;
				margin-top: 6rpx;
			}

			.icon {
				.iconfont {
					color: #fff;
					font-size: 34rpx;
				}
			}

			.selectedColor {
				color: #FFF;
			}
		}

		.bulge {
			padding-top: 24px;

			.bulgeItem {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				top: -40rpx;
				border-radius: 50%;
				overflow: hidden;
				background: #fff;
				z-index: -1;
				border-top: 1px solid #e6e6e6;
				box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.05);
				display: flex;
				align-items: center;
				justify-content: center;

				.image {
					width: 60rpx;
				}
			}

			.text {
				margin-top: 32rpx;
			}
		}
	}
</style>