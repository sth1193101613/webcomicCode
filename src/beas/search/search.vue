<template>
  <div class="search">
    <input type="text" placeholder="搜索你喜欢的" v-model="value"><i class="fa fa-search" aria-hidden="true" @click="searchButton()"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {searchs} from '../../apiServer/search'
  export default {
    data(){
      return{
        value:'',
        list:[],
      }
    },
    methods:{
      searchButton(){
          this.$router.push({
            path: '/view',
            query: {
              name: this.value
            }
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/style.less";
  .search{
    float: right;
    line-height: 4;
    position: relative;
    input{
      border: 1px #e8e6e6 solid;
      padding: .5rem;
      height: 2rem;
      font-size: .5rem;
      .border-radius(5px);
    }
    i{
      position: absolute;
      top: 42%;
      left: 86%;
    }
  }
  @media screen and (min-width:600px) and (max-width:956px){
    .search{
      float: none;
      input{
        width: 80%;
        margin: 0 auto ;
      }
      i{
        display: none;
      }
    }
  }
  @media screen and (min-width:320px) and (max-width:600px) {
    .search {
      float: none;
      text-align: center;
      input {
        width: 80%;
        margin: 0 auto ;
      }
      i {
        display: none;
      }
    }
  }
</style>
