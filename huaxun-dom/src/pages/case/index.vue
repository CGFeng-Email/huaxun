<template>
	<Search></Search>
	<Tabs :index="1" title="户型" :list="honseTypeList" :offsetTop="-1" :currentIndex="honseTypeIndex" @tabsClick="tabsClick"></Tabs>
	<Tabs :index="2" title="风格" :list="styleList" :offsetTop="45" :currentIndex="styleIndex" @tabsClick="tabsClick"></Tabs>
	<Tabs :index="3" title="面积" :list="sizeList" :offsetTop="90" :currentIndex="siezIndex" @tabsClick="tabsClick"></Tabs>
	<Tabs :index="4" title="全部" :list="allList" :offsetTop="135" :currentIndex="allIndex" @tabsClick="tabsClick"></Tabs>
	<uv-gap height="20" bgColor="#f8f8f8"></uv-gap>
	<view class="list">
		<uv-waterfall ref="waterfall" v-model="caseList" :add-time="10" :left-gap="leftGap" :right-gap="rightGap"
			:column-gap="columnGap" @changeList="changeList">
			<!-- 第一列数据 -->
			<template v-slot:list1>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list1" :key="item.id" class="waterfall-item" @click="clickItem">
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
									<text class="text inlineBlock">{{item.see}}</text>
								</view>
								<view class="click justify_center">
									<i class="iconfont icon-shoucang"></i>
									<text class="text inlineBlock">{{item.collect}}</text>
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
					<view v-for="(item, index) in list2" :key="item.id" class="waterfall-item" @click="clickItem">
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
				</view>
			</template>
		</uv-waterfall>
	</view>
	<tabbar></tabbar>
</template>

<script setup>
	import Search from '@/component/search';
	import Tabs from '@/component/tabs';
	import Tabbar from '@/component/tabbar';
	import {
		ref,
		computed
	} from 'vue';

	const honseTypeIndex = ref(0);
	const honseTypeList = ref([{
			name: '五居室'
		},
		{
			name: '四居室'
		}, {
			name: '三居室'
		}, {
			name: '别墅'
		}, {
			name: '跃居'
		}, {
			name: '复式'
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

	const siezIndex = ref(0);
	const sizeList = ref([{
			name: '90㎡以下'
		},
		{
			name: '90-140㎡'
		}, {
			name: '140-190㎡'
		}, {
			name: '190-240㎡'
		}, {
			name: '240-260㎡'
		}, {
			name: '260-300㎡'
		}
	])

	const allIndex = ref(0);
	const allList = ref([{
			name: '实景图'
		},
		{
			name: '效果图'
		}
	])

	const tabsClick = (e) => {
		console.log('tabs-click', e);
	}

	const leftGap = ref(10);
	const rightGap = ref(10);
	const columnGap = ref(10);
	const list1 = ref([]);
	const list2 = ref([]);
	const caseList = ref([{
			image: '/static/img/case_li1.jpg',
		},
		{
			image: '/static/img/case_li2.jpg',
			title: '长沙润府-轻奢风格-220㎡-四房',
			label: ['现代轻奢', '四居室', '220㎡'],
			see: 533,
			collect: 268
		},
		{
			image: '/static/img/case_li2.jpg',
			title: '长沙润府-轻奢风格-220㎡-四房',
			label: ['现代轻奢', '四居室', '220㎡'],
			see: 533,
			collect: 268
		},
		{
			image: '/static/img/case_li2.jpg',
			title: '长沙润府-轻奢风格-220㎡-四房',
			label: ['现代轻奢', '四居室', '220㎡'],
			see: 533,
			collect: 268
		},
		{
			image: '/static/img/case_li2.jpg',
			title: '长沙润府-轻奢风格-220㎡-四房',
			label: ['现代轻奢', '四居室', '220㎡'],
			see: 533,
			collect: 268
		},
		{
			image: '/static/img/case_li2.jpg',
			title: '长沙润府-轻奢风格-220㎡-四房',
			label: ['现代轻奢', '四居室', '220㎡'],
			see: 533,
			collect: 268
		},
		{
			image: '/static/img/case_li2.jpg',
			title: '长沙润府-轻奢风格-220㎡-四房',
			label: ['现代轻奢', '四居室', '220㎡'],
			see: 533,
			collect: 268
		},
		{
			image: '/static/img/case_li2.jpg',
			title: '长沙润府-轻奢风格-220㎡-四房',
			label: ['现代轻奢', '四居室', '220㎡'],
			see: 533,
			collect: 268
		}
	])

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
		console.log('e', e);
		if (e.name == 'list1') {
			list1.value.push(e.value);
		} else {
			list2.value.push(e.value);
		}
	}

	const clickItem = () => {
		uni.navigateTo({
			url: '/pages/case/details'
		})
	}
</script>

<style lang="scss" scoped>
	$show-lines: 1;
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';

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