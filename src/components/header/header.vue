<template>
  <div class="header">
    <div class="top">
      <div class="top-main clearfix container">
        <span class="span">下载客户端</span>
        <ul class="ul">
          <li v-for="(list,index) in data" @click="clickThis(index)" class="list" v-if="sessionFlag">
            <span>{{list.name}}</span>
          </li>
          <li class="list">
            <span style=" background: red; color: #fff;">立即投稿</span>
          </li>
        </ul>
        <ul class="ul" v-if="!sessionFlag">
          <li class="list headerimg">
            <img src="http://cwcdn.comicool.cn/images/image_people.png">
          </li>
          <li class="list">
            <span @click="loginOut">退出</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-main container clearfix">
        <ul class="bottom-ul">
          <router-link to="/main" tag="li"><img src="../../../static/h-logo-img.png"></router-link>
          <router-link to="/main" tag="li">首页</router-link>
          <router-link to="/classfliy" tag="li">漫画分类</router-link>
          <router-link to="/newday" tag="li">今日更新</router-link>
          <router-link to="/closed" tag="li">完结作品</router-link>
        </ul>
        <v-search></v-search>
      </div>
    </div>
    <div class="login" v-show="show">
      <div class="form" v-show="signIn">
        <i class="el-icon-close" @click="closeForm()"></i>
        <img src="https://cwcdn.comicool.cn/images/h-logo-img.png" alt="">
        <form>
          <input type="text" placeholder="用户名" v-model="username">
          <input type="password" placeholder="密码" v-model="password">
          <input type="button" value="立即登录" @click="login">
          <p>快速注册</p>
          <span v-html="innerSignIn"></span>
        </form>
      </div>
      <div class="form" v-show="signUp">
        <i class="el-icon-close" @click="closeForm()"></i>
        <img src="https://cwcdn.comicool.cn/images/h-logo-img.png" alt="">
        <form>
          <input type="text" placeholder="用户名" v-model="newName">
          <input type="password" placeholder="密码"  v-model="newWord">
          <input type="button" value="立即注册" @click="addUser">
          <span v-html="innerSignUp"></span>
        </form>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import search from '../../beas/search/search.vue'
  export default {
    data(){
      return{
        sessionFlag:true,
        show:false,
        signIn :false,
        signUp:false,
        data:[{"name":'登录'},{"name":'注册'}],
        json:JSON.parse(sessionStorage.getItem("userId")),
        username: '',
        password: '',
        newName:'',
        newWord:'',
        innerSignIn:'',
        innerSignUp:'',
      }
    },
    mounted() {
      this.session()
    },
    methods:{
      loginOut(){
        sessionStorage.removeItem('user')
        this.sessionFlag=true
      },
      session(){
        if(sessionStorage.getItem('user')){
          this.sessionFlag=false
        }
      },
      closeForm(){
        this.show=false;
        this.signIn=false
        this.signUp=false
      },
      login() {
        let name = this.username;
        let password = this.password;
        this.$http.post('/api/user/selectUser',{
          params:{
            username: name,
            password: password
          }
        }).then((res) => {
          if(res.data.code === -1){
            this.innerSignIn=res.data.msg
          }else{
            this.innerSignIn=res.data.msg
            this.show=false
            sessionStorage.setItem('user',this.username)
            this.sessionFlag=false
          }
        })
      },
      addUser() {
        let name = this.newName;
        let password = this.newWord;
        if(name!== '' && password !==''){
          this.$http.post('/api/user/addUser', {
            params:{
              username: name,
              password: password
            }
          }).then((res) => {
            if(res.data.code === -1){
              this.innerSignUp=res.data.msg
            }else{
              this.innerSignUp=res.data.msg
            }
          })
        }else{
          this.innerSignUp="输入用户名和密码"
        }
      },
      clickThis(index){
        this.show=!this.show
        if(Object.is(index,0)){
          this.signIn=!this.signIn
        }else{
          this.signUp=!this.signUp
        }
      }
    },
    components: {
      "v-search": search,
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/less/style.less";
  .header {
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    .top {
      background: #f4f4f4;
      line-height: 4;
      padding: .5rem 0;
      .top-main {
        margin: 0 auto;
        .span {
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
          float: left;
          font-size: .7rem;
        }
        .ul {
          float: right;
          font-size: 0;
          cursor: pointer;
          .list {
            font-size: .7rem;
            display: inline-block;
            span {
              background: #f6f6f6;
              border: 1px solid #e9e7e7;
              .border-radius(5px);
              margin: .5rem;
              padding: .7rem 1.2rem;
              &.curr{
                border: 0;
              }
            }
            &.headerimg{
              width: 28px;
              height: 28px;
              border-radius: 50%;
              vertical-align: middle;
              img{
                max-width: 100%;
                display: inline-block;
              }
            }
          }
        }
      }
    }
    .bottom {
      padding: .5rem 0;
      background: #fff;
      .bottom-main {
        margin: 0 auto;
        .bottom-ul{
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
          display: inline-block;
          font-size: 0;
          li{
            display: inline-block;
            font-size: 1rem;
            vertical-align: middle;
            cursor: pointer;
            img{
              .pic;
            }
            &:not(:nth-child(1)){
              margin-left: 20px;
            }
          }
        }
      }
    }
    .login{
      background: rgba(0,0,0,.8);
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 15;
      .form{
        animation:.5s ease-in-out animate;
        background: #fff;
        width: 25rem;
        height: 25rem;
        margin: 0 auto;
        transform-style: preserve-3d;
        position: relative;
        top: 20%;
        i{
          display: block;
          text-align: right;
          font-size: 19px;
          font-weight:800;
          padding: 1rem 1rem 0 0;
        }
        img{
          .pic;
          margin: 0 auto;
        }
        form{
          padding: 0 2rem;
          font-size: .8rem;
          input[type=text],input[type=password]{
            width: 100%;
            border: 1px solid #ccc;
            outline: none;
            margin-top: 1rem;
            padding: .5rem;
          }
          input[type=button]{
            width: 100%;
            border: 0;
            background: red;
            margin-top: 1rem;
            line-height: 2.5;
            color: #fff;
          }
          p{
            margin-top: .5rem;
            line-height: 2.5;
            color: #8d8d8d;
            width: 100%;
            text-align: center;
            border: 1px solid #ccc;
          }
          span{
            display: block;
            background: red;
            margin-top: 20px;
            line-height: 2;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
  @media screen and (min-width:320px) and (max-width:600px){
    .bottom-ul{
      display: block !important;
      text-align: center;
      li{
        &:nth-child(1){
          display: none !important;
        }
      }
    }
  }
  @keyframes animate {
    0%{
      width: 1rem;
      height: 2rem;
    }
    25%{
      width: 6rem;
      height: 8rem;
    }
    50%{
      width: 10rem;
      height: 8rem;
    }
    75%{
      width: 8rem;
      height: 12rem;
    }
    100%{
      width: 25rem;
      height: 25rem;
    }
  }

</style>
