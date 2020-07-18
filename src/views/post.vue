<template>
  <div class="post">
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar left-arrow @click-left="goback">
        <template #title>
          <span class="iconfont iconnew"></span>
        </template>
        <template #right>
          <div v-if="info.type!==2">
            <span class="follow" @click="follow" v-if="info.has_follow !== true">关注</span>
            <span class="unfollow" @click="unfollow" v-else>已关注</span>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 内容 -->
    <div class="Conte" v-if="info.type===2">
      <!-- 视频 -->
      <div class="video">
        <video :src="info.content" controls></video>
      </div>
      <div class="user">
        <span>{{info.user.nickname}}</span> &nbsp; &nbsp;
        <span>{{info.create_date | timeFil}}</span>
        <!-- 关注 -->
        <span class="follow" @click="follow" v-if="info.has_follow !== true">关注</span>
        <span class="unfollow" @click="unfollow" v-else>已关注</span>
      </div>
      <div class="title">{{info.title}}</div>

      <!-- 分享 -->
      <div class="share">
        <div class="like" @click="mylike">
          <span class="iconfont icondianzan"></span>
          {{info.like_length}}
        </div>
        <div class="wechat">
          <span class="iconfont iconweixin"></span>
          微信
        </div>
      </div>
    </div>
    <div class="Conte" v-else>
      <div class="title">{{info.title}}</div>
      <div class="user">
        <span>{{info.user.nickname}}</span> &nbsp; &nbsp;
        <span>{{info.create_date | timeFil}}</span>
      </div>
      <!-- 文章 -->
      <div class="textcont">
        <div v-html="info.content"></div>
      </div>
      <!-- 分享 -->
      <div class="share">
        <div class="like" @click="mylike">
          <span class="iconfont icondianzan"></span>
          112
        </div>
        <div class="wechat">
          <span class="iconfont iconweixin"></span>
          微信
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer" v-if="pingshow">
      <input type="text" placeholder="发帖吧~" @focus="focus" />
      <span class="iconfont iconpinglun-">
        <span class="num">{{info.comment_length}}</span>
      </span>
      <span class="iconfont iconshoucang"></span>
      <span class="iconfont icondianzan"></span>
    </div>
    <!-- 写评论 -->
    <div class="critic" v-else>
      <textarea :placeholder="'回复:'+callname" v-model="ping" ref="pingshu" @blur="blur"></textarea>
      <span @click="send">发送</span>
    </div>
    <!-- 评论标题 -->
    <div class="commen_ttitle">精彩跟帖</div>
    <!-- 评论列表 -->
    <hm-comment v-for="items in comment" :key="items.id" :comment="items"></hm-comment>
    <div class="zhan"></div>
  </div>
</template>

<script>
export default {
  created() {
    this.getall()
    this.getcomment()
    // 仅仅是注册事件 所以可以在创建的时候注册事件 存在内存中
    this.$bus.$on('pingor', (id, name) => {
      console.log(id, name)
      // 显示评论框
      this.pingshow = false
      // 获取焦点
      this.$nextTick(function() {
        this.$refs.pingshu.focus()
      })
      // 把获取到的值存起来
      this.callid = id
      this.callname = name
    })
  },
  data() {
    return {
      info: {
        user: ''
      },
      comment: [],
      ping: '',
      pingshow: true,
      callname: '',
      callid: ''
    }
  },
  methods: {
    // 获取数据
    async getall() {
      const id = this.$route.query.id
      const res = await this.$axios(this.baseUrl + `/post/${id}`)

      if (res.data.statusCode === 200) {
        this.info = res.data.data
      }
    },
    // 获取评论列表
    async getcomment() {
      const id = this.$route.query.id
      // 获取评论
      const res = await this.$axios.get(this.baseUrl + `/post_comment/${id}`)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.comment = res.data.data
      }
    },
    goback() {
      this.$router.go(-1)
    },
    // 关注事件
    async follow() {
      const token = localStorage.getItem('token')
      const id = this.info.user.id
      if (token) {
        // 点击确认发送 请求关注
        const res = await this.$axios.get(this.baseUrl + `/user_follows/${id}`)
        console.log(res)
        if (res.data.statusCode === 200) {
          this.getall()
        }
      } else {
        try {
          // 消息框是异步运行的要加await
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '是否去登录'
          })
          // 带着当前的地址去登录页
          console.log(this.$route)
          const pathurl = this.$route.fullPath
          localStorage.setItem('url', pathurl)
          this.$router.push('/login')
        } catch {
          this.$toast('继续浏览')
        }
      }
    },
    // 取消关注
    async unfollow() {
      const id = this.info.user.id
      const res = await this.$axios.get(this.baseUrl + `/user_unfollow/${id}`)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.getall()
      }
    },
    // 点赞
    async mylike() {
      const id = this.info.id
      const res = await this.$axios.get(this.baseUrl + `/post_like/${id}`)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.getall()
      }
    },
    // 获得焦点焦点
    focus() {
      this.pingshow = false
      this.$nextTick(function() {
        this.$refs.pingshu.focus()
      })
    },
    // 失去焦点隐藏
    blur() {
      if (!this.ping) {
        this.pingshow = true
      }
    },
    // 发表评论
    async send() {
      this.$bus.$on('pingor', function(data) {
        console.log(data)
      })
      const id = this.info.id
      // 发送请求
      const res = await this.$axios.post(this.baseUrl + `/post_comment/${id}`, {
        content: this.ping,
        parent_id: this.callid
      })
      console.log(res)

      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        // 更新评论
        this.getcomment()
        // 清空输入框里面的内容
        this.ping = ''
        this.pingshow = true
      }
    }
    // 回复评论
    // async callor(data) {
    //   // 点击回复显示评论框
    //   this.pingshow = false
    //   // 把获取到的名字给评论
    //   this.callname = data.nickname
    //   // 把要回复的id 赋值给callid
    //   this.callid = data.id
    //   // 获取焦点
    //   this.$nextTick(function() {
    //     this.$refs.pingshu.focus()
    //   })
    // }
  }
}
</script>

