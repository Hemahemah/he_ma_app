<template>
  <div class="order-box">
    <simple-header :name="'我的订单'" :back="'/user'"></simple-header>
    <van-tabs class="order-tab" @change="onChangeTab" :color="'#2890fc'" v-model="status" :title-active-color="'#2890fc'">
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
  <van-pull-refresh class="order-list-refresh" @refresh="onRefresh" v-model="refreshing">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="10">
      <div class="order-item-box" v-for="(item, index) in list" :key="index" @click="goTo(item.orderNo)">
        <div class="order-item-header">
          <span>订单时间:{{item.createTime}}</span>
          <span>{{item.orderStatusString}}</span>
        </div>
        <van-card v-for="item in item.mallOrderItemVos"
                  :key="item.goodId"
                  :thumb="getUrl(item.goodImg)"
                  :title="item.goodName"
                  desc="全场包邮"
                  :price="item.sellingPrice"
                  :num="item.goodCount"
        >
        </van-card>
      </div>
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import SimpleHeader from "../components/SimpleHeader";
import {getOrderList} from "../service/order";
import {prefix} from "../common/js/utils";
export default {
  name: "Order",
  components: {SimpleHeader},
  data(){
    return{
      status:'',
      loading: false,
      finished: false,
      refreshing: false,
      hasNext: false,
      list:[],
      page: 1
    }
  },
  methods:{
    async loadData(){
      const { data } = await getOrderList({ status:this.status, pageNumber: this.page})
      if (this.list.length === 0){
          this.list = data.records
      }else {
        this.list = this.list.concat(data.records)
      }
      this.loading = false
      this.hasNext = data.searchCount
      if (!this.hasNext) this.finished = true
    },
    onRefresh() {
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },
    onLoad() {
      if (!this.refreshing && this.hasNext) {
        this.page = this.page + 1
      }
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData()
    },
    getUrl(url){
      return prefix(url)
    },
    onChangeTab(name){
      this.status = name
      this.onRefresh()
    },
    goTo(orderNo){
      this.$router.push({path:`/orderDetail?orderNo=${orderNo}`})
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.order-box {
  .order-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .order-name {
      font-size: 14px;
    }
  }
  .order-tab {
    margin-top: 44px;
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
  }
  .order-list-refresh {
    margin-top: 68px;
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .van-list {
      min-height: calc(100vh - 88px);
      background: #f9f9f9;
      margin-top: 20px;
    }
    .order-item-box {
      margin: 20px 10px;
      background-color: #fff;
      .order-item-header {
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #fff;
        margin-top: 0;
      }
    }
  }
}
</style>