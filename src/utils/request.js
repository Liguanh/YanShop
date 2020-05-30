/**
 * 定义axios拦截器
 */
 import Server from "axios";

 //创建一个空的axios对象
 Server.create({

 });

 //定义请求拦截器
 Server.interceptors.request.use((config)=>{
    return config;
 },function(error){
     return Promise.reject(error);
 })


 //定义响应拦截器
Server.interceptors.response.use((response)=>{
     //格式化数据响应格式
     if(response.status == 200){
         return response.data;
     }
 },function(error){

     return Promise.reject(error);
});

export default Server;
