<template>
	<view class="main">
		<view class="list box_shadow">
			<view class="item justify_space">
				<view class="left">
					<text class="name">头像</text>
					<text class="hint">点击可更换头像</text>
				</view>
				<view class="right justify_end">
					<button class="head_portrait" open-type="chooseAvatar" @chooseavatar="headPortraitChange">
						<image class="cover" :src="headPortrait || '/static/img/head_portrait.png'" mode="scaleToFill">
						</image>
					</button>
				</view>
			</view>
			<view class="item justify_space">
				<view class="left">
					<text class="name">昵称</text>
					<text class="hint">点击可更换昵称</text>
				</view>
				<view class="right">
					<input class="input" type="nickname" v-model="nickName" @blur="nickNameChange"
						@confirm="nickNameChange" />
				</view>
			</view>
			<view class="item justify_space">
				<view class="left">
					<text class="name">真实姓名</text>
				</view>
				<view class="right">
					<input type="text" v-model="userName" confirm-type="done" @blur="userNameChange"
						@confirm="nickNameChange" />
				</view>
			</view>
			<view class="item justify_space">
				<view class="left">
					<text class="name">手机号</text>
				</view>
				<view class="right">
					<input type="text" v-model="phone" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const headPortrait = ref(null);
	const nickName = ref(null);
	const userName = ref(null);
	const phone = ref(null);

	const headPortraitChange = (e) => {
		console.log('e', e);
		headPortrait.value = e.detail.avatarUrl;
	}

	const nickNameChange = (e) => {
		console.log('e', e);
	}

	const userNameChange = () => {
		console.log(e);
	}
</script>

<style>
	page {
		background: #FBFBFB;
	}
</style>

<style lang="scss" scoped>
	.main {
		padding: 20rpx;

		.list {
			background: #fff;
			border-radius: 24rpx;
			padding: 0 30rpx;

			.item {
				padding: 30rpx 10rpx;
				border-bottom: 1px solid rgba(0, 0, 0, .1);

				.left {
					flex: none;

					.name {
						font-size: 28rpx;
						font-weight: 600;
						color: #000;
					}

					.hint {
						font-size: 24rpx;
						color: #D1D1D1;
						padding-left: 20rpx;
					}
				}

				.right {
					flex: 1;

					.head_portrait {
						background: none;
						box-shadow: none;
						border: none;
						background: none;
						width: 136rpx;
						height: 136rpx;
						margin: 0;
						padding: 0;
						border-radius: 50%;
						overflow: hidden;

						&:after {
							content: '';
							border: none;
						}

						.cover {
							width: 100%;
							height: 100%;
						}
					}

					.input {
						text-align: right;
						font-size: 26rpx;
						color: #000;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>