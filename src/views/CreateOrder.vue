<template>
  <div class="create-order">
    <simple-header :name="'生成订单'" @callback="deleteLocal"></simple-header>
    <van-notice-bar class="notice-bar" scrollable left-icon="volume-o" text="该商城所有数据均为模拟数据，不涉及实际交易"></van-notice-bar>
    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span>{{ address.userName }}</span>
        <span>{{ address.userPhone }}</span>
      </div>
      <div class="address">
        {{ address.provinceName }} {{ address.cityName }} {{ address.regionName }} {{ address.detailAddress }}
      </div>
      <van-icon class="arrow" name="arrow"/>
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in cartList" :key="index">
        <div class="good-img"><img :src="getUrl(item.goodImg)" alt=""></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goodName }}</span>
            <span>x{{ item.goodCount }}</span>
          </div>
          <div class="good-btn">
            <div class="price">￥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>￥{{total}}</span>
      </div>
      <van-button class="pay-btn" color="#2890fc" @click="createOrder" type="primary" block>生成订单</van-button>
    </div>
    <van-popup closeable
               :close-on-click-overlay="false"
               v-model="showPay"
               position="bottom"
               @close="close"
               :style="{height:'30%'}">
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-count-down :time="time" format="待支付：mm 分 ss 秒" style="text-align: center;margin-bottom: 25px;font-size: large;font-weight: bolder;"/>
        <van-button @click="payOrder(1)" :style="{ marginBottom: '10px' }" block color="#1989fa">支付宝支付</van-button>
        <van-button @click="payOrder(2)" color="#4fc08d" block>微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import SimpleHeader from "../components/SimpleHeader";
import {Toast} from "vant";
import {getLocal, prefix, setLocal} from "../common/js/utils";
import {getAddressDetail, getDefaultAddress} from "../service/address";
import {getByCartItemIds} from "../service/cart";
import {createOrder, payOrder} from "../service/order";
export default {
  name: "CreateOrder",
  components: {SimpleHeader},
  data(){
    return {
      cartList: [],
      address: {},
      showPay: false,
      orderNo: '',
      cartItemIds: [],
      time: 30 * 60 * 1000
    }
  },
  methods:{
    async init(){
      Toast.loading({ message:'加载中...', forbidClick:true })
      const { addressId, cartItemIds } = this.$route.query
      const _cartItemIds = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(getLocal('cartItemIds'))
      setLocal('cartItemIds', JSON.stringify(_cartItemIds))
      const { data:list } = await getByCartItemIds({cartItemIds: _cartItemIds.join(',')})
      const { data:address } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress()
      if (!address){
        this.$router.push({path:'address'})
        return
      }
      this.cartList = list
      this.address = address
      Toast.clear()
    },
    getUrl(url){
      return prefix(url)
    },
    async createOrder(){
      const params = { addressId: this.address.addressId, cartItemIds: this.cartList.map(item => item.cartItemId) }
      const { data } = await createOrder(params)
      this.orderNo = data
      this.deleteLocal()
      this.showPay = true
    },
    deleteLocal(){
      setLocal('cartItemIds','')
    },
    close(){
     this.$router.push({ path: '/order'})
    },
    goTo(){
      this.$router.push({path:`address?cartItemIds=${JSON.stringify(this.cartItemIds)}`})
    },
    async payOrder(type){
      await payOrder({payType: type, orderNo: this.orderNo})
      this.$router.push({path: '/order'})
    }

  },
  computed:{
    total(){
      let sum = 0
      this.cartList.forEach(item => {
        sum += item.goodCount * item.sellingPrice
      })
      return sum.toFixed(2)
    },
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.create-order {
  background: #f9f9f9;
  .notice-bar{
    margin-top: 40px;
  }
  .address-wrap {
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name, .address {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
      background-size: 80px;
      content: '';
    }
  }
  .good {
    margin-bottom: 120px;
  }
  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;
    .good-img {
      img {
        .wh(100px, 100px)
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    >div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>