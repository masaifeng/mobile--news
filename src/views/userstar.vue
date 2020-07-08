<template>
  <div class="userstar">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">我的跟帖</span>
    </hm-header>
    <!-- 收藏列表 -->
    <div class="star_list" v-for="items in info" :key="items.id">
      <div class="list">
        <div class="content">
          <div class="title">{{items.title}}</div>
          <span>{{items.user.nickname}}&nbsp;&nbsp;{{items.comments.length}}跟帖</span>
        </div>
        <div class="tu">
          <img :src="pageUrl(items.cover[0].url)" alt />
        </div>
      </div>
    </div>
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
.list {
  height: 100px;
  margin: 0 15px;
  border-bottom: 1px solid gray;
  font-size: 14px;
  display: flex;
  justify-content: center;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 15px;
    flex: 1;
  }
  .tu {
    padding-top: 15px;
    img {
      width: 120px;
      height: 70px;
      object-fit: cover;
    }
  }
}
</style>