<style lang='less' scoped>
.post {
  width: 100%;
  height: 100%;
  position: relative;
  .follow {
    display: block;
    height: 30px;
    line-height: 30px;
    width: 68px;
    border-radius: 15px;
    color: #fff;
    text-align: center;
    background-color: #1989fa;
    margin-left: auto;
  }
  .unfollow {
    display: block;
    height: 30px;
    line-height: 30px;
    width: 68px;
    border-radius: 15px;
    color: #1989fa;
    text-align: center;
    // background-color: #1989fa;
    border: 1px solid #1989fa;
    margin-left: auto;
  }
  .header {
    font-size: 16px;
    box-shadow: 0px 8px 8px -14px #000;
    .van-nav-bar__title {
      span {
        font-size: 68px;
        color: #1989fa;
        float: left;
      }
    }
  }
  .Conte {
    padding: 0 20px;
    font-size: 16px;
    line-height: 32px;
    border-bottom: 5px solid #f0f0f0;
    .title {
      margin-top: 12px;
      font-size: 18px;
    }
    .user {
      background-color: #fff;
      font-size: 14px;
      display: flex;
    }
    .video {
      width: 100%;
      video {
        width: 100%;
      }
    }
    .share {
      display: flex;
      padding: 20px 50px;
      justify-content: space-between;
      font-size: 12px;

      .like {
        width: 70px;
        height: 35px;
        border: 1px solid #1989fa;
        border-radius: 35px;
        text-align: center;
        line-height: 35px;
        color: #1989fa;
      }
      .wechat {
        width: 70px;
        height: 35px;
        border: 1px solid #1989fa;
        border-radius: 35px;
        text-align: center;
        line-height: 35px;
        color: #1989fa;
        span {
          color: #49de00;
        }
      }
    }
    /deep/img {
      width: 100%;
    }
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 52px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px -2px 30px 0px rgba(0, 0, 0, 0.08);
    background-color: #fff;

    input {
      font-size: 16px;
      width: 185px;
      height: 38px;
      padding-left: 15px;
      border-radius: 19px;
      border: none;
      background-color: #eee;
      // margin-right: 12px;
    }
    span {
      font-size: 28px;
    }
    .iconpinglun- {
      position: relative;
      .num {
        font-size: 12px;
        color: #fff;
        position: absolute;
        top: -2px;
        right: -5px;
        width: 18px;
        height: 18px;
        background-color: red;
        border-radius: 7.5px;
        text-align: center;
        line-height: 18px;
      }
    }
  }
  .critic {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    margin-right: -17px;
    padding: 10px 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    box-shadow: 0px -2px 30px 0px rgba(0, 0, 0, 0.08);
    background-color: #fff;

    textarea {
      height: 70px;
      width: 240px;
      border-radius: 15px;
      padding: 10px;
      font-size: 16px;
      margin-left: 5px;
      background-color: #eee;
      border: none;
    }
    span {
      display: inline-block;
      width: 60px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      border-radius: 15px;
      text-align: center;
      background-color: #1989fa;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .commen_ttitle {
    text-align: center;
    line-height: 28px;
    font-size: 20px;
    margin: 10px;
  }
  .zhan {
    height: 58px;
  }
}
</style>
