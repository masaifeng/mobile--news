<template>
  <div>
    <commentList :num="num-1" v-if="comment.parent" :comment="comment.parent"></commentList>
    <div class="commentList">
      <div class="listTop">
        <span>{{num}}楼 {{comment.user.nickname}}</span>
        <span class="time">{{comment.create_date}}</span>
        <span class="call" @click="fn(comment.id,comment.user.nickname)">回复</span>
      </div>
      <div class="listConte">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentList',
  props: {
    comment: Object,
    num: Number
  },
  methods: {
    fn(id, name) {
      this.$bus.$emit('pingor', id, name)
    }
  }
}
</script>

<style lang='less' scoped>
.commentList {
  border: 1px solid #898989;
  font-size: 16px;
  padding: 8px;
  .listTop {
    .time,
    .call {
      font-size: 14px;
      color: #898989;
    }
    .time {
      margin-left: 12px;
    }
    .call {
      float: right;
    }
  }
  .listConte {
    padding-top: 18px;
  }
}
</style>
