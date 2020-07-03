<template>
  <div class="register">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">注册</span>
    </hm-header>

    <!-- logo -->
    <div class="logo iconfont iconnew"></div>

    <!-- 列表  -->
    <van-form @submit="onSubmit" class="fromCont">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="nickname"
        type="nickname"
        label="昵称"
        placeholder="昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
    <!-- 去注册 -->
    <span class="goback">
      没有账号?去
      <router-link to="Login">登录</router-link>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
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
        ],
        nickname: [
          {
            pattern: /^[\u4E00-\u9FA5]{2,4}$/,
            message: '昵称是2到4个中文字符',
            trigger: 'onChange'
          },
          { trigger: 'onChange', required: true }
        ]
      }
    }
  },

  methods: {
    async onSubmit() {
      const res = await this.$axios.post(this.baseUrl + '/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('注册成功')
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  }
}
</script>

<style lang="less">
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
