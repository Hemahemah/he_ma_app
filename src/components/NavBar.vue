<template>
<div class="nav-bar">
  <van-tabbar v-model="active" route>
    <van-tabbar-item name="home" to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="search" to="/category" icon="shop-o">分类</van-tabbar-item>
    <van-tabbar-item name="friends" to="/cart" icon="shopping-cart-o" :badge="count">购物车</van-tabbar-item>
    <van-tabbar-item name="setting" to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>

</div>
</template>

<script>
import {getLocal} from "../common/js/utils";

export default {
  name: "NavBar",
  data() {
    return {
      active: 'home',
    };
  },
  mounted() {
     const token = getLocal('token')
     const path = this.$route.path
    if (token && path !='/home'){
      this.$store.dispatch('updateCart')
    }
  },
  computed:{
    count() {
      return ! this.$store.state.cartCount ? '' : this.$store.state.cartCount;
    }
  }
}
</script>

<style scoped>

</style>