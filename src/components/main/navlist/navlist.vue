<template>
  <div>
    <div class="uls">
      <ul class="cont container">
        <li v-for="(item,index) in list" @click="push(item.id,item.name)">{{item.name}}</li>
      </ul>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        list:[
          {id:62,name:"完结"},{id:61,name:'投稿'},{id:49,name:'少女'},
          {id:50,name:"少年"},{id:52,name:"搞笑"},{id:54,name:"日常"},
          {id:55,name:"治愈"},{id:53,name:'古风'},{id:58,name:'玄幻'},
          {id:56,name:"悬疑"},{id:51,name:'恐怖'},{id:57,name:'耽美'},
          {id:60,name:"百合"},{id:59,name:'节操'},
        ],
      }
    },
    methods:{
      push(id,name){
        this.$router.push({
          path:'/classfliy',
          query:{
            id:id,
            name:name
          }
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../common/less/style.less";
  .uls{
    background: #fdfdfd;
    border-bottom: 1px #ececec solid;
    margin-bottom: 10px;
    .cont{
      margin: 0 auto;
      padding: .6rem;
      li{
        padding: 2px 16px;
        margin: 0 30px;
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>
