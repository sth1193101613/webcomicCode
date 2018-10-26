<template>
  <div>
    <h2 class="h3">官网作品排行榜</h2>
    <div class="select"><i class="fa fa-chevron-down" aria-hidden="true" @click="selectCheck"></i>
      <p v-model="selectName">{{selectName}}</p>
      <ul v-show="selectList" :class="[{open:selectList === true}]">
        <li v-for="(list,index) in item" @click="selectNameActive(list.name,index)">
          {{list.name}}
        </li>
      </ul>
    </div>
    <div v-for="(list,index) in item" class="selectCont"  v-show=" index == active">
      <div v-for="(item,index) in list.comi_list" class="sel" @click="detail(item.comic_id)">
        <div class="rank-txt">
          <i class="goode">{{index+1}}</i>
          <h3>{{item.comic_title}}</h3>
          <p>{{item.comic_auth}}</p>
        </div>
        <div class="li-img">
          <img :src="'https://cdn.comicool.cn/'+item.comic_cover_url">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {rightTab} from '../../apiServer/right'
  export default {
    data() {
      return{
        item:[],
        selectName:'总榜单',
        selectList:false,
        active:0
      }
    },
    created(){
      this._getRightTab()
    },
    methods:{
      detail(name){
        this.$router.go(0)
        this.$router.push({
          path:'/detail',
          query:{
            detailId:name
          }
        })
      },
      _getRightTab(){
        rightTab().then((res) => {
          this.item=res.rank_list
        })
      },
      selectCheck(){
        this.selectList = !this.selectList
      },
      selectNameActive(name,index){
        this.active = index;
        this.selectList=false
        this.selectName=name
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .h3{
    background: url(https://cwcdn.comicool.cn/images/h-icon.png) 55px -345px no-repeat;
    line-height: 30px;
    padding: 10px;
    height: 45px;
    text-align: center;
  }
  .select{
    height: 30px;
    background-color: #fff;
    position: relative;
    border: 1px solid #f1f1f1;
    line-height: 29px;
    width: 90%;
    margin: 0 auto;
    .fa-chevron-down{
      position: absolute;
      right: 15px;
      line-height: 30px;
    }
    ul{
      z-index: 9;
      background: #fff;
      width: 100%;
      margin-left: -50%;
      overflow: hidden;
      position: absolute;
      top: 28px;
      left: 50%;
      border: 1px solid #f1f1f1;
      max-height: 0;
      &.open{
        max-height: 200px;
      }
    }
  }
  .selectCont{
    .sel{
      display: flex;
      padding-bottom: 9px;
      padding-left: 50px;
      position: relative;
      margin: 10px 0;
      align-items:center;
      .li-img{
        width: 80px;
        height: 53px;
        margin-right: 15px;
        img{
          width: 80px;
          height: 53px;
        }
      }
      .rank-txt{
        width: 150px;
        h3{
          font-size: 13px;
          padding-top: 3px;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p{
          font-size: 13px;
          color: #aeaeae;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: .2rem;
        }
        i{
          position: absolute;
          left: 30px;
          top: 10px;
          color: #e32f38;
          font-size: 16px;
          font-weight: bold;
          font-style: italic;
        }
      }
    }
  }
</style>
