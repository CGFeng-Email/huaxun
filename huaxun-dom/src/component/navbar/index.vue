<template>
	<view class="navbar">
		<uv-navbar @leftClick="leftClick" :bgColor="pageScroll >= 70 ? '#fff' : 'transparent'" :placeholder="noReturn">
			<template v-slot:left>
				<view class="icon" v-if="!noReturn">
					<uv-icon name="arrow-left" color="#000" size="40"></uv-icon>
				</view>
			</template>
			<template v-slot:center>
				<view :class="['title', noReturn ? 'white': '']">
					{{title}}
				</view>
			</template>
		</uv-navbar>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		title: {
			type: String,
			default: '华浔装饰'
		},
		pageScroll: {
			type: Number,
			default: () => 0
		},
		noReturn: {
			type: Boolean,
			default: false
		}
	})

	const leftClick = () => {
		uni.navigateBack();
	}
</script>

<style lang="scss" scoped>
	.navbar {
		.icon {
			::v-deep .iconfont {
				font-size: 20rpx;
			}
		}

		::v-deep .title {
			font-size: 16px;
			font-weight: 500;
		}
		
		.white {
			color: #fff;
		}
	}
</style>