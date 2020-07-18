<template>
  <div class="userstar">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">我的跟帖</span>
    </hm-header>
    <!-- 收藏列表 -->
    <!-- <div class="star_list" v-for="items in info" :key="items.id">
      <hm-newlist :items="items"></hm-newlist>
    </div>-->
    <hm-newlist v-for="items in info" :key="items.id" :items="items"></hm-newlist>
  </div>
</template>

<script>
export default {
  created() {
    this.getdata()
  },
  methods: {
    async getdata() {
      const res = await this.$axios.get(this.baseUrl + '/user_star', {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      console.log(res)
      if (res.data.statusCode === 200) {
        this.info = res.data.data
        // 添加统一的类名
        this.info.forEach(item => {
          console.log(item)
          item.comment_length = item.comments.length
        })
      }
    }
  },
  data() {
    return {
      info: [],
      pageIndex: 1,
      pageSize: 5
    }
  }
}
</script>

<style lang='less' scoped>
</style>
