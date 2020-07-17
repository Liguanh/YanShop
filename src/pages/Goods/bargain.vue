<template>
  <div class="box">
    <div class="top-arrow" @click="gotoBack">
      <van-icon name="arrow-left" size="30" />
    </div>
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item,index) in goods_imgs" :key="index">
        <van-image :src="item.pic" class="img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品详情信息 -->
    <div class="goods_info">
      <p>{{goods_info.name}}</p>
      <p>{{goods_info.characteristic}}</p>
      <p>
        <span>低价:¥{{goods_info.minPrice}}&nbsp;&nbsp;&nbsp;原价:¥{{goods_info.originalPrice}}</span>
        <span>库存 {{goods_info.stores}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import "@/assets/style/reset.css";
import urls from "@/utils/serverApi";
export default {
  name: "",
  mounted() {
    this.goodsId = this.$route.params.id;
    this.getBargain();
  },
  data() {
    return {
      goodsId: 0,
      goods_imgs: [],
      goods_info: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    gotoBack() {
      this.$router.go(-1);
    },
    getBargain() {
      this.$axios({
        url: urls.goodsDetail,
        params: { id: this.goodsId }
      }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.goods_imgs = res.data.pics; //商品的轮播图
          this.goods_info = res.data.basicInfo; //商品基本信息
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #f0f0f0;
  position: relative;
  .top-arrow {
    position: fixed;
    left: 0.1rem;
    top: 0.1rem;
    padding: 0.2rem;
    background-color: #fafafa;
    z-index: 10;
    border-radius: 50%;
  }
  .img {
    width: 100%;
    height: 8rem;
  }
  .goods_info {
    background-color: #fff;
    width: 100%;
    padding: 3%;
    box-sizing: border-box;
    margin-bottom: 0.3rem;
    p:nth-child(1) {
      line-height: 0.88rem;
      font-size: 0.35rem;
    }
    p:nth-child(2) {
      font-size: 0.25rem;
      color: #b0b0b0;
    }
    p:nth-child(3) {
      display: flex;
      justify-content: space-between;
      line-height: 0.8rem;
    }
  }
  .goods_intro {
    background-color: #fff;
    width: 100%;
    padding: 3%;
    box-sizing: border-box;
    .intro {
      margin-top: 0.5rem;
      width: 100%;
      overflow: hidden;
      ul {
        width: 100% !important;
        p {
          width: 100% !important;
        }
      }
      img {
        width: 100% !important;
      }
    }
  }
}
</style>
