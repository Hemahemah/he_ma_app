<template>
  <div class="address-box">
    <SimpleHeader :name="'地址管理'" :back="'/user'"></SimpleHeader>
    <div class="address-item">
      <van-address-list v-model="chosenAddressId"
                        :list="list"
                        default-tag-text="默认"
                        v-if="from !== 'mine'"
                        @add="onAdd"
                        @edit="onEdit"
                        @select="select">
      </van-address-list>
      <van-address-list v-model="chosenAddressId"
                        :list="list"
                        default-tag-text="默认"
                        @add="onAdd"
                        @edit="onEdit"
                        v-else>
      </van-address-list>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "../components/SimpleHeader";
import {getAddressList} from "../service/address";
import {Toast} from "vant";
export default {
  name: "Address",
  components: {SimpleHeader},
  data(){
    return{
      chosenAddressId: '1',
      list: [],
      from: this.$route.query.from,
    }
  },
  methods:{
    select(item){
      this.$router.push({path:`/createOrder?addressId=${item.id}&from=${this.from}`})
    },
    onAdd(){
      this.$router.push({path:`/addressEdit?type=add&from=${this.from}`})
    },
    onEdit(item){
      this.$router.push({path:`/addressEdit?type=edit&addressId=${item.id}&from=${this.from}`})
    }
  },
  async mounted() {
    const { data } = await getAddressList()
    this.list = data.map(item => {
      return {
        id: item.addressId,
        name: item.userName,
        tel: item.userPhone,
        address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
        isDefault: !!item.defaultFlag
      }
    })
    Toast.clear()
  }
}
</script>

<style lang="less">
@import "../common/style/mixin";
.address-box {
  .van-radio__icon .van-icon {
    display: none;
  }
  .address-item {
    margin-top: 44px;
    .van-button {
      background: @primary;
      border-color: @primary;
    }
  }
}
</style>