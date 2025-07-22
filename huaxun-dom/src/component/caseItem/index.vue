<template>
	<view class="waterfall-item">
		<view class="waterfall-item__image" :style="imageStyle(item)">
			<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
		</view>
		<view class="content" v-if="item.title">
			<view class="label_list">
				<text class="text inlineBlock box_radius box_shadow" v-for="labelItem in item.label"
					:key="labelItem">{{labelItem}}</text>
			</view>
			<view class="title">
				{{item.title}}
			</view>
			<view class="property justify_space">
				<view class="click justify_center">
					<i class="iconfont icon-chakan"></i>
					{{item.see}}
				</view>
				<view class="click justify_center">
					{{item.collect}}
					<i class="iconfont icon-shoucang"></i>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		computed
	} from 'vue';

	const props = defineProps({
		item: {
			type: Object,
			default: () => {}
		},
		leftGap: {
			type: Number,
			default: () => 10
		},
		rightGap: {
			type: Number,
			default: () => 10
		},
		columnGap: {
			type: Number,
			default: () => 10
		}
	})
	
	console.log('leftGap', props.leftGap);

	const imageStyle = computed(item => {
		return item => {
			const v = uni.upx2px(750) - props.leftGap - props.rightGap - props.columnGap;
			const w = v / 2;
			const rate = w / item.w;
			const h = rate * item.h;
			return {
				width: w + 'px',
				height: h + 'px'
			}
		}
	})
</script>

<style lang="scss" scoped>
	.waterfall-item {
		overflow: hidden;
		margin-top: 10rpx;
		border-radius: 6px;

		.content {
			padding: 10rpx;

			.label_list {
				.text {
					background: #FFE3D6;
					padding: 6rpx 28rpx;
					color: $main-color;
					margin: 0 10rpx 10rpx 0;
				}
			}

			.title {
				font-size: 28rpx;
				font-weight: 600;
			}

			.click {
				font-size: 24rpx;
				font-weight: 500;
				color: #777777;

				.iconfont {
					margin-left: 4rpx;
				}
			}
		}
	}
</style>