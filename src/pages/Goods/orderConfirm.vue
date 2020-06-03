<template>
  <div>
    <van-nav-bar title="订单确认" left-arrow />

    <van-contact-card
      type="edit"
      v-show="addressInfo!=''"
      :name="addressInfo.linkMan"
      :tel="addressInfo.mobile"
      :editable="true"
    />
    <van-contact-card v-show="addressInfo.length==0" add-text="新增收货地址" @click="addAddress" />

    <van-cell title="商品信息" />

    <van-card
      v-for="(item,index) in cartList"
      :thumb="item.imageUrl"
      :title="item.name"
      :desc="item.pName"
      :price="item.price"
      :key="index"
      :num="item.nums"
    />
    
    <van-cell title="配送方式" value="快递"/>
    <van-field label="备注"  placeholder="输入备注的信息"/>
    <van-cell title="商品金额" :value="`¥${totalAmounts}`"/>

    <van-submit-bar :price="totalAmounts*100" button-text="提交订单" @submit="submitOrder"/>
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  name: "",
  mounted() {
    this.getAddress();
    this.getCartList();
  },
  data() {
    return {
      choseAddressId: 0,
      addressInfo: [],
      cartList: []
    };
  },
  computed: {
      totalAmounts(){
          let amounts = 0
          this.cartList.forEach((item,index)=>{
              amounts += item.price *item.nums;
          });

          return amounts;
      }
  },
  watch: {},
  methods: {
    addAddress() {
      this.$router.push("/shop/add/address");
    },
    getAddress() {
      this.$axios({
        url: "https://api.it120.cc/small4/user/shipping-address/list"
      }).then(res => {
        let index = res.data.findIndex(item => {
          return item.isDefault == true;
        });
        if (index > 0) {
          this.addressInfo = res.data[index];
        } else {
          this.addressInfo = res.data[0];
        }
        console.log(this.addressInfo);
      });
    },
    getCartList() {
      //从本地存储中获取数据
      let data = storage.getStorage("shop_cart", true);

      if (data != "") {
        this.cartList = data;
      }
    },

    submitOrder(){
        let arr = [];
        this.cartList.forEach((item,index)=>{
            let obj = new Object();
            obj.goodsId = item.id;
            obj.number = item.nums;
            obj.propertyChildIds = item.properties;
            obj.logisticsType = 0;
            arr.push(obj);
        })
        console.log(arr);
       
        this.$axios({
            url:"https://api.it120.cc/small4/order/create",
            method:"post",
            params:{
                goodsJsonStr: arr,
            }
        }).then(res=>{
            console.log(res);
        })
    }
  }
};
</script>

<style scoped>
</style>
