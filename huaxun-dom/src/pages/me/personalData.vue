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
						<image class="cover" :src="userData.avatar || '/static/img/head_portrait.png'"
							mode="scaleToFill">
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
					<input class="input" type="nickname" v-model="userData.nickname" confirm-type="done"
						@blur="nickNameChange" @confirm="nickNameChange" />
				</view>
			</view>
			<view class="item justify_space">
				<view class="left">
					<text class="name">真实姓名</text>
				</view>
				<view class="right">
					<input type="text" class="input" v-model="userData.real_name" confirm-type="done" @blur="userName"
						@change="userName" />
				</view>
			</view>
			<view class="item justify_space">
				<view class="left">
					<text class="name">手机号</text>
				</view>
				<view class="right">
					<input type="text" class="input" v-model="userData.mobile" confirm-type="done" @blur="userMobile"
						@change="userMobile" />
				</view>
			</view>
		</view>
	</view>

	<view class="btn">
		<uv-button text="确认修改" size="large" shape="circle" color="#FF4E00" iconColor="#fff" @click="submit"></uv-button>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	import {
		userDataApi,
		uploadApi,
		editUserDataApi
	} from '../../request/api.js';

	import {
		base64
	} from '../../hooks/useTool.js';

	const userData = ref({});

	const headPortraitChange = async (e) => {
		const url = e.detail.avatarUrl;
		const imgBase64 = await base64(url, 'png');
		const res = await uploadApi({
			file: imgBase64
		}, {
			custom: {
				catch: true,
				token: true
			}
		})
		console.log('res', res);
		if (res.code == 1) {
			userData.value.avatar = res.data.url;
		} else {
			uni.$uv.toast('上传失败，请联系管理员');
		}
	}

	// 昵称
	const nickNameChange = (e) => {
		console.log('e', e);
		userData.value.nickname = e.detail.value;
	}

	// 姓名
	const userName = (e) => {
		userData.value.real_name = e.detail.value;
	}

	// 手机号
	const userMobile = (e) => {
		userData.value.mobile = e.detail.value;
	}

	// 获取用户信息
	const getUserData = async () => {
		const res = await userDataApi({}, {
			custom: {
				catch: true,
				token: true
			}
		});

		console.log('userData', res);
		if (res.code == 1) {
			userData.value = res.data;
		}
	}

	// 修改用户资料
	const submit = async () => {
		uni.showLoading({
			title: '加载中',
			mask: true
		});
		const res = await editUserDataApi({
			avatar: userData.value.avatar,
			nickname: userData.value.nickname,
			real_name: userData.value.real_name,
			mobile: userData.value.mobile,
		}, {
			custom: {
				catch: true,
				token: true
			}
		})
		console.log('res', res);
		uni.hideLoading();
	}

	onMounted(() => {
		getUserData();
	})
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

	.btn {
		padding: 20rpx;
		position: fixed;
		bottom: 40rpx;
		left: 0;
		width: 100%;
	}
</style>