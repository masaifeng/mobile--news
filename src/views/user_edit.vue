<template>
  <div class="edit">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">编辑资料</span>
    </hm-header>
    <!-- 头部部分 -->
    <div class="user-header">
      <div class="user-img">
        <van-image round width="70px" height="70px" :src="this.baseUrl + info.head_img" />
        <van-uploader :after-read="afterRead" />
      </div>
    </div>
    <!-- 修改列表 -->
    <hm-userlist @click="nickfn">
      <template slot="title">昵称</template>
      <template slot="tips">{{ info.nickname }}</template>
    </hm-userlist>
    <hm-userlist @click="pswfn">
      <template slot="title">密码</template>
      <template slot="tips">*****</template>
    </hm-userlist>
    <hm-userlist @click="genderfn">
      <template slot="title">性别</template>
      <template slot="tips">{{ info.gender === 0 ? '女' : '男' }}</template>
    </hm-userlist>
    <!-- 昵称弹出 -->
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="nickedit">
      <van-field v-model="nickname" placeholder="请输入要修改的昵称" />
    </van-dialog>
    <!-- 密码弹出 -->
    <van-dialog v-model="pshow" title="修改密码" show-cancel-button @confirm="pwredit">
      <van-field v-model="password" placeholder="请输入要修改的密码" />
    </van-dialog>
    <!-- 性别选择弹出 -->
    <van-dialog v-model="gdshow" title="修改性别" show-cancel-button @confirm="gdedit">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 截图框 -->
    <div class="mask" v-show="iscoper">
      <van-button type="primary" @click="editimg">确认</van-button>
      <van-button type="warning">取消</van-button>
      <vueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></vueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      info: '',
      nickshow: false,
      pshow: false,
      gdshow: false,
      gender: '',
      nickname: '',
      password: '',
      fileUrl: '',
      // 显示裁切
      iscoper: false,
      img: ''
    }
  },
  created() {
    this.gerAll()
  },
  methods: {
    // 发送请求获取全部数据
    async gerAll() {
      const id = localStorage.getItem('loginId')
      const res = await this.$axios.get(this.baseUrl + `/user/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 把获取到的值传到本地
        this.info = data
      }
    },
    async getedit(data) {
      const id = localStorage.getItem('loginId')
      const res = await this.$axios.post(
        this.baseUrl + `/user_update/${id}`,
        data
      )
      const { statusCode, message } = res.data
      console.log(res)
      if (statusCode === 200) {
        this.gerAll()
      } else {
        // this.$toast.fail(message)
        console.log(message)
      }
    },
    // 封装发送axios请求
    // 显示昵称模态框
    nickfn() {
      this.nickshow = true
      this.nickname = this.info.nickname
    },
    // 显示密码模态框
    pswfn() {
      this.pshow = true
      this.password = this.info.password
    },
    // 显示性别
    genderfn() {
      this.gdshow = true
      this.gender = this.info.gender
    },
    // 修改昵称
    nickedit() {
      // 异步事件
      this.getedit({ nickname: this.nickname })
    },
    // 修改密码
    pwredit() {
      // 异步事件
      this.getedit({ password: this.password })
    },
    // 修改性别
    gdedit() {
      // 异步事件
      this.getedit({ gender: this.gender })
    },
    // 修改头像
    afterRead(file) {
      // 显示裁切框
      this.iscoper = true
      // 把获取到的图片给img
      this.img = file.content
    },
    // 确认修改头像
    editimg() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async data => {
        // 隐藏窗口.
        this.iscoper = false
        // 上传图片
        const fd = new FormData()
        fd.append('file', data)
        // 此时可以自行将文件上传至服务器
        const res = await this.$axios.post(this.baseUrl + '/upload', fd)
        console.log(res)
        // 如果获取
        if (res.data.statusCode === 200) {
          this.getedit({ head_img: res.data.data.url })
          this.gerAll()
          this.$toast('头像修改成功')
        } else {
          this.$toast('头像修改失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
.edit {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  button {
    position: absolute;
    z-index: 999;
    top: 0;
  }
  .van-button:nth-child(1) {
    left: 0;
  }
  .van-button:nth-child(2) {
    right: 0;
  }
}
.user-header {
  position: relative;
  box-shadow: 0px 8px 8px -14px red;
  margin-bottom: 10px;
  background-color: #fff;
  .user-img {
    text-align: center;
    padding: 20px;
  }

  .van-uploader {
    position: absolute;
    padding: 30px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    opacity: 0;
  }
}
</style>
