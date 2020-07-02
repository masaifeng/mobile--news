<template>
  <div class="user">
    <!-- 头部部分 -->
    <div class="user-header">
      <div class="user-img">
        <van-image round width="70px" height="70px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div class="msg">
        <span class="iconfont iconxingbienan"></span>&nbsp;
        <span class="name">火星网友</span>
        <p>2019-10-21</p>
      </div>
    </div>

    <!-- user-list 信息列表 -->
    <div class="user-list">
      <van-cell title="我的关注" is-link url="/vant/mobile.html" />
      <van-cell title="我的跟帖" is-link to="index" />
      <van-cell title="我的收藏" is-link to="index" />
      <van-cell title="设置" is-link to="index" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less'>
.user {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .user-header {
    height: 120px;
    background-color: #fff;
    margin-bottom: 10px;
    .msg {
      float: left;
      height: 70px;
      padding: 40px 25px 10px 12px;
      font-size: 16px;
      p {
        line-height: 30px;
      }
    }
    .user-img {
      float: left;
      width: 70px;
      height: 70px;
      padding: 25px 25px;
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
