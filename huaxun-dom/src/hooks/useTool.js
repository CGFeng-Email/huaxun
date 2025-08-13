// 图片转base64
function base64(url, type) {
	return new Promise((resolve, reject) => {
		uni.getFileSystemManager().readFile({
			filePath: url, //选择图片返回的相对路径
			encoding: 'base64', //编码格式
			success: res => {
				resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
				// resolve(res.data);
			},
			fail: res => reject(res.errMsg)
		})
	})
}

export {
	base64
}