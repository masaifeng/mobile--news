<template>
  <div class="list" @click="fn">
    <van-cell is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #default>
        <slot name="tips"></slot>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  methods: {
    fn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scope>
.van-cell {
  height: 60px;
  // line-height: 45px;
  line-height: 40px;
  .van-cell__right-icon {
    line-height: 40px;
  }
}
</style>
