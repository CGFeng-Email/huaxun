<template>
	<Search></Search>
	<view class="list">
		<uv-waterfall ref="waterfall" v-model="caseList" :add-time="10" :left-gap="leftGap" :right-gap="rightGap"
			:column-gap="columnGap" @changeList="changeList">
			<!-- 第一列数据 -->
			<template v-slot:list1>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list1" :key="item.id" class="waterfall-item"
						@click="clickItem(item.id)">
						<view class="waterfall-item__image" :style="imageStyle(item)">
							<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
						</view>
						<view class="content" v-if="item.title">
							<view class="label_list">
								<!-- 风格 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.style_name}}</text>
								<!-- 户型 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.house_name}}</text>
								<!-- 楼盘 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.place}}</text>
								<!-- 图形 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.grap_name}}</text>
								<!-- 面积范围 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.area_name}}</text>
							</view>
							<view class="title">
								{{item.title}}
							</view>
							<view class="property justify_space">
								<view class="click justify_center">
									<i class="iconfont icon-chakan"></i>
									<text class="text inlineBlock">{{item.view_actual}}</text>
								</view>
								<view class="click justify_center">
									<i class="iconfont icon-shoucang" v-if="item.is_collect == 0"></i>
									<i class="iconfont icon-shoucang1 active" v-else></i>
									<text class="text inlineBlock">{{item.collect_num}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<!-- 第二列数据 -->
			<template v-slot:list2>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list2" :key="item.id" class="waterfall-item"
						@click="clickItem(item.id)">
						<view class="waterfall-item__image" :style="imageStyle(item)">
							<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
						</view>
						<view class="content" v-if="item.title">
							<view class="label_list">
								<!-- 风格 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.style_name}}</text>
								<!-- 户型 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.house_name}}</text>
								<!-- 楼盘 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.place}}</text>
								<!-- 图形 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.grap_name}}</text>
								<!-- 面积范围 -->
								<text class="text inlineBlock box_radius box_shadow">{{item.area_name}}</text>
							</view>
							<view class="title">
								{{item.title}}
							</view>
							<view class="property justify_space">
								<view class="click justify_center">
									<i class="iconfont icon-chakan"></i>
									<text class="text inlineBlock">{{item.view_actual}}</text>
								</view>
								<view class="click justify_center">
									<i class="iconfont icon-shoucang" v-if="item.is_collect == 0"></i>
									<i class="iconfont icon-shoucang1 active" v-else></i>
									<text class="text inlineBlock">{{item.collect_num}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
		</uv-waterfall>

		<!-- 加载更多 -->
		<uv-load-more :status="status" fontSize="24" color="#000" marginTop="20" marginBottom="50"
			loadmoreText="上拉加载更多" />
	</view>
</template>

<script setup>
	import Search from '@/component/search';
	import {
		ref,
		computed,
		onMounted
	} from 'vue';

	import {
		onReachBottom
	} from '@dcloudio/uni-app';

	import {
		caseCollectListApi
	} from '../../request/api.js';

	const waterfall = ref(null);
	const leftGap = ref(10);
	const rightGap = ref(10);
	const columnGap = ref(10);
	const list1 = ref([]);
	const list2 = ref([]);
	const caseList = ref([]);
	const size = ref(10);
	const totalPage = ref(null);
	const page = ref(1);
	const status = ref('loadmore');

	const imageStyle = computed(item => {
		return item => {
			const v = uni.upx2px(750) - leftGap.value - rightGap.value - columnGap.value;
			const w = v / 2;
			const rate = w / item.w;
			const h = rate * item.h;
			return {
				width: w + 'px',
				height: h + 'px'
			}
		}
	})

	const changeList = (e) => {
		if (e.name == 'list1') {
			list1.value.push(e.value);
		} else {
			list2.value.push(e.value);
		}
	}

	const clickItem = (id) => {
		uni.navigateTo({
			url: `/pages/case/details?id=${id}`
		})
	}

	// 案例列表
	const getCaseList = async (more = false) => {
		if (!more) {
			page.value = 1;
			list1.value = [];
			list2.value = [];
			waterfall.value.clear();
		}

		const res = await caseCollectListApi({
			page: page.value,
			size: size.value,
		}, {
			custom: {
				catch: true,
				token: true
			}
		})

		console.log('caseList', res);
		if (res.code == 1) {
			if (more) {
				caseList.value = [...caseList.value, ...res.data.lists];
				status.value = 'loadmore';
			} else {
				caseList.value = res.data.lists;
				totalPage.value = res.data.page_no;
				if (totalPage.value <= 1) {
					status.value = 'nomore'
				}
			}
		}
	}

	onReachBottom(() => {
		if (page.value >= totalPage.value) {
			status.value = 'nomore';
		} else {
			status.value = 'loading';
			page.value++;
			getCaseList(true);
		}
	})

	onMounted(() => {
		getCaseList();
	})
</script>

<style lang="scss" scoped>
	$show-lines: 1;
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
	
	.list {
		padding-bottom: 40rpx;
	}

	.waterfall-item {
		overflow: hidden;
		margin-top: 10rpx;
		border-radius: 6px;

		.content {
			padding: 10rpx;

			.label_list {
				.text {
					background: #FFE3D6;
					padding: 6rpx 18rpx;
					color: $main-color;
					margin: 0 10rpx 10rpx 0;
					font-size: 20rpx;
				}
			}

			.title {
				font-size: 28rpx;
				font-weight: 600;
			}

			.click {
				font-size: 28rpx;
				font-weight: 500;
				color: #777777;

				.iconfont {
					margin-right: 4rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>