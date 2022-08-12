<template>
<div class="address-edit-box">
<SimpleHeader :name="`${type == 'add' ? '新增地址' : '编辑地址'}`"></SimpleHeader>
 <van-address-edit class="edit"
                   :area-list="areaList"
                   :address-info="addressInfo"
                   value=""
                   :show-delete="type === 'edit'"
                   show-set-default
                   show-search-result
                   :area-columns-placeholder="['请选择', '请选择', '请选择']"
                   @save="onSave"
                   @delete="onDelete">

 </van-address-edit>
</div>
</template>

<script>
import {areaList} from '@vant/area-data'
import SimpleHeader from "../components/SimpleHeader";
import {addAddress, DeleteAddress, editAddress, getAddressDetail} from "../service/address";
import {Toast} from "vant";
export default {
  name: "AddressEdit",
  components: {SimpleHeader},
  data(){
    return{
      type:'add',
      areaList:{},
      addressInfo:{},
      addressId: '',
      from:''
    }
  },
  methods:{
    async onSave(content){
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        areaCode: content.areaCode,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
      }
      if (this.type === 'edit'){
        params['addressId'] = this.addressId
      }
      this.type ==='edit'? await editAddress(params) : await addAddress(params)
      Toast.success('保存成功!')
      setTimeout(() => {
        this.$router.push({ path: `address?from=${this.from}` })
      }, 1000)
    },
    async onDelete() {
      await DeleteAddress(this.addressId)
      Toast('删除成功')
      setTimeout(() => {
        this.$router.push({ path: 'address' })
      }, 1000)
    }
  },
  async mounted() {
    this.areaList = areaList
    const { addressId, type, from } = this.$route.query
    this.addressId = addressId
    this.type = type
    this.from = from || ''
    if (type === 'edit'){
      const { data:addressDetail } = await getAddressDetail(addressId)
      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.userPhone,
        addressDetail: addressDetail.detailAddress,
        areaCode: addressDetail.areaCode,
        isDefault: !!addressDetail.defaultFlag
      }
    }

  }
}
</script>

<style lang="less">
@import "../common/style/mixin";
.address-edit-box {
  margin-top: 44px;
  .van-address-edit {
    .van-button--danger {
      background: @primary;
      border-color: @primary;
    }
    .van-switch--on {
      background: @primary;
    }
  }
}
</style>