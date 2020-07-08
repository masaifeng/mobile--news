<template>
  <div class="comments">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">我的跟帖</span>
    </hm-header>
    <!-- 跟帖列表 -->
    <div class="follow" v-for="items in info" :key="items.id">
      <div class="time">{{items.create_date}}</div>
      <div class="other" v-if="items.parent">
        <div class="call">回复:{{items.parent.user.nickname}}</div>
        <div class="callconte">{{items.parent.content}}</div>
      </div>
      <div class="reply">
        <div class="content">{{items.content}}</div>
        <div class="page">
          <div class="cont">{{items.post.title}}</div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    const res = await this.$axios.get(this.baseUrl + '/user_comments')
    console.log(res)
    if (res.data.statusCode === 200) {
      this.info = res.data.data
    }
  },
  data() {
    return {
      info: []
    }
  }
}
</script>

<style lang='less' scoped>
.follow {
  font-size: 16px;
  padding: 10px 20px;
  line-height: 24px;
  border-bottom: 1px solid gray;
  .other {
    background-color: rgba(0, 0, 0, 0.1);
    margin: 5px 0;
    padding: 8px;
    border-radius: 10px;
  }
  .page {
    span {
      float: right;
    }
    .cont {
      width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
  }
  .reply {
    .content {
      margin-top: 8px;
    }
  }
}
</style>
