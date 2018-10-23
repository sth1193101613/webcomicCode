<template>
  <div class="back">
    <div class="nar">
      <ul class="container">
        <li v-for="(k,index) in filteredItems" @click="rou(k.category_id);addClass(k.category_id);kname(k.category_title,k.category_id)" class="list" :class="{'back':k.category_id==Index}">
          {{k.category_title}}
        </li>
        <li class="list more" @mouseenter="show(1)" @mouseleave="show(-1)">更多
          <ul  v-show="isShow">
            <li v-for="(k,index) in endItems" @click="rou(k.category_id);addClass(k.category_id);kname(k.category_title,k.category_id)" :class="{'back':k.category_id==Index}">
              {{k.category_title}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="cont container">
      <p class="act">我的位置：<a href="/">首页</a> > <span>{{this.$route.name}}</span></p>
      <div class="contBody">
        <h2 class="value">{{value}}</h2>
        <ul class="ul-cont">
          <li @click="detail(k.content_action)" v-for="(k,index) in cont" class="list-cont" v-if="k.content_title !== '仙山神妖传' && k.content_title !== '怦然心跳' && k.content_title!=='非暴力不合作' && k.content_title!=='WARM COFFEE'">
            <img class="content_poster" v-lazy="'https://cdn.comicool.cn/'+k.content_poster">
            <h2 class="content_title">{{k.content_title}}</h2>
            <span class="content_subtitle">{{k.content_subtitle}}</span>
            <p class="content_desc_lite">{{k.content_desc_lite2}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {classList} from '../../apiServer/cla'
  import {conts} from '../../apiServer/cont'
  export default {
    data() {
      return{
        list:[],
        cont:null,
        Index:0,
        isShow:false,
        value:"新作"
      }
    },
    computed: {
      filteredItems() {
        return this.list.slice(0, 9)
      },
      endItems() {
        return this.list.slice(9, -1)
      },
    },
    created() {
      this._getClass();
      this.click()
    },
    methods:{
      detail(name){
        this.$router.push({
          path:'/detail',
          query:{
            detailId:name
          }
        })
      },
      click(){
        if(this.$route.query.id){
          this.rou(this.$route.query.id)
          this.Index=this.$route.query.id
          this.value=this.$route.query.name

        }else{
          this.rou(63)
        }
      },
      kname(value,id){
        this.$router.replace({
          path:'/classfliy',
          query:{
            name:value,
            id:id
          }
        })
        if(this.$route.query.id){
          this.value=this.$route.query.name
        }
        this.value=value
      },
      show(way){
        if(way>=1){
          this.isShow=true
        }else{
          this.isShow=false
        }
      },
      addClass(index){
        this.Index=index;
      },
      rou(num){
        conts(num).then((res) => {
          this.cont=res.content_list
        })
      },
      _getClass(){
        classList().then((res) => {
          this.list=res.category_list
        })
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/less/style.less";
  .back{
    .nar{
      background: #fff;
      .container{
        margin: 0 auto;
        display: flex;
        .list{
          text-align: center;
          font-size: 1rem;
          line-height: 2;
          flex: 1;
          cursor: pointer;
          padding: .2rem 0;
          transition: background-color .2s linear 0s;
          &.back{
            background: #12c2ab;
            color: #fff;
          }
        }
        .more{
          position: relative;
          ul{
            position: absolute;
            background: #fff;
            width: 100%;
            li{
              width: 100%;
              border-bottom: 1px solid #f5f5f5;
              &.back{
                background: #12c2ab;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .cont{
      margin: 0 auto;
      .act{
        line-height: 3rem;
        font-size: .8rem;
      }
      .contBody{
        background: #fff;
        padding: .5rem;
        .value{
          color:#12c2ab;
          padding: .5rem;
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
    }
  }
</style>
