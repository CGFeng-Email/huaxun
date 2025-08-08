// 此vm参数为页面的实例，可以通过它引用vuex中的变量
export const Request = (vm) => {
	// 初始化请求配置
	uni.$uv.http.setConfig((config) => {
		config.baseURL = 'https://ax.pinpaimail.cn';
		return config
	})

	// 请求拦截
	uni.$uv.http.interceptors.request.use((config) => {
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {};
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if (config.custom?.token) {
			const token = uni.getStorageSync('token');
			if (!token) {
				return config;
			} else {
				config.data.token = token;
			}
		}
		return config;
	}, config => {
		return Promise.reject(config);
	})

	// 响应拦截
	uni.$uv.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data;

		// 自定义参数
		const custom = response.config?.custom;

		// 响应成功
		if (response.statusCode == 200) {
			// 提示
			if (custom?.toast == true) {
				uni.$uv.toast(custom.msg);
			}

			// 返回
			if (custom?.catch) {
				return data;

			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}

		return data.data === undefined ? {} : data.data;
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response);
	})
}