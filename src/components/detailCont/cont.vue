<template>
  <div class="rex-box container">
    <div class="com">
      <ul>
        <li v-for="(list,index) in list">
          <img :src="'https://cdn.comicool.cn/'+list.frame_url">
        </li>
      </ul>
    </div>
    <div class="list">
      <div class="db">
        <div class="tempWrap">
          <ul class="clearfix domul" :style="domListWidth" ref="dom" style="left: 0">
            <li v-for="(list,index) in item" :style="{width:parseInt(830 / 6) +'px'}" @click="togg(list.ep_id,index)" :class="[{curr:index === active}]">
              {{list.ep_title}}
            </li>
          </ul>
        </div>
      </div>
      <div class="tab">
        <a href="javascript:;" class="prev" @click="prevs()"></a>
        <a href="javascript:;" class="next" @click="nexts()"></a>
      </div>
    </div>
    <v-fiex></v-fiex>
  </div>
</template>

<script type="text/ecmascript-6">
  import {detailcont} from '../../apiServer/detail'
  import {comicContList} from '../../apiServer/comicapi'
  import fiex from './rightfixed/fixed.vue'
  export default {
    data(){
      return{
        cid:this.$route.query.comic_id,
        ep_id:this.$route.query.ep_id,
        list:[],
        item:[],
        domListWidth:{
          width:null
        },
        active:null,
        width:parseInt(830 / 6)
      }
    },
    created(){
      this._getDetailJson()
      this._comicContList(this.ep_id,this.cid)
    },
    methods:{
      togg(id,index){
        document.documentElement.scrollTop =0
        this.list=[]
        this._comicContList(id,this.cid)
        this.active=index
      },
      animate(pare){
        this.$refs.dom.style.left= parseInt(this.$refs.dom.style.left)+pare+'px';
      },
      prevs(){
        if(parseInt(this.$refs.dom.style.left) >= 0 ){
          let length = this.width * 6;
          let domLength = parseInt(this.domListWidth.width)
          let yi = domLength - length ;
          return this.$refs.dom.style.left = -yi + 'px'
        }
        this.animate(this.width)
      },
      nexts(){
        let length = this.width * 6;
        let domLength = parseInt(this.domListWidth.width)
        let yi = domLength - length ;
        if(parseInt(this.$refs.dom.style.left) === -yi){
          return this.$refs.dom.style.left= 0 + 'px'
        }
        this.animate(-this.width)
      },
      _getDetailJson(){
        detailcont(this.cid).then((res) => {
          this.item=res.ep_list
          this.domListWidth.width = this.item.length * this.width +'px'
        })
      },
      _comicContList(id,cid){
        document.documentElement.scrollTop =0
        document.body.scrollTop=0
        comicContList(id,cid).then((res) => {
          this.list=res.frame_list
          this.active = id-1
          let k = this.active * this.width
          this.$refs.dom.style.left = -k +'px'
        })
      },
    },
    components:{
      "v-fiex":fiex
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/style.less";
  .rex-box{
    padding-bottom: 16px;
    margin: auto;
    padding-top: 61px;
    .com{
      background: #FFF;
      margin-bottom: 14px;
      padding: 40px 0;
      text-align: center;
      ul{
        min-height: 500px;
        img{
          vertical-align: middle;
          max-width: 100%;
        }
      }
    }
    .list{
      background: #fff;

      position: relative;
      overflow: hidden;
      .db{
        width: 820px;
        margin: auto;
        height: 146px;
        .tempWrap{
          overflow: hidden;
          position: relative;
          width: 830px;
          height: 146px;
          .domul{
            transition: all .5s;
            position: relative;
            overflow: hidden;
            height: 146px;
            li{
              width: 145px;
              height: 146px;
              text-align: center;
              line-height: 146px;
              float: left;
              &.curr{
                color: red;
              }
            }
          }
        }
      }
      .tab{
        a{
          position: absolute;
          top: 30%;
          width: 38px;
          height: 52px;
          display: block;
          background: url(https://cwcdn.comicool.cn/images/read-slider-ctrl.png) no-repeat;
          &.prev{
            left: 15px;
            background-position: 0 -52px;
          }
          &.next{
            right: 15px;
          }
        }
      }
    }
  }

</style>
