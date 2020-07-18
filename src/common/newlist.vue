<template>
  <div class="newlist" @click="fn">
    <!-- 视频组件 -->
    <div class="video" v-if="items.type===2">
      <div class="title">{{items.title}}</div>
      <div class="videopage">
        <video :src="items.content"></video>
      </div>
      <span>{{items.user.nickname}}&nbsp;&nbsp;{{items.comment_length}}跟帖</span>
    </div>
    <!-- 单图组件 -->
    <div class="list" v-else-if="items.cover.length < 3">
      <div class="content">
        <div class="title">{{items.title}}</div>
        <span>{{items.user.nickname}}&nbsp;&nbsp;{{items.comment_length }}跟帖</span>
      </div>
      <div class="tu">
        <img :src="pageUrl(items.cover[0].url)" alt />
      </div>
    </div>
    <!-- 多图组件 -->
    <div class="lists" v-else>
      <div class="title">{{items.title}}</div>
      <div class="imgs">
        <img :src="pageUrl(items.cover[0].url)" alt />
        <img :src="pageUrl(items.cover[1].url)" alt />
        <img :src="pageUrl(items.cover[2].url)" alt />
      </div>
      <span>{{items.user.nickname}}&nbsp;&nbsp;{{items.comment_length}}跟帖</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  methods: {
    fn() {
      this.$router.push({
        path: '/post',
        query: { id: this.items.id }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.video {
  height: 220px;
  margin: 0 15px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid gray;
  .title {
    font-size: 16px;
  }
  .videopage {
    width: 100%;
    height: 150px;
    padding: 8px 0;
    video {
      height: 150px;
      width: 100%;
      object-fit: cover;
    }
  }
}
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
    .title {
      font-size: 16px;
    }
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
.lists {
  height: 140px;
  margin: 0 15px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid gray;
  .title {
    font-size: 16px;
  }
  .imgs {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    img {
      width: 110px;
      height: 70px;
      object-fit: cover;
    }
  }
  span {
    margin-top: 8px;
  }
}
</style>
