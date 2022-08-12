<template>
  <div class="cart-box">
    <SimpleHeader :name="'购物车'"></SimpleHeader>
    <div class="cart-body">
      <van-checkbox-group @change="groupChange" v-model="result" ref="checkboxGroup">
        <van-swipe-cell :right-width="50" v-for="(item, index) in list" :key="index">
          <div class="good-item">
            <van-checkbox :name="item.cartItemId"/>
            <div class="good-img">
              <img :src="getUrl(item.goodImg)" alt="">
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{item.goodName}}</span>
                <span>x{{item.goodCount}}</span>
              </div>
              <div class="good-btn">
                <div class="price">￥{{item.sellingPrice}}</div>
                <van-stepper integer
                             :min="1"
                             async-change
                             :value="item.goodCount"
                             :name="item.cartItemId" @change="onChange"/>
              </div>
            </div>
          </div>
          <van-button slot="right"
                      square
                      icon="delete"
                      type="danger"
                      class="delete-button"
                      @click="deleteGood(item.cartItemId)"></van-button>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
  <van-submit-bar button-text="结算" class="submit-all" :price="total" @submit="onSubmit">
      <van-checkbox @click="allCheck"  v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
    <div class="empty" v-if="!list.length">
      <van-icon name="smile-o" />
      <div class="title">购物车空空空如也</div>
      <van-button color="#2890fc" type="primary" @click="goTo" block>前往首页</van-button>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import SimpleHeader from "../components/SimpleHeader";
import {Toast} from "vant";
import {deleteCartItem, getCart, modifyCart} from "../service/cart";
import {prefix} from "../common/js/utils";

export default {
  name: "Cart",
  components:{
    SimpleHeader,
    NavBar
  },
  data(){
    return{
      result: [],
      list: [],
      checkAll: true
    }
  },
  methods:{
    async init(){
      Toast.loading({message:'加载中...', forbidClick:true})
      const {data} = await getCart();
      this.list = data
      this.result = this.list.map(item => item.cartItemId)
      Toast.clear()
    },
    getUrl(url){
      return prefix(url)
    },
    goTo(){
      this.$router.push({path:'/'})
    },
    allCheck(){
      if (this.checkAll){
        this.result = this.list.map(item => item.cartItemId)
      }else {
        this.result = []
      }
    },
    async onChange(value, detail){
      if (this.list.filter(item => item.cartItemId === detail.name)[0].goodCount === value) return
      Toast.loading({message:'修改中...', forbidClick:true})
      const params = {
        cartItemId: detail.name,
        goodCount: value
      }
      await modifyCart(params);
      this.list.forEach(item => {
        if (item.cartItemId === detail.name){
          item.goodCount = value
        }
      })
      Toast.clear()
    },
    groupChange(){
       this.checkAll = this.result.length === this.list.length;
    },
    async deleteGood(cartItemId) {
       await deleteCartItem(cartItemId)
       this.$store.dispatch('updateCart')
       this.init()
    },
     onSubmit(){
      if (this.result.length === 0){
        Toast.fail('请选择商品进行结算')
        return
      }
      const params = JSON.stringify(this.result)
      this.$router.push({path:`createOrder?cartItemIds=${params}`})
    }
  },
  mounted() {
    this.init()
  },
  computed:{
    total(){
      let sum = 0
      let _list = this.list.filter(item => this.result.includes(item.cartItemId))
      _list.forEach(item => {
        sum += item.goodCount * item.sellingPrice
      })
      return sum * 100
    },
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.cart-box {
  .cart-header {
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
    .cart-name {
      font-size: 14px;
    }
  }
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    padding-bottom: 100px;
    .good-item {
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
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 60%;
    text-align: center;
    margin: 10px 5px 80px 75px;
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 10px
    }
    .van-submit-bar__text {
      margin-right: 10px
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>