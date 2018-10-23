<template>
  <div class="clos">
    <div class="cont container">
      <p class="act">我的位置：<a href="/">首页</a> > <span>{{this.$route.name}}</span></p>
    </div>
    <div class="conts clearfix">
      <div class="zuo">
        <ul>
          <li v-for="(list,index) in cont" class="tab-act"  @click="detail(list.content_action)">
            <img class="comic_cover_url" v-lazy="'https://cdn.comicool.cn/'+list.content_poster">
            <h2 class="comic_title">{{list.content_title}}</h2>
            <p class="comic_auth">{{list.content_subtitle}}</p>
            <p class="comic_desc_lite">{{list.content_desc_lite2 | che}}</p>
          </li>
        </ul>
      </div>
      <div class="you">
        <v-list></v-list>
      </div>
    </div>
  </div>
</template>
<script>
  import {detailcont} from '../../apiServer/detail'
  import list from '../../beas/listactive/listactive.vue'
  import {conts} from '../../apiServer/cont'
  export default {
    name: 'hello',
    data () {
      return {
        cont:[]
      }
    },
    filters:{
      che(name){
        if(name === ''){
          return "暂无"
        }else{
          return name
        }
      }
    },
    components: {
      "v-list":list,
    },
    created() {
      this.rou(0)
    },
    methods: {
      detail(name){
        this.$router.push({
          path:'/detail',
          query:{
            detailId:name
          }
        })
      },
      rou(num){
        conts(num).then((res) => {
          this.cont=res.content_list
        })
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/less/style.less";
  .clos{
    .cont{
      width: 940px;
      margin: 0 auto;
      .act{
        border-bottom: 1px solid #f5f5f5;
        line-height: 3rem;
        font-size: .8rem;
      }
    }
    .conts{
      background: #fff;
      width: 945px;
      margin: 0 auto;
      .zuo{
        background: #fff;
        float: left;
        width: 650px;
        padding: 15px 015px 15px;
        border-right: 10px solid #f5f5f5;
        .tab-act{
          margin: .2rem;
          width: 23%;
          display: inline-block;

          .comic_cover_url{
            .pic;
            padding: .2rem;
          }
          .comic_title{
            line-height: 2;
            font-size: .8rem;
          }
          .comic_auth{
            color: #aeaeae;
            font-size: .8rem;
            white-space: nowrap;
            overflow: hidden;
            line-height: 2;
            text-overflow: ellipsis;
          }
          .comic_desc_lite{
            white-space: nowrap;
            overflow: hidden;
            line-height: 2;
            font-size: .8rem;
            text-overflow: ellipsis;
          }
        }
      }
      .you{
        background: #fff;
        float: right;
        width: 295px;
        padding-bottom: 20px;
        min-height: 507px;
      }
    }
  }
</style>
