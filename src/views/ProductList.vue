<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <van-icon class="left" name="arrow-left" @click="goBack"/>
        <div class="header-search">
          <van-icon class="search" name="search" />
          <input
              type="text"
              class="search-title"
              placeholder="请输入关键字"
              v-model="keyword"/>
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#2890fc" @click="changeTab" >
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="product-list-refresh" >
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="10">
        <div class="product-item" v-for="(item, index) in productList" :key="index" @click="productDetail(item)">
          <img :src="getUrl(item.goodImg)" />
          <div class="product-info">
            <p class="name">{{item.goodName}}</p>
            <p class="subtitle">{{item.goodIntro}}</p>
            <span class="price">￥ {{item.sellingPrice}}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {search} from "../service/good";
import {prefix} from "../common/js/utils";

export default {
  name: "ProductList",
  data(){
    return {
      refreshing: false,
      keyword: this.$route.query.keyword || '',
      searchBtn: false,
      selectActive: false,
      list: [],
      loading: false,
      finished: false,
      productList: [],
      hasNext: false,
      page: 1,
      orderBy: ''
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    getSearch(){
      this.onRefresh()
    },
    pageScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > 50 ? this.seclectActive = true : this.seclectActive = false
    },
    onRefresh(){
      this.refreshing = true
      this.finished = false
      this.loading = true
      this.page = 1
      this.onLoad()
    },
    getUrl(url){
     return  prefix(url)
    },
    productDetail(item){
      this.$router.push({path:`product/${item.goodId}`})
    },
    onLoad() {
      if (!this.refreshing && this.hasNext) {
        this.page = this.page + 1
      }
      if (this.refreshing) {
        this.productList = [];
        this.refreshing = false;
      }
      this.init()
    },
    async init(){
      const { categoryId } = this.$route.query
      if (!categoryId && !this.keyword) {
        // Toast.fail('请输入关键词')
        this.finished = true
        this.loading = false;
        return
      }
      const { data } = await search({pageNumber: this.page, goodsCategoryId: categoryId, keyword: this.keyword, orderBy: this.orderBy})
      if (this.productList.length === 0){
        this.productList =  data.records
      }else {
        this.productList =  this.productList.concat(data.records)
      }
      this.hasNext = data.searchCount
      this.loading = false;
      if (!this.hasNext) this.finished = true
    },
    changeTab(name) {
      this.orderBy = name
      this.onRefresh()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .category-header {
    .fj();
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .left {
      top: 16px;
      font-size: 20px;
    }
    .header-search {
      display: flex;
      width: 76%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #F7F7F7;
      .borderRadius(20px);
      .search {
        top: 2px;
        padding: 0 5px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        background: #F7F7F7;
      }
    }
    .icon-More {
      font-size: 20px;
    }
    .search-btn {
      height: 28px;
      margin: 8px 0;
      line-height: 28px;
      padding: 0 5px;
      color: #fff;
      background: @primary;
      .borderRadius(5px);
      margin-top: 10px;
    }
  }
}
.product-list-refresh {
  margin-top: 78px;
  .product-item {
    .fj();
    width: 100%;
    height: 120px;
    padding: 10px 0;
    border-bottom: 1px solid #dcdcdc;
    img {
      width: 140px;
      height: 120px;
      padding: 0 10px;
      .boxSizing();
    }
    .product-info {
      width: 56%;
      height: 120px;
      padding: 5px;
      text-align: left;
      .boxSizing();
      p {
        margin: 0
      }
      .name {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .subtitle {
        width: 100%;
        max-height: 20px;
        padding: 10px 0;
        line-height: 25px;
        font-size: 13px;
        color: #999;
        overflow: hidden;
      }
      .price {
        color: @primary;
        font-size: 16px;
      }
    }
  }
}
</style>