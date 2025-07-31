import {
	createSSRApp
} from "vue";
import App from "./App.vue";

import {
	Request
} from './request/index.js';

import uvUI from '@/uni_modules/uv-ui-tools';

import Login from '@/component/login/index.vue';

export function createApp() {
	
	const app = createSSRApp(App);

	app.component('Login', Login);

	// 挂载
	app.use(uvUI, {
		mpShare: true
	});

	// 引入请求封装
	Request(app);

	// 需要在Vue.use(uvUI)之后执行
	uni.$uv.setConfig({
		// 修改$uv.config对象的属性
		config: {
			// 修改默认单位为rpx，相当于执行 uni.$uv.config.unit = 'rpx'
			unit: 'rpx'
		},
		// 修改$uv.props对象的属性
		props: {
			// 修改uv-text组件的size参数的默认值，注意：默认值都要用default声明
			text: {
				color: {
					default: 'red'
				}
			}
			// 其他组件属性配置，具体的参数名称可以去每个组件的props.js中进行查看
			// ......
		}
	})

	return {
		app,
	};
}