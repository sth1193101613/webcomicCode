<template>
  <transition name="fold">
    <div class="fixed" v-show="isShow">
      <ul>
        <li><i class="fa fa-pencil-square-o" aria-hidden="true" @click="scrollBottom"></i></li>
        <li><i class="fa fa-arrow-up" aria-hidden="true" @click="scrollTop"></i></li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {ScrollTop} from '../../../common/js/scrolltop'
  export default {
    data(){
      return{
        isShow:false,
        timer:'',
      }
    },
    created() {
      this.show()
    },
    methods:{
      show(){
        window.addEventListener('scroll', (ev)=> {
          if(ScrollTop().top>40){
            this.isShow=true
          }else{
            this.isShow=false
          }
        })
      },
      scrollTop() {
        clearInterval(this.timer);
        this.timer=setInterval(() =>{
          let spd=Math.floor((-ScrollTop().top) / 10);
          ScrollTop().top = ScrollTop().top + spd;
          document.documentElement.scrollTop = ScrollTop().top + spd
          document.body.scrollTop = ScrollTop().top + spd;
          if(ScrollTop().top === 0){
            clearInterval(this.timer);
          }
        },10)
      },
      scrollBottom(){
        document.documentElement.scrollTop = document.body.scrollHeight;
        document.body.scrollTop=document.body.scrollHeight
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .fixed{
    position: fixed;
    bottom: 9rem;
    opacity: 1;
    right: 1rem;
    li{
      margin-top: 10px;
      background-color: #EF2B35;
      color: #fff;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        display: block;
        font-size: 30px;
      }
    }
  }
  .fold-enter-active, .fold-leave-active {
    transition: all .5s;
  }
  .fold-enter, .fold-leave-active {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }
</style>
