<template>
  <div class="page">
    <v-swiper v-if="$route.path!=='/view'"></v-swiper>
    <v-nav></v-nav>
    <v-viewList></v-viewList>
  </div>
</template>

<script type="text/ecmascript-6">
  import swiper from '../../beas/swiper/swiper.vue'
  import viewList from '../../beas/list/list.vue'
  import nav from './navlist/navlist.vue'
  import {classFliy} from '../../apiServer/classfily'
  export  default {
    data() {
      return{
        list:[],
      }
    },
    created() {
      this._getList()
    },
    methods:{
      _getList(){
        classFliy().then((res) => {
          this.list=res.category_list
        })
      },
    },
    components: {
      "v-swiper":swiper,
      "v-nav":nav,
      "v-viewList":viewList
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
