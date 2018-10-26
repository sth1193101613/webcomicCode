<template>
  <div id="app">
    <v-header></v-header>
      <div class="main">
        <router-view></router-view>
      </div>
    <v-footer></v-footer>
    <v-scroll v-if="this.$router.path === '/detailCont'"></v-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../src/components/header/header.vue'
  import footer from '../src/components/footer/footer.vue'
  import scroll from '../src/beas/scrollTop/scroll.vue'
  export default {
    components: {
      "v-header": header,
      "v-footer":footer,
      "v-scroll":scroll
    }
  }
</script>

