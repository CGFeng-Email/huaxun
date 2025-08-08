<template>
	<view class="static" :style="'top:'+offsetTop+'px'">
		<view class="tabs_box justify_center">
			<view class="item justify_space">
				<view class="name">{{title}}</view>
				<view class="list">
					<uv-tabs :list="list" :current="currentIndex" @click="click" lineColor="#FFF" lineWidth="80"
						lineHeight="4" :activeStyle="{
						color: '#FF4E00',
						fontSize: '14px',
						transform: 'scale(1)',
						padding: '0'
					}" :inactiveStyle="{
						color: '#000',
						fontSize: '14px',
						transform: 'scale(1)',
						padding: '0'
					}" itemStyle="height: 40px;"></uv-tabs>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		defineEmits
	} from 'vue';

	const emit = defineEmits(['tabsClick']);

	const props = defineProps({
		list: {
			type: Array,
			default: () => []
		},
		type: {
			type: Number,
			default: () => 1
		},
		title: {
			type: String,
			default: () => '标题'
		},
		offsetTop: {
			type: Number,
			default: () => 0
		},
		zIndex: {
			type: Number,
			default: () => 1
		},
		currentIndex: {
			type: Number,
			default: () => 0
		}
	})

	const click = (e) => {
		console.log(e);
		emit('tabsClick', {
			type: props.type,
			value: e.value,
			index: e.index
		});
	}
</script>

<style lang="scss" scoped>
	.static {
		position: sticky;
		left: 0;
		width: 100%;
	}

	.tabs_box {
		height: 90rpx;
		background: #fff;

		.item {
			padding: 0 20rpx;

			.name {
				flex: none;
				background: $main-color;
				color: #fff;
				font-size: 24rpx;
				border-radius: 44rpx;
				padding: 6rpx 30rpx;
			}

			.list {
				flex: 1;
				margin-left: 10rpx;
			}
		}
	}
</style>