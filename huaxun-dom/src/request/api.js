import config from "../uni_modules/uv-ui-tools/libs/config/config";

// banner
export const postBanner = (params, config = {}) => uni.$uv.http.post('/mini/ad/getList', params, config);

// 获取openid
export const openId = (params, config = {}) => uni.$uv.http.post('/mini/user/getOpenidByCode', params, config);

// 登录
export const wxLogin = (params, config = {}) => uni.$uv.http.post('/mini/user/login', params, config);

// 预约数量
export const subscribeNumber = (params, config = {}) => uni.$uv.http.post('/mini/page_set/getSubscribe', params,
	config);

// 退出登录
export const logOut = (data) => uni.$uv.http.get('/mini/user/logout', data);

// 预约量房
export const subscribeMeasureTheHouse = (params, config = {}) => uni.$uv.http.post('/mini/subscribe/measure', params,
	config);

// 家装报价报价
export const getAQuote = (params, config = {}) => uni.$uv.http.post('/mini/subscribe/quotation', params,
	config);

// 预约设计师
export const subscribeStylist = (params, config = {}) => uni.$uv.http.post('/mini/subscribe/designer', params,
	config);

// 通用数据
export const getCommonData = (params, config = {}) => uni.$uv.http.post('/mini/common/getOpts', params, config);

// 获取首页数据
export const homeData = (data) => uni.$uv.http.get('/mini/page_set/getHome', data);

// 精品案例
export const caseList = (params, config = {}) => uni.$uv.http.post('/mini/example/getList', params, config);

// 设计师列表
export const designList = (params, config = {}) => uni.$uv.http.post('/mini/designer/getList', params, config);

// 工程管家
export const projectStewardList = (params, config = {}) => uni.$uv.http.post('/mini/butler/getList', params, config);

// 装修知识
export const descrationListApi = (params, config = {}) => uni.$uv.http.post('/mini/development/getList', params, config);