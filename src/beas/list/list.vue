<template>
  <div class="viewlist container">
    <div class="viewMain">
      <div class="hot">
        <h2 class="hot-h2"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> <span>热门推荐</span></h2>
        <ul class="htoUl">
          <li v-for="(list,index) in this.list" class="hotLi" @click="detail(list.content_action)">
            <img :src="'https://cdn.comicool.cn/'+list.content_poster">
            <h3 class="hot-h3">{{list.content_title}}</h3>
            <p class="hot-p">{{list.content_subtitle}}</p>
          </li>
        </ul>
      </div>
      <div class="toplist">
        <h2 class="top-h2"><span>热作排行</span></h2>
        <ul class="top-ul" ref="ul">
          <li v-for="(list,index) in filteredItems" class="top-list"  @mouseenter="hover(1,index)" @mouseleave="hover(-1,index)">
            <h4 class="top-h4" :class="[{curr:index == currIndex}]">{{list.content_title}}<span class="ri"><b>{{list.content_rating | splice(list.content_rating)}}</b><span>{{list.content_rating | number(list.content_rating)}}</span></span></h4>
            <ul class="show" :class="[{fl:index == currIndex}]">
              <li>
                <div class="img">
                  <img :src="'https://cdn.comicool.cn/'+list.pc_vertical_poster">
                </div>
                <div class="title">
                  <h2 class="title-h2">{{list.content_title}}</h2>
                  <p class="title-p">{{list.content_subtitle}}</p>
                  <p class="end">
                    <span  v-for="(k,index) in num" v-if="k !== ''">{{k}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="new">
      <h2 class="new-h2"><i class="fa fa-newspaper-o" aria-hidden="true"></i><span>今日更新</span></h2>
      <ul class="htoUl">
        <li v-for="(list,index) in this.hot" class="hotLi">
          <img :src="'https://cdn.comicool.cn/'+list.content_poster">
          <h3 class="hot-h3">{{list.content_title}}</h3>
          <p class="hot-p">{{list.content_subtitle}}
          <p class="hot-p2">{{list.third_title}}</p>
        </li>
      </ul>
    </div>
    <div class="view">
      <h2 class="new-h2"><i class="fa fa-video-camera" aria-hidden="true"></i><span>媒体报道</span></h2>
      <ul class="clearfix">
        <li v-for="(list,index) in daTa" class="vido-li">
          <div class="img" v-if="list.src">
            <img :src="list.src" alt="">
          </div>
          <div class="title">
            <i></i>
            <p v-if="list.title" class="t">{{list.title}}</p>
            <p class="con">{{list.cont}} <span>{{list.time}}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mainList} from '../../apiServer/main'
  import data from '../../../user.json'
  export default {
    data(){
      return{
        list:[],
        hot:[],
        three:[],
        daTa:[],
        currIndex:0,
      }
    },
    created() {
      this._getMainJson();
      this.daTa=data.news;
    },
    props:{
      viewList:{
        type:Array,
        default:null
      }
    },
    computed: {
      filteredItems () {
        return this.three.slice(0, 9)
      },
      num(){
        for(let i=0;i<this.filteredItems.length;i++){
          let k=this.filteredItems[i].content_category;
          let r = /[0-9]/ig;
          let b=k.replace(r,"");
          let j=b.split("|").join("")
          return j.split("#")
        }
      },
    },
    filters: {
      number(value) {
        let sp=value.toString().replace(/\d+\.(\d*)/,"$1").substr(0,2);
        return sp
      },
      splice(value){
        let sp=value.substr(0, 1)
        return `${sp}.`
      },
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
      hover(way,index){
        if(way !== -1){
          this.currIndex = index;
        }
      },
      _getMainJson(){
        mainList().then((res) => {
          this.list=res.area_list[0].area_content;
          this.hot=res.area_list[1].area_content;
          this.three=res.area_list[2].area_content;
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/style.less";
  .viewlist {
    margin: .5rem auto 0;
    .viewMain {
      display: flex;
      .hot {
        margin: 0 .5rem 0 0;
        border: 1px #efeded solid;
        flex: 3;
        background: #fff;
        .hot-h2 {
          .h2;
          i {
            color: red;
          }
        }
        .htoUl {
          font-size: 0;
          display: flex;
          flex-wrap: wrap;
          padding: 1rem;
          .hotLi {
            flex: 1;
            width: 33%;
            min-width: 33%;
            max-width: 33%;
            display: inline-block;
            overflow: hidden;
            img {
              .pic;
              padding: .5rem
            }
            .hot-h3 {
              font-size: .9rem;
              font-weight: 800;
              padding: .2rem .5rem 0;
            }
            .hot-p {
              font-size: .8rem;
              line-height: 1.2;
              .over(1);
              height: 1.2rem;
              color: #aeaeae;
              padding: .2rem .5rem 0;
            }
          }
        }
      }
      .toplist {
        background: #fff;
        border: 1px #efeded solid;
        flex: 1;
        .top-h2 {
          margin: 1rem 1.2rem;
          padding-bottom: .5rem;
          font-size: 0.9rem;
          border-bottom: 2px #ccc solid;
          span {
            border-bottom: 2px solid red;
            color: red;
            padding-bottom: .45rem;
          }
        }
        .top-ul {
          margin: 1rem 1.2rem;
          .top-list {
            counter-increment: listnumber;
            margin-top: 2rem;
            &:nth-child(1), &:nth-child(2), &:nth-child(3) {
              .top-h4 {
                width: 100%;
                margin-top: 10px;
                white-space: nowrap;
                text-overline: ellipsis;
                &:before {
                  margin-right: 5px;
                  color: white;
                  padding: 5px;
                  background: #e48232;
                  content: counter(listnumber);
                }
              }
            }
            .top-h4 {
              width: 100%;
              margin-top: 10px;
              white-space: nowrap;
              text-overline: ellipsis;
              font-size: .6rem;
              &.curr {
                display: none;
              }
              &:before {
                margin-right: 5px;
                color: white;
                padding: 5px;
                background: #ccc;
                content: counter(listnumber);
              }
              .ri {
                float: right;
                font-size: 1.1rem;
                b {
                  color: red;
                }
                span {
                  font-size: 14px;
                }
              }
            }
            .show {
              display: none;
              &.fl {
                display: block;
              }
              li {
                display: flex;
                .img {
                  width: 90px;
                  img {
                    .pic;
                  }
                }
                .title {
                  flex: 1;
                  position: relative;
                  .title-p {
                    -webkit-line-clamp: 3;

                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    font-size: .8rem;
                    padding: .5rem;
                    line-height: 1.5;
                    max-height: 63px;
                  }
                  .title-h2 {
                    padding: .5rem .5rem 0;
                    color: red;
                    font-size: .75rem
                  }
                  .end {
                    position: absolute;
                    bottom: 0;
                    padding: 0 .5rem;
                    font-size: .8rem;
                    color: #ccc;
                    span {
                      &:not(:nth-of-type(1)) {
                        padding-left: .5rem;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .new {
      margin-top: 2rem;
      background: #fff;
      .new-h2 {
        span {
          padding-left: 0.5rem;
        }
        .h2;
        i {
          color: red;
        }
      }
      .htoUl {
        display: flex;
        .hotLi {
          margin: 1rem;
          flex: 1;
          width: 20%;
          img {
            .pic;
          }
        }
        .hot-h3 {
          font-size: .9rem;
          font-weight: 800;
          margin: .4rem 0;
        }
        .hot-p {
          color: #aeaeae;
          font-size: .8rem;
        }
        .hot-p2 {
          font-size: .9rem;
          margin-top: .2rem;
        }
      }
    }
    .view {
      margin-top: 2rem;
      background: #fff;
      .new-h2 {
        span {
          padding-left: 0.5rem;
        }
        .h2;
        i {
          color: red;
        }
      }
      .vido-li {
        width: 50%;
        float: left;
        margin-top: 1rem;
        &:nth-child(1) {
          display: flex;
          width: 100%;
          justify-content: center;
          border-bottom: 1px solid #f5f5f5;
          padding: .5rem 1.3rem;
          .img {
            width: 169px;
            img {
              .pic;
            }
          }
          .title {
            flex: 1;
            .t {
              padding: 0 0 1rem;
              display: inline-block;
            }
            i {
              display: inline-block;
              background: url(http://www.comicool.cn/images/index_icon.png) -161px -131px  no-repeat;
              width: 46px;
              height: 38px;
              vertical-align: -webkit-baseline-middle;
              margin-left: 1rem;
            }
            .con {
              color: #8e8c8c;
              font-size: .8rem;
              line-height: 1.5;
              padding: 0 1rem;
              margin-top: .5rem;
            }
          }
        }
        &:nth-child(2) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -109px -131px  no-repeat;
          }
        }
        &:nth-child(3) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -105px -78px  no-repeat;
          }
        }
        &:nth-child(4) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -151px -78px  no-repeat;
          }
        }
        &:nth-child(5) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -207px -78px  no-repeat;
          }
        }
        &:nth-child(6) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -206px -34px  no-repeat;
          }
        }
        &:nth-child(7) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -206px 3px no-repeat;
          }
        }
        &:nth-child(8) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -105px -78px  no-repeat;
          }
        }
        &:nth-child(9) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -105px -78px  no-repeat;
          }
        }
        &:nth-child(10) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -109px -131px  no-repeat;
          }
        }
        &:nth-child(11) {
          i {
            background: url(http://www.comicool.cn/images/index_icon.png) -105px -78px  no-repeat;
          }
        }
        &:not(:nth-child(1)) {
          .title {
            display: flex;
            align-items: center;
            i {
              width: 46px;
              height: 38px;
              margin-left: 1rem;
              border: 1px #efefef solid;
            }
            .con {
              flex: 1;
              font-size: .2rem;
              margin: 0 .5rem;
              span {
                display: block;
                margin-top: .5rem;
              }
            }

          }
        }
      }
    }
    @media screen and (min-width: 600px) and (max-width: 956px) {
      .viewMain {
        display: block;
        .hot {
          margin: 0;
        }
      }
      .new {
        .htoUl {
          display: block;
          .hotLi{
            width: 90%;
          }
        }
      }
      .view{
        .vido-li{
          display: block;
          float: none;
          width: 100% ;
          .img{
            margin: 0 auto;
          }
        }
      }
    }
    @media screen and (min-width: 320px) and (max-width: 600px) {
      .viewMain {
        display: block;
        .hot {
          margin: 0;
        }
      }
      .new {
        .htoUl {
          display: block;
          .hotLi{
            width: 90%;
          }
        }
      }
      .view{
        .vido-li{
          display: block;
          float: none;
          width: 100% ;
          &:nth-child(1){
            display: block;
            .img{
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
</style>
