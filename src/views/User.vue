<template>
  <div class="user-box">
    <SimpleHeader :name="'我的'"></SimpleHeader>
    <div class="user-info">
      <div class="info">
        <img src="../assets/20220510210750.jpg" alt=""/>
        <div class="user-desc">
          <span>昵称:{{user.nickName}}</span>
          <span>登录名:{{user.loginName}}</span>
          <span class="name">个性签名:{{user.introduceSign}}</span>
        </div>
      </div>
    </div>
    <ul class="user-list">
      <li @click="goTo('/order')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('/setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('/address?from=mine')">
        <span>地址管理</span>
        <van-icon name="arrow" />
      </li>
    </ul>
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import SimpleHeader from "../components/SimpleHeader";
import {getUserInfo} from "../service/user";
export default {
  name: "User",
  components: {SimpleHeader, NavBar},
  data(){
    return {
      user:{}
    }
  },
  methods:{
    goTo(name){
      this.$router.push({path: name})
    }
  },
  async mounted() {
     const {data} = await getUserInfo();
     this.user = data
  }
}
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.user-box {
  .user-header {
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
    .user-name {
      font-size: 14px;
    }
  }
  .user-info {
    width: 94%;
    height: 115px;
    background: linear-gradient(90deg, @primary, #4da9ff);
    box-shadow: 0 2px 5px #2890fc;
    border-radius: 6px;
    margin: 70px 10px 10px;

    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 20px;
    margin-top: 20px;
    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e9e9e9;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>