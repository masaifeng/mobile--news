<template>
  <div class="login">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">登录</span>
    </hm-header>

    <!-- logo -->
    <div class="logo iconfont iconnew"></div>

    <!-- 表单 -->
    <van-form @submit="onSubmit" class="fromCont">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" class="login">
          登录
        </van-button>
      </div>
    </van-form>

    <!-- 去注册 -->
    <span class="goback"
      >没有账号?去<router-link to="Register">注册</router-link></span
    >
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          {
            pattern: /^\d{5,11}$/,
            message: '用户名只能是5-11位数字',
            trigger: 'onChange'
          },
          { trigger: 'onChange', required: true }
        ],
        password: [
          {
            pattern: /^\d{3,11}$/,
            message: '用户名只能是3-11位数字',
            trigger: 'onChange'
          },
          { trigger: 'onChange', required: true }
        ]
      }
    }
  },
  created() {
    // const { username, password } = this.$route.params
    // this.username = username
    // this.password = password
    console.log(this.$route.params)
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  },
  methods: {
    async onSubmit() {
      // const info = await this.$axios.post(this.baseUrl + '/login', {
      //   username: this.username,
      //   password: this.password
      // })
      // console.log(this.$axios, this.baseUrl)
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      const { token } = res.data.data

      if (res.data.statusCode === 200) {
        this.$toast('登录成功')
        this.$router.push('/')
        localStorage.setItem('token', token)
      } else {
        this.$toast('登录失败')
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
