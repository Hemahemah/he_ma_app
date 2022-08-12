<template>
  <div class="home">
    <header class="home-header wrap" :class="{'active': headerScroll}">
      <router-link to="/category" tag="span">
        <i class="iconfont icon-fenlei1"></i>
      </router-link>
      <div class="header-search">
        <span class="app-name">HEMA商城</span>
        <van-icon name="search" class="icon-search"/>
        <router-link tag="span" class="search-title" to="/productList?from=home">搜索</router-link>
      </div>
      <router-link class="login" tag="span" to="/user" v-if="isLogin">
        <van-icon name="user-o" />
      </router-link>
      <router-link class="login" tag="span" to="/login" v-else>
        登录
      </router-link>
    </header>
    <swiper :list="swiperList"></swiper>
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId" @click="getCategory">
        <img :src="item.imgUrl" alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">新品上线</header>
      <div class="good-box">
        <div class="good-item" v-for="item in newGoodses" :key="item.goodId" @click="productDetail(item)">
          <img :src="getUrl(item.goodImg)" alt="">
          <div class="good-desc">
            <div class="title">{{item.goodName}}</div>
            <div class="price">¥ {{item.sellingPrice}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <header class="good-header">热门商品</header>
      <div class="good-box">
        <div class="good-item" v-for="item in hots" :key="item.goodId" @click="productDetail(item)">
          <img :src="getUrl(item.goodImg)" alt="">
          <div class="good-desc">
            <div class="title">{{item.goodName}}</div>
            <div class="price">¥ {{item.sellingPrice}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good" :style="{ paddingBottom: '100px'}">
      <header class="good-header">最新推荐</header>
      <div class="good-box">
        <div class="good-item" v-for="item in recommends" :key="item.goodId" @click="productDetail(item)">
          <img :src="getUrl(item.goodImg)" alt="">
          <div class="good-desc">
            <div class="title">{{item.goodName}}</div>
            <div class="price">¥ {{item.sellingPrice}}</div>
          </div>
        </div>
      </div>
      <div style="width:230px;margin:0 auto; padding:30px 0 0 0;">
        <img src="../assets/beian.png">
        <a target="_blank" :href="beianUrl" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">闽公网安备 35018102000644号</p></a>
      </div>
    </div>
      <NavBar></NavBar>
  </div>

</template>

<script>
import NavBar from "../components/NavBar";
import {getLocal, prefix} from "../common/js/utils";
import Swiper from "../components/Swiper";
import {Toast} from "vant";
import {getHome} from "../service/home";
export default {
  name: 'Home',
  components:{
    Swiper,
    NavBar
  },
  data(){
    return{
      active: 0,
      isLogin:false,
      swiperList:[],
      hots:[],
      beianUrl:'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35018102000644',
      headerScroll: false,
      newGoodses:[],
      recommends:[],
      categoryList:[
        {
          categoryId:10001,
          name:'HEMA生鲜',
          imgUrl:require('../assets/生鲜.png'),
        },
        {
          categoryId:10002,
          name:'HEMA全球购',
          imgUrl:require('../assets/商业化全球.png'),
        },
        {
          categoryId:10003,
          name:'优惠活动',
          imgUrl:require('../assets/优惠券.png'),
        },
        {
          categoryId:10004,
          name:'HEMA到家',
          imgUrl:require('../assets/物流.png'),
        },
        {
          categoryId:10005,
          name:'全部',
          imgUrl:require('../assets/全部.png'),
        }
      ]
    }
  },
  methods:{
    pageScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false
    },
    getCategory(){
      Toast.fail('模块还在开发中')
    },
    productDetail(item){
      this.$router.push({path:`product/${item.goodId}`})
    },
    getUrl(url){
      return prefix(url)
    },
  },
  async mounted(){
    const token = getLocal('token');
    if (token){
      this.isLogin = true;
    }
    window.addEventListener('scroll', this.pageScroll)
    Toast.loading({
      message: '加载中...',
      forbidClick: true
    });
    const {data} = await getHome()
    this.swiperList = data.carousels
    this.hots = data.hotGoodses
    this.newGoodses = data.newGoodses
    this.recommends = data.recommendGoodses
    Toast.clear()
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.home-header{
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  .fj();
  line-height: 50px;
  padding: 0 15px;
  .boxSizing();
  font-size: 15px;
  color: #fff;
  z-index: 10000;
  .icon-fenlei1 {
    font-size: 19px;
    color: @primary;
  }
  &.active {
    background: @primary;
    .icon-fenlei1 {
      color: #fff;
    }
    .login {
      color: #fff;
    }
  }
  .header-search {
    display: flex;
    .wh(74%, 20px);
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    color: #232326;
    background: rgba(255, 255, 255, .7);
    border-radius: 20px;
    .app-name {
      padding: 0 10px;
      color: @primary;
      font-size: 20px;
      font-weight: bold;
      border-right: 1px solid #666;
    }
    .icon-search {
      top: 2px;
      padding: 0 10px;
      font-size: 17px;
    }
    .search-title {
      font-size: 12px;
      color: #666;
      line-height: 21px;
    }
  }
  .login {
    color: @primary;
    line-height: 52px;
    .van-icon-manager-o {
      font-size: 20px;
      vertical-align: -3px;
    }
  }

}
.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;
  div {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    img {
      .wh(40px, 40px);
      margin: 13px auto 8px auto;
    }
  }
}
.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1PX solid #e9e9e9;
      padding: 10px 10px;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1PX solid #e9e9e9;
      }
    }
  }
}
</style>