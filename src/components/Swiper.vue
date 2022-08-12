<template>
<div class="my-swipe">
  <van-swipe class="my-swipe" :autoplay="5000" indicator-color="#2890fc">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="getUrl(item.carouselUrl)" alt="" @click="productDetail(item)">
    </van-swipe-item>
  </van-swipe>
</div>
</template>

<script>
import {getCarouselUrl} from "../common/js/utils";

export default {
  name: "Swiper",
  props:{
    list:{
      type: Array,
      default: null
    }
  },
  methods:{
    getUrl(url){
      return getCarouselUrl(url)
    },
    productDetail(item){
      this.$router.push({path:`product/${item.redirectUrl}`})
    },
  }

}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {

  img {
    width: 100%;
    height: 100%;
  }
}
</style>