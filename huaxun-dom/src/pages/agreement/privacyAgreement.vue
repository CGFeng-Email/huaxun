<template>
	<view class="main">
		<uv-parse :selectable="true" :lazyLoad="true" :content="agreementText"></uv-parse>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	
	const agreementText = ref(null);

	onMounted(() => {
		const commonData = uni.getStorageSync('commonData');
		agreementText.value = commonData.agreement.privacy_content;
	})
</script>

<style scoped>
	.main {
		padding: 0 20rpx 20rpx;
	}
</style>