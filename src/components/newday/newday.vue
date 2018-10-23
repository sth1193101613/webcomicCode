<template>
  <div class="back">
    <div class="cont container">
      <p class="act">我的位置：<a href="/">首页</a> > <span>{{this.$route.name}}</span></p>
    </div>
    <div class="cl container">
      <ul class="tabs clearfix">
        <li v-for="(tab,index) in day" class="day">
          <span class="tab-link" @click="tabsSwitch(index)" :class="{cur:index == active}">{{tab.day}}</span>
        </li>
      </ul>
      <div class="tab">
        <div class="loader"  v-show="a">
          <div class="loading-3">
            <i v-for="(l,index) in 8"></i>
          </div>
        </div>
        <div  v-for="(group,index) in list" v-show=" index == active" class="tab-cont">
          <ul>
            <li v-for="(item,index) in group.comi_list" class="tab-act" v-if="item.comic_title !== 'BRAVE'" @click="detail(item.comic_id)">
              <img class="comic_cover_url" v-lazy="'https://cdn.comicool.cn/'+item.comic_cover_url">
              <h2 class="comic_title">{{item.comic_title}}</h2>
              <p class="comic_auth">{{item.comic_auth}}</p>
              <p class="comic_desc_lite">{{item.comic_desc_lite}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {newDay} from '../../apiServer/newDay'
  export default {
    data() {
      return{
        list:[],
        day:[{"day":"周一"},{"day":"周二"},{"day":"周三"},{"day":"周四"},{"day":"周五"},{"day":"周六"},{"day":"周日"}],
        activeName: null,
        active:null,
        a:true
      }
    },
    created() {
      this._getNew()
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
      _getNew(){
        newDay().then((res) => {
          this.activeName=res.now_weekid;
          this.active=res.now_weekid-1;
          let ret=res.timeline_list
          ret.pop();
          for(let i in ret){
            let car=ret[i]
            this.list.push(car)
          }
          this.$nextTick(function(){
            this.a=false
          })
        })
      },
      tabsSwitch(index){
        this.active = index;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/style.less";
  .main{
    .back{
      margin: 0 auto;
      .cont{
        margin: 0 auto;
        .act{
          border-bottom: 1px solid #f5f5f5;
          line-height: 3rem;
          font-size: .8rem;
        }
      }
      .cl{
        margin:1.5rem auto 0;
        .tabs{
          display: flex;
          .day{
            text-align: center;
            flex: 1;
            cursor: pointer;
            .tab-link{
              position: relative;
              display: block;
              line-height: 2.5;
              margin: .2rem;
              font-size: .8rem;
              border-radius: 8px 8px 0 0;
              &.cur{
                background: #ed2c36;
                color: #fff;
              }
            }
          }
        }
        .tab{
          border: 3px #ed2c36 solid;
          padding: .5rem;
          margin: -4px 3px;
          position: relative;
          .loader{
            position:absolute ;
            left: 0;
            right: 0;
            background: #fff;
            height: 100%;
            width: 100%;
            .loading-3{
              position: absolute;
              left: 50%;
              top: 25%;
              i{
                display: block;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                position: absolute;
                background: #333;
                &:nth-child(1){
                  top: 25px;
                  left: 0;
                  -webkit-animation: loading-3 1s ease 0s infinite;
                }
                &:nth-child(2){
                  top: 17px;
                  left: 17px;
                  -webkit-animation: loading-3 1s ease 0.12s infinite;
                }
                &:nth-child(3){
                  top: 0;
                  left: 25px;
                  -webkit-animation: loading-3 1s ease 0.24s infinite;
                }
                &:nth-child(4){
                  top: -17px;
                  left: 17px;
                  -webkit-animation: loading-3 1s ease 0.36s infinite;
                }
                &:nth-child(5){
                  top: -25px;
                  left: 0;
                  -webkit-animation: loading-3 1s ease 0.48s infinite;
                }
                &:nth-child(6){
                  top: -17px;
                  left: -17px;
                  -webkit-animation: loading-3 1s ease 0.6s infinite;
                }
                &:nth-child(7){
                  top: 0;
                  left: -25px;
                  -webkit-animation: loading-3 1s ease 0.72s infinite;
                }
                &:nth-child(8){
                  top: 17px;
                  left: -17px;
                  -webkit-animation: loading-3 1s ease 0.84s infinite;
                }
              }
            }
          }
          .tab-cont{
            ul{
              display: flex;
              flex-wrap: wrap;
              .tab-act{
                width: calc(100% / 4 - (.2rem * 2));
                margin: .2rem;
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
          }
        }
      }
    }
  }
</style>
