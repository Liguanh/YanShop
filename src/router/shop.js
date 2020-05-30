/**
 * 商品相关的路由文件操作
 */
 import Login from "@/pages/Login/login";
 import Register from "@/pages/Login/register";

 import Home from "@/pages/Home/home";
 import index from "@/pages/Home/index";
 import category from "@/pages/Home/category";
 import cart from "@/pages/Home/cart";
 import mine from "@/pages/Home/mine";

 //定义路由严选商城专用
 const routes = [
     //登陆的路由信息
     {
        path: "/shop/login",
        name: "shop_login",
        component: Login,
        meta:{
            title: "严选商城-用户登陆"
        }
     },
     //注册的路由信息
     {
        path: "/shop/register",
        name: "shop_register",
        component: Register,
        meta:{
            title: "严选商城-用户注册"
        }
     },
     /**首页信息 */
     {
         path: "/shop/home",
         component: Home,
         redirect: "/shop/index",
         children:[
             {
                 path:"/shop/index",
                 name:"shop_index",
                component:index,
                meta:{
                    title: "严选商城-首页"
                },
             },
             {
                path:"/shop/category",
                name:"shop_category",
               component:category,
               meta:{
                   title: "严选商城-分类"
               },
            },
            {
                path:"/shop/cart",
                name:"shop_cart",
               component:cart,
               meta:{
                   title: "严选商城-购物车"
               },
            },
            {
                path:"/shop/mine",
                name:"shop_mine",
               component:mine,
               meta:{
                   title: "严选商城-用户中心"
               },
            },
         ]
     }
 ];

 export default routes;