<template>
  <div class="user">
    <hm-header>
      <span slot="title">用户中心</span>
    </hm-header>

    <!-- 头部部分 -->
    <div class="user-header" @click="$router.push('/userEdit')">
      <div class="user-img">
        <van-image
          round
          width="70px"
          height="70px"
          :src="this.baseUrl + userData.head_img"
        />
      </div>
      <div class="msg">
        <span
          class="iconfont iconxingbienan"
          v-if="userData.gender === 1"
        ></span
        >&nbsp; <span class="iconfont iconxingbienv" v-else></span>&nbsp;
        <span class="name">{{ userData.nickname }}</span>
        <p>{{ userData.create_date | timeFil }}</p>
      </div>
      <span class="iconfont iconjiantou1 jiantou"></span>
    </div>

    <!-- user-list 信息列表 -->
    <hm-userlist>
      <template slot="title">我的关注</template>
      <template slot="tips">关注的用户</template>
    </hm-userlist>
    <hm-userlist>
      <template slot="title">我的跟帖</template>
      <template slot="tips">跟帖/回复</template>
    </hm-userlist>
    <hm-userlist>
      <template slot="title">我的收藏</template>
      <template slot="tips">文章/视频</template>
    </hm-userlist>
    <hm-userlist @click="fn">
      <template slot="title">设置</template>
    </hm-userlist>
  </div>
</template>

<script>
export default {
  async created() {
    const id = localStorage.getItem('loginId')
    const res = await this.$axios.get(this.baseUrl + `/user/${id}`)
    console.log(res)
    this.userData = res.data.data
    // 拦截token失效的用户
    if (res.data.statusCode === 401) {
      // 清空token
      localStorage.removeItem('token')
      // 跳转到login界面
      this.$router.push('/login')
      this.$toast.fail('获取信息失败')
    }
  },
  data() {
    return {
      userData: ''
    }
  },
  methods: {
    fn() {
      this.$router.push('/userEdit')
    }
  }
}
</script>

<style lang="less">
.user {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  // display: flex;
  .user-header {
    height: 120px;
    background-color: #fff;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .msg {
      height: 70px;
      padding: 40px 25px 10px 12px;
      font-size: 16px;
      flex: 1;
      p {
        line-height: 30px;
      }

      .iconxingbienv {
        color: red;
      }
      .iconxingbienan {
        color: blue;
      }
    }
    .user-img {
      float: left;
      width: 70px;
      height: 70px;
      padding: 25px 25px;
    }
    .jiantou {
      margin-right: 20px;
      font-size: 18px;
    }
  }
  .user-list {
    .van-cell {
      padding-top: 16px;
      padding-bottom: 16px;
    }
  }
}
</style>
