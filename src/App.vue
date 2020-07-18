<template>
  <div id="app">
    <!-- include 中是不刷新的页面 -->
    <keep-alive :include="name">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['name'])
  }
}
</script>
<style lang="less"></style>
