// banner
export const postBanner = (params, config = {}) => uni.$uv.http.post('/mini/ad/getList', params, config);

// 获取openid
export const openId = (params, config = {}) => uni.$uv.http.post('/mini/user/getOpenidByCode', params, config);

// 登录
export const wxLogin = (params, config = {}) => uni.$uv.http.post('/mini/user/login', params, config);

// 预约数量
export const subscribeNumber = (params, config = {}) => uni.$uv.http.post('/mini/page_set/getSubscribe', params, config);