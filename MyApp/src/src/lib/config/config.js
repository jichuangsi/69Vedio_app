export default {
    install(Vue,options)
    {
        const messages = {};
        messages['700'] = '网络异常，不能连接到服务器！';
        Vue.prototype.apiHost = function () {
            return 'http://localhost:8080';
        };
        Vue.prototype.getMsg = function (code) {
            return messages[code];
        };
    }
}
