<template>
<div class="setting-box">
  <simple-header :name="'账号管理'"></simple-header>
  <div class="input-item">
    <van-field v-model="nickName" label="昵称"></van-field>
    <van-field v-model="introduceSign" label="个性签名"></van-field>
    <van-field v-model="password" type="password" label="修改密码"></van-field>
  </div>
  <van-button class="save-btn" @click="save" type="primary" color="#2890fc" block>保存</van-button>
  <van-button class="save-btn" @click="logout" type="danger" block>退出登录</van-button>
</div>
</template>

<script>
import SimpleHeader from "../components/SimpleHeader";
import {editUserInfo, getUserInfo, logout} from "../service/user";
import {Toast} from "vant";
import {setLocal} from "../common/js/utils";
export default {
  name: "Setting",
  components: {SimpleHeader},
  data(){
    return{
      nickName: '',
      introduceSign: '',
      password: ''
    }
  },
  methods:{
    async save(){
      const param = {
        nickName: this.nickName,
        passwordMd5: this.password ? this.$md5(this.password) : '',
        introduceSign: this.introduceSign
      }
      await editUserInfo(param);
      Toast.success('修改成功!')
      setTimeout(()=>{
        this.$router.push({path:'/user'})
      }, 1000)
    },
    async logout(){
      const { resultCode } = await logout();
      if (resultCode == 200){
        setLocal('token','')
        await this.$router.push({path: '/'})
      }
    },
  },

  async mounted() {
    const { data } = await getUserInfo()
    this.nickName = data.nickName
    this.introduceSign = data.introduceSign
  }
}
</script>

<style lang="less" scoped>
.setting-box {
  .input-item {
    margin-top: 44px;
  }
  .save-btn {
    width: 85%;
    margin: 20px auto ;
  }
}
</style>