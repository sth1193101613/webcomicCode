<template>
  <transition name="fold">
    <div class="fixed" @click="scroll"  v-show="isShow">
      <img src="../../../static/fix-img2.png">
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {ScrollTop} from '../../common/js/scrolltop'
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
      scroll() {
        clearInterval(this.timer);
        this.timer=setInterval(() =>{
          let spd=Math.floor((-ScrollTop().top) / 10);
          ScrollTop().top = ScrollTop().top + spd;
          document.documentElement.scrollTop = ScrollTop().top + spd;
          if(ScrollTop().top === 0){
            clearInterval(this.timer);
          }
        },10)
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .fixed{
    position: fixed;
    bottom: 9rem;
    opacity: 1;
    right: 1rem;
  }
  .fold-enter-active, .fold-leave-active {
    transition: all .5s;
  }
  .fold-enter, .fold-leave-active {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }
</style>
