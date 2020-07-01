<template>
  <div>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="nav"
    >
      <slot slot="title" name="title"></slot>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
.nav {
  box-shadow: 0px 8px 8px -14px #000;
}
</style>
