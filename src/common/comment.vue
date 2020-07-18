<template>
  <div class="comment">
    <div class="com_list">
      <div class="top">
        <img :src="this.baseUrl + comment.user.head_img" />
        <div class="msg">
          <span>{{comment.user.nickname}}</span>
          <br />
          <span class="time">{{comment.create_date}}</span>
        </div>
        <div class="call" @click="fn(comment.id,comment.user.nickname)">回复</div>
      </div>
      <commentList
        :num="floornum(1,comment.parent)"
        v-if="comment.parent"
        :comment="comment.parent"
      ></commentList>
      <div class="conte">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
import commentList from './commentList.vue'
export default {
  components: {
    commentList
  },
  props: {
    comment: Object
  },
  methods: {
    floornum(num, data) {
      if (data.parent) {
        num++
        return this.floornum(num, data.parent)
      } else {
        return num
      }
    },
    fn(id, nickname) {
      this.$bus.$emit('pingor', id, name)
    }
  }
}
</script>

<style lang='less' scoped>
.comment {
  padding: 12px 20px;
  border-bottom: 1px solid #ccc;
  .com_list {
    .top {
      font-size: 16px;
      margin-bottom: 10px;
      img {
        width: 35px;
        height: 35px;
        border-radius: 17.5px;
      }
      .msg {
        display: inline-block;
        margin-left: 15px;
        .time {
          font-size: 14px;
          color: #898989;
        }
      }
      .call {
        float: right;
        color: #898989;
      }
    }
    .conte {
      padding-top: 8px;
      font-size: 16px;
      line-height: 32px;
    }
  }
}
</style>
