<template>
  <div class="category">
    <header class="category-header wrap">
      <van-icon class="left" name="arrow-left" @click="goHome"/>
      <div class="header-search">
        <van-icon class="search" name="search" />
        <router-link tag="span" class="search-title" to="/productList?from=category">HEMA商城</router-link>
      </div>
      <van-icon class="category-more" name="ellipsis"/>
    </header>
    <div class="search-wrap" ref="searchWrap">
      <list-scroll :scroll-data="categoryData" class="nav-side-wrapper">
        <ul class="nav-side">
         <li v-for="item in categoryData"
             :key="item.categoryId"
             :class="{'active' : currentIndex === item.categoryId}"
             @click="selectMenu(item.categoryId)">{{item.categoryName}}</li>
        </ul>
      </list-scroll>
      <div class="search-content">
        <list-scroll :scroll-data="categoryData">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in categoryData">
                <div class="swiper-slide" v-if="currentIndex == category.categoryId" :key="index">
                  <div class="category-list" v-for="(products, index) in category.childrenCategories" :key="index">
                    <p class="catogory-title">{{products.categoryName}}</p>
                    <div class="product-item" v-for="(product, index) in products.childrenCategories" :key="index" @click="selectProduct(product)">
                      <img src="../assets/category.png" class="product-img"/>
                      <p v-text="product.categoryName" class="product-title"></p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import ListScroll from "../components/ListScroll";
import {getCategory} from "../service/good";
export default {
  name: "Category",
  components: {ListScroll, NavBar},
  data(){
    return{
      categoryData:[],
      currentIndex: 15
    }
  },
  methods:{
    goHome(){
      this.$router.push({ path: '/' })
    },
    selectMenu(id){
      this.currentIndex = id;
    },
    setWrapHeight() {
      // 设置视口高度
      let $screenHeight = document.documentElement.clientHeight
      this.$refs.searchWrap.style.height = $screenHeight - 100 + 'px'
    },
    selectProduct(item){
      this.$router.push({ path: `/productList?categoryId=${item.categoryId}` })
    },
  },
  async mounted(){
    this.setWrapHeight()
    const {data} = await getCategory()
    this.categoryData = data;
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.category {
  .category-header {
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(100%, 50px);
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .left {
      top: 14px;
      font-size: 20px;
    }
    .header-search {
      display: flex;
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #F7F7F7;
      border-radius: 20px;
      .search {
        top: 2px;
        padding: 0 10px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
      }
    }
    .category-more {
      top: 14px;
      font-size: 20px;
    }
  }
}
.search-wrap {
  .fj();
  width: 100%;
  margin-top: 50px;
  background: #F8F8F8;
  border-top: 1px solid #999;
  .nav-side-wrapper {
    width: 28%;
    height: 100%;
    overflow: hidden;
    .nav-side {
      width: 100%;
      .boxSizing();
      background: #F8F8F8;
      li {
        width: 100%;
        height: 56px;
        text-align: center;
        line-height: 56px;
        font-size: 14px;
        &.active {
          color: @primary;
          background: #fff;
        }
      }
    }
  }
  .search-content {
    width: 72%;
    height: 100%;
    padding: 0 10px;
    background: #fff;
    .boxSizing();
    .swiper-container {
      width: 100%;
      .swiper-slide {
        width: 100%;
        .category-main-img {
          width: 100%;
        }
        .category-list {
          display: flex;
          flex-wrap: wrap;
          flex-shrink: 0;
          width: 100%;
          .catogory-title {
            width: 100%;
            font-size: 17px;
            font-weight: 500;
            padding: 20px 0;
          }
          .product-item {
            width: 33.3333%;
            margin-bottom: 10px;
            text-align: center;
            font-size: 15px;
            .product-img {
              .wh(30px, 30px);
            }
          }
        }
      }
    }
  }
}
</style>