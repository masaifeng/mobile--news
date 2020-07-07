<template>
  <div class="follows">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">我的关注</span>
    </hm-header>

    <!-- 关注列表 -->
    <div class="list" v-for="items in info" :key="items.id">
      <van-cell-group>
        <van-image round width="40px" height="40px" :src="baseUrl + items.head_img" />
        <div class="cont">
          <div>{{items.nickname}}</div>
          <div class="time">{{items.create_date | timeFil}}</div>
        </div>
        <van-button
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          :round="true"
          @click="unfollows(items.id)"
        >取消关注</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getall()
  },
  data() {
    return {
      info: []
    }
  },
  methods: {
    // 获取所有数据
    async getall() {
      const res = await this.$axios.get(this.baseUrl + '/user_follows')
      console.log(res)
      if (res.data.statusCode === 200) {
        this.info = res.data.data
      }
    },
    // 取消关注
    async unfollows(id) {
      try {
        // 要加await等待执行
        await this.$dialog.confirm({
          title: '标题',
          message: '弹窗内容'
        })
        // 发送请求
        const res = await this.$axios.get(this.baseUrl + `/user_unfollow/${id}`)
        console.log(res)
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message)
          this.getall()
        }
      } catch {
        this.$toast.fail('取消关注失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  font-size: 16px;
  .van-cell-group {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    .cont {
      flex: 1;
      padding-left: 15px;
      line-height: 22px;
    }
    .van-button {
      font-size: 12px;
      height: 30px;
      width: 80px;
    }
  }
}
</style>
