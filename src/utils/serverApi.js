/**
 * 严选商城所有请求的url地址列表
 */
const prefix = "https://api.it120.cc/small4";
const urls = {
    picCodeUrl: prefix+"/verification/pic/get",//获取图形验证码url地址
    sendCodeUrl: prefix+"/verification/sms/get",//发送短信验证码接口
    checkCodeUrl: prefix+"/verification/sms/check",//发送短信验证码校验接口
    userRegister: prefix+"/user/m/register",//用户注册接口

};

export default urls;