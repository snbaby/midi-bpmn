export const processError = (self, message = '加载异常,请联系管理员进行处理') => {
    if (Object.prototype.hasOwnProperty.call(self, 'errMessage')) {
        self.errMessage = message
    }
    if (Object.prototype.hasOwnProperty.call(self, 'spinning')) {
        self.spinning = false
    }
}
