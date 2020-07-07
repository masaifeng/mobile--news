<template>
  <div class="login">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">登录</span>
    </hm-header>

    <!-- logo -->
    <div class="logo iconfont iconnew"></div>

    <!-- 表单 -->
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" label="用户名" placeholder="用户名" :rules="rules.username" />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <!-- 去注册 -->
    <span class="goback">
      没有账号?去
      <router-link to="Register">注册</router-link>
    </span>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          {
            pattern: /^\d{5,11}$/,
            required: true,
            message: '请输入3-5个数字',
            trigger: 'onChange'
          }
        ],
        password: [
          {
            pattern: /^\d{3,11}$/,
            required: true,
            message: '请输入3-5个数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  created() {
    // 把传递过来的内容展示出来
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  },
  methods: {
    async onSubmit() {
      // 发送axios请求
      const res = await this.$axios.post(this.baseUrl + '/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)

      if (res.data.statusCode === 200) {
        // 登录成功获取token
        const { token } = res.data.data
        const loginId = res.data.data.user.id
        // 把token和ID添加到本地存储
        localStorage.setItem('token', token)
        localStorage.setItem('loginId', loginId)
        // 加载轻提示
        this.$toast.success(res.data.message)
        // 跳转到首页
        this.$router.push('/user')
      } else {
        this.$toast(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" scope>
.logo {
  font-size: 140px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  padding-top: 40px;
  padding-bottom: 10px;
  color: #1989fa;
}
.fromCont {
  margin: 0 10px;
}
.goback {
  float: right;
  font-size: 16px;
  padding-right: 30px;
}
</style>
