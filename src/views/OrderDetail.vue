<template>
<div class="order-detail-box">
<simple-header :name="'订单详情'" @callback="close"></simple-header>
  <div class="order-step" v-if="detail.orderStatus >= 0">
    <van-steps  :active="detail.orderStatus" active-color="#2890fc">
      <van-step>待支付</van-step>
      <van-step>已支付</van-step>
      <van-step>配货完成</van-step>
      <van-step>出库成功</van-step>
      <van-step>交易成功</van-step>
    </van-steps>
  </div>
  <div class="order-status" :style="detail.orderStatus < 0 ? 'margin-top: 44px' : 'margin-top: 0px'">
    <div class="status-item">
      <label>订单状态：</label>
      <span>{{detail.orderStatusString}}</span> &nbsp;
      <van-count-down  v-if="detail.orderStatus === 0"
                       style="opacity: 0.7;display: inline-block;"
                       :time="expireTime" format="(mm分后取消订单)"
                       @finish="isFinish"> </van-count-down>
    </div>
    <div class="status-item">
      <label>订单编号：</label>
      <span>{{detail.orderNo}}</span>
    </div>
    <div class="status-item">
      <label>下单时间：</label>
      <span>{{detail.createTime}}</span>
    </div>
    <van-button v-if="[1,2,3].includes(detail.orderStatus)" style="margin-bottom: 10px" color="#2890fc" block @click="handleConfirmOrder(detail.orderNo)">确认收货</van-button>
    <van-button v-if="detail.orderStatus == 0" style="margin-bottom: 10px" color="#2890fc" block @click="showPayFn">去支付</van-button>
    <van-button v-if="!(detail.orderStatus < 0 || detail.orderStatus == 4)" block @click="cancelOrder(detail.orderNo)">取消订单</van-button>
  </div>
  <div class="order-price">
    <div class="price-item">
      <label>商品金额：</label>
      <span>¥{{ detail.totalPrice }}</span>
    </div>
    <div class="price-item">
      <label>配送方式：</label>
      <span>顺丰快递</span>
    </div>
  </div>
  <van-card v-for="item in detail.mallOrderItemVos"
            :key="item.goodId"
            style="background: #fff"
            :num="item.goodCount"
            :price="item.sellingPrice"
            desc="全场包邮"
            :title="item.goodName"
            :thumb="getUrl(item.goodImg)"
            @click="goTo(item)">
  </van-card>
  <van-popup v-model="showPay"
             position="bottom"
             :style="{height:'24%'}">
    <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
      <van-button :style="{ marginBottom: '10px' }"  color="#1989fa" block @click="pay(detail.orderNo, 1)">支付宝支付</van-button>
      <van-button color="#4fc08d" block @click="pay(detail.orderNo, 2)">微信支付</van-button>
    </div>
  </van-popup>
</div>
</template>

<script>

import {Dialog, Toast} from "vant";
import {cancelOrder, confirmOrder, getOrderDetail, payOrder} from "../service/order";
import SimpleHeader from "../components/SimpleHeader";
import {prefix} from "../common/js/utils";

export default {
  name: "OrderDetail",
  components: {SimpleHeader},
  data(){
    return{
      detail:{},
      showPay:false,
      expireTime:0
    }
  },
  methods:{
    async init(){
      Toast.loading({ message:'加载中...', forbidClick:true })
      const { orderNo } = this.$route.query
      const { data } = await getOrderDetail(orderNo)
      this.detail = data
      let nowTime = new Date();
      let createTime = new Date(this.detail.createTime.replace(/-/g, '/'));
      this.expireTime = createTime.getTime() + 30 * 60 * 1000 + 2000 - nowTime
      Toast.clear()
    },
    async isFinish() {
      const {orderNo} = this.$route.query
      const {data} = await getOrderDetail(orderNo)
      console.log(data)
      this.detail = data
      console.log(this.detail)
      console.log("over")
    },
    close(){
      Dialog.close()
    },
    getUrl(url){
      return prefix(url)
    },
    handleConfirmOrder(id){
      Dialog.confirm({title: '是否确认收货?'}).then(
          ()=>{
            confirmOrder(id).then(
                res => {
                  if (res.resultCode == 200){
                    Toast.success('确认成功!')
                    setTimeout(()=>{
                      this.init()
                    },1000)
                  }
                }
            )
          }
      ).catch(()=>{})
    },
    showPayFn(){
      this.showPay = true
    },
    cancelOrder(id){
      Dialog.confirm({title:'确认要取消订单?'}).then(()=>{
        cancelOrder(id).then(
            res => {
              if (res.resultCode == 200){
                Toast.success('取消成功!')
                setTimeout(()=>{
                  this.init()
                },1000)
              }
            }
        )
      }).catch(()=>{})
      //todo
    },
    goTo(item){
      this.$router.push({path:`product/${item.goodId}`})
      //todo
    },
    async pay(orderNo, type) {
      Toast.loading('支付中...')
      await payOrder({ orderNo:orderNo, payType:type })
      this.showPay = false
      this.init()
    }
  },
    mounted() {
      this.init()
  }
}
</script>

<style lang="less" scoped>
.order-detail-box {
  background: #f7f7f7;
  .order-step{
    margin-top: 44px;
    padding-bottom: 20px;
  }
  .order-status {
    background: #fff;
    padding: 20px;
    font-size: 15px;
    .status-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .order-price {
    background: #fff;
    margin: 20px 0;
    padding: 20px;
    font-size: 15px;
    .price-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {

      }
    }
  }
  .van-card {
    margin-top: 0;
  }
  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>