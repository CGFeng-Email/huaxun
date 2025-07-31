<script>
	// 版本更新
	import autoUpdate from '@/hooks/update.js';

	export default {
		globalData: {
			selected: 0
		},
		onLaunch: function() {
			console.log('App Launch');
			// 版本更新
			autoUpdate();

			// 获取胶囊坐标
			const getMenuButton = uni.getStorageSync('menuButton');
			if (!getMenuButton) {
				// 获取胶囊信息api
				const res = uni.getMenuButtonBoundingClientRect();
				uni.setStorageSync('menuButton', res);
			}
		},
		onShow: function() {},
		onHide: function() {},
	}
</script>

<style lang="scss">
	@import url('@/static/font/iconfont.css');
	@import '@/uni_modules/uv-ui-tools/index.scss';

	.justify_center {
		display: flex;
		align-items: center;
	}

	.flex {
		display: flex;
	}

	.flex_center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.justify_space {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.justify_end {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	view,
	text,
	swiper,
	swiper-item,
	text {
		box-sizing: border-box;
		font-size: 24rpx;
		line-height: 1.6;
	}

	image {
		height: auto;
		vertical-align: bottom;
	}

	.title {
		font-size: 34rpx;
		font-weight: 500;
	}

	.over1 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.over2 {
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.over3 {
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.box_shadow {
		box-shadow: 0 0 6rpx rgba(0, 0, 0, .1);
	}

	.box_radius {
		border-radius: 8rpx;
	}

	.textCenter {
		text-align: center;
	}

	.inlineBlock {
		display: inline-block;
	}
	
	.img_bg {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.uv-modal {
		::v-deep .uv-modal__content {
			padding: 40rpx !important;
		}

		::v-deep .uv-form-item__body__right__message {
			margin-left: 0 !important;
		}
	}

	.common_more {
		height: 66rpx;
		line-height: 66rpx;
		border: 1px solid #fff;
		padding: 0 50rpx;
		border-radius: 45rpx;
		margin: auto;
		font-size: 26rpx;
		color: #fff;
		font-weight: 500;
		margin-top: 20rpx;
	}
	
	.animate {
		transform: .4s ease;
	}
	
	.red {
		font-size: 28rpx;
		font-weight: 600;
		color: #FF0000;
	}
</style>