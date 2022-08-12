<template>
  <div class="product-detail">
    <SimpleHeader :name="'商品详情'"></SimpleHeader>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#2890fc">
          <van-swipe-item v-for="(item, index) in detail.goodsCarouselList" :key="index">
            <img :src="getUrl(item)" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{detail.goodName}}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>￥{{detail.sellingPrice}}</span>
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="detail.goodDetailContent"></div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="test"></van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" to="/cart" text="购物车" :badge="count"></van-goods-action-icon>
      <van-goods-action-button type="warning" @click="addCart" text="加入购物车" />
      <van-goods-action-button type="danger" @click="goToCart" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import SimpleHeader from "../components/SimpleHeader";
import {getDetail} from "../service/good";
import {prefix} from "../common/js/utils";
import {addCart} from "../service/cart";
import {Toast} from "vant";
export default {
  name: "ProductDetail",
  components: {SimpleHeader},
  data(){
    return {
      detail:{
        goodsCarouselList:[]
      }
    }
  },
  async mounted(){
    const {id} = this.$route.params
    const {data} = await getDetail(id)
    this.detail = data
  },
  methods:{
    getUrl(url){
      return prefix(url)
    },
    async addCart(){
      const {resultCode} = await addCart({goodCount:1, goodId:this.detail.goodId})
      if (resultCode == 200){
        Toast.success('已加入购物车!')
      }
      this.$store.dispatch('updateCart')
    },
    async goToCart(){
      await addCart({goodCount:1, goodId:this.detail.goodId})
      this.$store.dispatch('updateCart')
      this.$router.push({path:'/cart'})
    },
    test(){
      Toast.fail('该模块还在开发中')
    }
  },
  computed:{
    count() {
      return ! this.$store.state.cartCount ? '' : this.$store.state.cartCount;
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.product-detail {
  .detail-header {
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
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    margin-top: 44px;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #F63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px 50px;

        img {
          width: 100%;
        }
      }
    }
  }
  .van-goods-action-button--warning {
    background: linear-gradient(to right,@primary, #2b78c2)
  }
  .van-goods-action-button--danger {
    background: linear-gradient(to right, #5caefa, #3979b8)
  }
}
</style>