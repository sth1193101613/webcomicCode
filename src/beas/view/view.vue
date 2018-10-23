<template>
  <div class="searchCont">
    <div class="container" style="margin: 0 auto">
      <p class="act">我的位置：<a href="/">首页</a> > <span>{{this.$route.name}}</span></p>
      <div class="sea">
        <input type="text" placeholder="搜索你喜欢的" v-model="value" @keyup.enter="searchButton" class="search-key"><input type="reset" value="" class="res" @click="valueremove">
      </div>
      <h2 class="search-result-tit">搜索结果</h2>
      <div class="contView">
        <ul class="ul-cont">
          <li v-for="(k,index) in msg" class="list-cont">
            <img class="content_poster" v-lazy="'https://cdn.comicool.cn/'+k.url">
            <h2 class="content_title">{{k.title}}</h2>
            <span class="content_subtitle">{{k.title_third}}</span>
            <p class="content_desc_lite">{{k.content_desc_lite2}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {searchs} from '../../apiServer/search'
  export default {
    data(){
      return{
        msg: [],
        value:'',
      }
    },
    created(){
      this.getParams()
    },
    methods:{
      valueremove(){
        this.value=''
      },
      searchButton(){
        searchs(this.value).then((res) => {
          this.msg=res.search_result_list
        })
      },
      getParams () {
        searchs(this.$route.query.name).then((res) => {
          this.msg=res.search_result_list
        })
      }
    },
    watch: {
      '$route': 'getParams'
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/style.less";
  .searchCont{
    padding: 0 0 20px 20px;
    margin: 0 auto;
    background: #fff;
    .act{
      height: 40px;
      line-height: 40px;
      color: #696969;
      border-bottom: 1px dotted #e5e5e5;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .sea{
      position: relative;
      width: 367px;
      text-align: center;
      margin: 0 auto;
      .search-key{
        position: relative;
        margin: 0 auto;
        width: 280px;
        height: 50px;
        line-height: 50px;
        padding: 0 50px 0 10px;
        font-size: 16px;
        color: #aeaeae;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
      }
      .res{
        position: absolute;
        z-index: 1;
        top: 14px;
        right: 5px;
        width: 22px;
        height: 22px;
        border: 0;
        background: url(https://cwcdn.comicool.cn/images/circle-del.png) no-repeat;
        cursor: pointer;
      }
    }
    .search-result-tit{
      margin: 20px 0 10px;
      border-left: 5px solid #e32f38;
      padding-left: .5em;
      font-size: 18px;
      height: 27px;
      line-height: 27px;
    }
    .ul-cont{
      display: flex;
      flex-wrap: wrap;
      .list-cont{
        margin: 0 .5rem;
        width: calc(100% / 4 - (1rem * 1));
        .content_desc_lite{
          white-space: nowrap;
          overflow: hidden;
          line-height: 2;
          font-size: .8rem;
          text-overflow: ellipsis;
        }
        .content_poster{
          .pic;
        }
        .content_title{
          line-height: 2;
          font-size: .8rem;
        }
        .content_subtitle{
          color: #aeaeae;
          font-size: .8rem;
        }
      }
    }
  }
</style>
