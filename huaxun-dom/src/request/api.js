import config from "../uni_modules/uv-ui-tools/libs/config/config";

// banner
export const postBanner = (params, config = {}) => uni.$uv.http.post('/mini/ad/getList', params, config);

// 获取openid
export const openId = (params, config = {}) => uni.$uv.http.post('/mini/user/getOpenidByCode', params, config);

// 登录
export const wxLogin = (params, config = {}) => uni.$uv.http.post('/mini/user/login', params, config);

// 预约数量
export const subscribeNumberApi = (params, config = {}) => uni.$uv.http.post('/mini/page_set/getSubscribe', params,
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
export const caseListApi = (params, config = {}) => uni.$uv.http.post('/mini/example/getList', params, config);

// 设计师列表
export const designListApi = (params, config = {}) => uni.$uv.http.post('/mini/designer/getList', params, config);

// 工程管家
export const projectStewardListApi = (params, config = {}) => uni.$uv.http.post('/mini/butler/getList', params, config);

// 装修知识
export const descrationListApi = (params, config = {}) => uni.$uv.http.post('/mini/development/getList', params,
	config);

// 案例详情
export const caseDetailsApi = (params, config = {}) => uni.$uv.http.post('/mini/example/detail', params, config);

// 案例收藏/取消收藏
export const isCaseCollectApi = (params, config = {}) => uni.$uv.http.post('/mini/example/setCollect', params, config);

// 设计师详情
export const designDetailsApi = (params, config = {}) => uni.$uv.http.post('/mini/designer/detail', params, config);

// 设计师收藏
export const designCollectApi = (params, config = {}) => uni.$uv.http.post('/mini/designer/setCollect', params, config);

// 管家详情
export const stewardDetailsApi = (params, config = {}) => uni.$uv.http.post('/mini/butler/detail', params, config);

// 装修知识详情
export const knowledgeDetailsApi = (params, config = {}) => uni.$uv.http.post('/mini/development/detail', params,
	config);

// 用户信息
export const userDataApi = (params, config = {}) => uni.$uv.http.post('/mini/user/getUserInfo', params, config);

// 关于我们
export const aboutUsApi = (data) => uni.$uv.http.get('/mini/page_set/getAboutUs', data);

// 上传
export const uploadApi = (params, config = {}) => uni.$uv.http.post('/mini/upload/image', params, config);

// 修改用户资料
export const editUserDataApi = (params, config = {}) => uni.$uv.http.post('/mini/user/saveUserInfo', params, config);

// 案例收藏列表
export const caseCollectListApi = (params, config = {}) => uni.$uv.http.post('/mini/example/getCollect', params, config);

// 设计师收藏列表
export const designerCollectListApi = (params, config = {}) => uni.$uv.http.post('/mini/designer/getCollect', params, config);

// 管家收藏列表
export const stewardCollectListApi = (params, config = {}) => uni.$uv.http.post('/mini/butler/getCollect', params, config);

// 工程管控详情
export const projectDetailsApi = (data) => uni.$uv.http.get('/mini/page_set/getControl', data);

// 工程管家收藏
export const stewardCollectApi = (params, config = {}) => uni.$uv.http.post('/mini/butler/setCollect', params, config);

// 预约管家
export const subscribeStewardApi = (params, config = {}) => uni.$uv.http.post('/mini/subscribe/butler', params, config);

// 搜索
export const searchApi = (params, config = {}) => uni.$uv.http.post('/mini/common/search', params, config);