<template>
  <div class="swiper">
    <el-carousel :interval="5000" arrow="always" class="dom-ul" :style="{'height':`${this.Height}px`}">
      <el-carousel-item v-for="(item,index) in list">
        <img :src="item.img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        Height:`${document.body.clientWidth/4}`,
        list: [{"img":"https://cwcdn.comicool.cn/images/index/banner/shenshoutuisan.jpg"}, {"img":"https://cwcdn.comicool.cn/images/index/banner/contribute.jpg"},
          {"img":"https://cwcdn.comicool.cn/images/index/banner/contribute.jpg"},{"img":"https://cwcdn.comicool.cn/images/index/banner/shenshoutuisan.jpg"}]
      }
    },
    mounted () {
      this.height();
    },
    created() {
      this.height();
    },
    methods: {
      height() {
        this.$nextTick(() => {
          window.onresize=function(){
            let dom =document.querySelector('.dom-ul');
            let domImg=dom.getElementsByTagName('img')[0].clientHeight;
            dom.style.height=`${domImg}px`;
          }
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/less/style.less';
  .swiper{
    width: 100%;
    .dom-ul{
      .el-carousel__container{
        height: 100%
      }
      img{
        .pic;
      }
    }
  }
</style>
