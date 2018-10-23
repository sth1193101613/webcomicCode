<template>
  <div class="footer">
    <div class="footer-main container">
      <div class="list">
        <ul>
          <li v-for="(k,index) in list" class="list-item">
            <i class="fa fa-ravelry" aria-hidden="true"></i>
            <span>{{k.name}}</span>
          </li>
        </ul>
        <div  class="item-p">
          <p>可米酷漫画 版权所有 Copyright © 2014-2016 ComiCool. All Rights Reserved.</p>
          <p>粤ICP备14096777号-3粤网文〔2015〕2343-520号</p>
        </div>
      </div>
      <div class="btns">
        <img src="https://cwcdn.comicool.cn/images/erweima.png" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return{
        list:[{"name":"关于我们"},{"name":"联系我们"},{"name":"友情链接"},{"name":"网站地图"},{"name":"新浪微博"},{"name":"微信公众号"},{"name":"客服在线QQ"}]
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../common/less/style.less";
  .footer{
    background: #fff;
    margin-top: 2rem;
    .footer-main{
      margin: 0 auto;
      display: flex;
      align-items: center;
      .list{
        margin-top: 2rem;
        flex: 4;
        color: #929292;
        .list-item{
          display: inline-block;
          margin: 0 1rem;
          i{
            margin-bottom: .5rem;
            display: block;
          }
        }
        .item-p{
          margin: 1.5rem 1rem;
          line-height: 2;
        }
      }
      .btns{
        flex: 1;
        img{
          .pic;
          width: 50%;
        }
      }
    }
    @media screen and (min-width: 320px) and (max-width: 956px) {
      .footer-main{
        display: block;
        .list{
          ul{
            display: none;
          }
        }
        .btns{
          display: none;
        }
      }
    }
  }
</style>
