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

 import recommandDetail from "@/pages/Goods/recommand";
 import confirmOrder from "@/pages/Goods/orderConfirm";
 import payConfirm from "@/pages/Goods/payConfirm";
 import addAddress from "@/pages/User/addAddress";

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
         path: "/",
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
     },{
         path: "/shop/recommand/:id",
         name: "shop_recommand",
         component: recommandDetail,
         meta:{
             title: "严选商城-推荐商品"
         }
     },{
         path:"/shop/order/confirm",
         name: "order_confirm",
         component: confirmOrder,
         meta:{
             title:"严选商城-订单确认",
         }
     },{
        path:"/shop/pay/confirm",
        name: "pay_confirm",
        component: payConfirm,
        meta:{
            title:"严选商城-支付确认",
        }
    },{
        path: "/shop/add/address",
        name: "add_address",
        component: addAddress,
        meta:{
            title:"严选商品-添加地址"
        }
     }
 ];

 export default routes;