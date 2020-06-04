<template>
  <div class="box">
    <!-- 轮播图区域 -->
    <div id="swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item,index) in bannerList" :key="index">
          <van-image :src="item.picUrl" width="100%"/>
        </van-swipe-item>
      </van-swipe>
      <nav>
        <figure>
          <van-icon name="like" size="35" color="#DD0000" />
          <figcaption>签到</figcaption>
        </figure>
        <figure>
          <van-icon name="gift" size="35" color="#DD0000" />
          <figcaption>礼券</figcaption>
        </figure>
        <figure>
          <van-icon name="coupon" size="35" color="#DD0000" />
          <figcaption>砍价</figcaption>
        </figure>
        <figure>
          <van-icon name="bookmark" size="35" color="#DD0000" />
          <figcaption>专栏</figcaption>
        </figure>
      </nav>
    </div>
    <!-- 全民砍价 -->
    <div id="product">
      <p class="product-head">全民砍价 <van-icon name="arrow" size="20"/></p>
      <div class="product-item" v-for="(item,index) in cutList" :key="index">
        <div class="item-left">
          <img :src="item.pic"/>
        </div>
        <div class="item-right">
          <p>{{item.name}}</p>
          <p>{{item.characteristic}}</p>
          <ol>
            <li>
              <p>¥</p>
              <p>低价</p>
            </li>
            <li>
              <p>¥{{item.originalPrice}}</p>
              <p>原价</p>
            </li>
            <li>
              <p>{{item.stores}}</p>
              <p>限量</p>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div id="product">
      <p class="product-head">人气推荐 <van-icon name="arrow" size="20"/></p>
      <div class="recommand-item" >
        <div class="item" v-for="(item,index) in recommandList" :key="index" @click="gotoDetail(item.id)">
          <p><img :src="item.pic" /></p>
          <div>
            <p>{{item.name}}</p>
            <p>{{item.characteristic}}</p>
            <p>¥{{item.originalPrice}}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import "@/assets/style/reset.css";
import urls from "@/utils/serverApi";
export default {
  name: "",
  mounted() {
    this.getBanner();
    this.getCut();
    this.getGoods();
  },
  data() {
    return {
      bannerList: [],
      cutList:[],
      recommandList:[],
    };
  },
  computed: {},
  watch: {},
  methods: {
    getBanner() {
      this.$axios({
        url: urls.bannerList
      }).then(res => {
       // console.log(res);
        if (res.code == 0) {
          this.bannerList = res.data;
        }
      });
    },
    getCut(){
      this.$axios({
        url:urls.cutList
      }).then(res=>{
        let keys = Object.keys(res.data.goodsMap).splice(-3);
        if(res.code==0){
          for(let key of keys){
            this.cutList.push(res.data.goodsMap[key]);
          }
        }
      })
    },
    getGoods(){
      this.$axios({
        url:urls.goodsList
      }).then(res=>{
        if(res.code == 0){
          for(var i=0;i<6;i++){
            let index = parseInt(Math.random()*res.data.length);
            console.log(index);
            this.recommandList.push(res.data[index]);
          }
          console.log(this.recommandList);
          
        }
      })
    },
    gotoDetail(id){
      this.$router.push("/shop/recommand/"+id);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #f8f8f8;
  padding-bottom: .88rem;
  #swiper {
    width: 100%;
    position: relative;
    margin-bottom: 0.3rem;
    nav {
      width: 100%;
      height: 2rem;
      position: absolute;
      bottom: 0px;
      background-color: #FFF;
      border-top-left-radius: 20%;
      border-top-right-radius: 20%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      figcaption {
        margin-top: 0.15rem;
        font-size: 0.35rem;
      }
    }
  }

  #product{
    background-color: #FFF;
    margin-bottom: .2rem;
    .product-head{
      line-height: .8rem;
      font-size: .35rem;
      
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .product-item{
      width: 100%;
      border-top: #dddddd 1px solid;
      display: flex;
      padding: .2rem;
      box-sizing: border-box;
      .item-left{
        img{
          width: 2.4rem;
          height: 2.4rem;
          border-radius: .1rem;
        }
      }
      .item-right{
        margin-left: .15rem;
        p:nth-child(1){
          font-size: .35rem;
          margin-bottom: .2rem;
        }
        p:nth-child(2){
          color: #808080;
          font-size: .2rem;
        }
        ol{
          width: 100%;
          display: flex;
          margin-top: .8rem;
          justify-content: space-around;
          li{
            float: left;
            width: 40%;
            text-indent: .15rem;
            p:nth-child(1),p:nth-child(2){
              font-size: .3rem;
            }
          }
          li:nth-child(1){
            p:nth-child(1){
              color: #DD0000;
              font-size: bold;
            }
          }
          li:nth-child(2),li:nth-child(3){
            color: #B0B0B0;
            font-size: .3rem;
          }
        }
      }
    }

    //推荐列表
    .recommand-item{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .item{
        width: 46%;
        padding: 2%;
        float:left;
        img{
          width: 3rem;
          height: 3rem;
        }
        div{
          p:nth-child(1){
            line-height: .6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p:nth-child(2){
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: .2rem;
            color: #B0B0B0;
          }
          p:nth-child(3){
            margin-top: .1rem;
            color: #DD0000;
            font-weight:bold;
            font-size: .3rem;
          }
        }
      }
    }
  }
}
</style>
