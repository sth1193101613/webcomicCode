<template>
  <div class="detailCont">
    <div class="cont container">
      <p class="act">我的位置：<a href="/">首页</a> > <span>{{this.$route.name}}</span></p>
    </div>
    <div class="conts clearfix">
      <div class="zuo">
        <div class="info clearfix">
          <div class="img">
            <img :src="'https://cdn.comicool.cn/'+info.pc_vertical_poster">
          </div>
          <div class="cont-info">
            <h2 class="title">{{info.comic_title}}</h2>
            <div class="outher">
              <span><i>作者:</i>{{info.comic_auth}}</span>
              <span v-if="info.ext_list"><i>类型:</i>{{info.ext_list[1].desc | replaces}}</span>
            </div>
            <div class="unplad">
              <span v-if="info.ext_list">{{info.ext_list[0].desc}}</span>
            </div>
            <div class="desc">
              <p>{{info.comic_desc}}</p>
            </div>
            <div class="ping">
              <span><i v-for="n in 5"></i></span>
              <span> {{info.rating}}</span>
            </div>
            <a class="btn">阅读第一篇  > </a>
          </div>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item,index) in list" @click="comicCont(item)">
              <span>{{item.ep_title}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="you">
        <v-list></v-list>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {detailcont} from '../../apiServer/detail'
  import list from '../../beas/listactive/listactive.vue'
  export default {
    data(){
      return{
        id:this.$route.query.detailId,
        info:[],
        list:[],
      }
    },
    created(){
      this._getDetailJson()
    },
    filters:{
      replaces(value){
        let reg=/[\u4e00-\u9fa5]/g
        return value.match(reg).join(' ')
      }
    },
    components: {
      "v-list":list,
    },
    methods:{
      comicCont(item){
        this.$router.push({
          path:'/detailCont',
          query:{
            ep_id:item.ep_id,
            comic_id:this.id,
          }
        })
      },
      _getDetailJson(){
        detailcont(this.$route.query.detailId).then((res) => {
          this.info=res.comic_info
          this.list=res.ep_list
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/style.less";
  .detailCont{
    font-size: 14px;
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
        .info{
          .img{
            float: left;
            width: 200px;
            height: 270px;
            padding: 3px;
            border: 1px solid #E5E5E5;
            img{
              .pic;
            }
          }
          .cont-info{
            float: left;
            width: 385px;
            margin-left: 20px;
            .title{
              font-size: 22px;
              font-weight: 700;
              padding-top: 5px;
            }
            .outher{
              line-height: 30px;
              span{
                color: #333;
                max-width: 180px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                &:nth-child(2){
                  float: right;
                }
              }
              i{
                color: #aeaeae;
              }
            }
            .unplad{
              line-height: 34px;
              color: #e32f38;
            }
            .desc{
              margin: 10px 0;
              height: 65px;
              overflow: hidden;
              p{
                line-height: 1.5;
              }
            }
            .ping{
              line-height: 20px;
              font-size: 16px;
              i{
                background: url(https://cwcdn.comicool.cn/images/icon-star.png) no-repeat;
                width: 18px;
                display: block;
                float: left;
                background-position: -36px 0;
                height: 18px;
              }
              span{
                &:nth-child(2){
                  margin-left: 10px;
                }
              }
            }
            .btn{
              display: inline-block;
              padding: 10px 12px;
              margin-bottom: 0;
              font-size: 12px;
              font-weight: normal;
              line-height: 1.42857143;
              text-align: center;
              white-space: nowrap;
              vertical-align: middle;
              background: #2af;
              color: #FFF;
              user-select: none;
              margin-top: 25px;
              border: 1px solid transparent;
              border-radius: 4px;
            }
          }
        }
        .list{
          border-top: 1px solid #DDD;
          padding: 30px 10px 0;
          margin-right: -10px;
          font-size: 0;
          ul{
            li{
              display: inline-block;
              width: 180px;
              height: 30px;
              padding: 0 2px;
              line-height: 30px;
              font-size: 14px;
              border: 1px solid #ddd;
              margin: 0 10px 10px;
              text-align: center;
              vertical-align: top;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
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
