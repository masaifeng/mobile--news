<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
      <div class="wode" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab添加删除 -->
    <van-sticky>
      <div class="addor" @click="$router.push('/editab')">
        <van-icon name="arrow-down" />
      </div>
    </van-sticky>
    <!-- 标签tab栏 -->
    <div>
      <van-tabs v-model="active" animated sticky swipeable>
        <van-tab :title="items.name" v-for="items in category" :key="items.id">
          <div class="content">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :offset="10"
                :immediate-check="false"
              >
                <hm-newlist v-for="items in info" :key="items.id" :items="items"></hm-newlist>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>``

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Home',
  created() {
    const tab = JSON.parse(localStorage.getItem('tab'))
    if (tab) {
      this.category = tab
      // 获取第一个的文章内容
      this.getCont(this.category[0].id)
    } else {
      this.gettab()
    }
  },
  data() {
    return {
      category: [],
      active: 0,
      pageIndex: 1,
      pageSize: 6,
      info: [],
      // 为false 是不触发loding事件
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    ...mapMutations(['clear']),
    // 获取所有标签内容
    async gettab() {
      const res = await this.$axios.get(this.baseUrl + '/category')
      if (res.data.statusCode === 200) {
        this.category = res.data.data
        this.getCont(this.category[0].id)
      }
    },
    // 获取文章数据
    async getCont(id) {
      const res = await this.$axios.get(this.baseUrl + '/post', {
        params: {
          category: id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      })
      console.log(res)
      if (this.pageIndex === 1) {
        this.info = []
      }
      if (res.data.statusCode === 200) {
        this.info = [...this.info, ...res.data.data]
      }

      // 加载状态结束 相当于是告诉axios请求已经结束 可以触发loading事件了
      this.loading = false
      // 加载结束后把refreshing改成true 表示加载完成
      this.refreshing = false

      // 判断结束条件
      if (res.data.data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad() {
      if (this.refreshing) {
        this.list = []
        this.refreshing = false
      }
      setTimeout(() => {
        // 把当前页加1
        this.pageIndex++
        // 获取当前的id
        const id = this.category[this.active].id
        // // 发送请求
        this.getCont(id)
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      this.info = []
      this.pageIndex = 1

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      // 发送数据重新渲染
      setTimeout(() => {
        this.getCont(this.category[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active(num) {
      console.log(num)

      // 把原来的数据清空
      this.info = []
      // 把上一次设置数据读取完设置为true的finished改过来
      this.finished = false
      // 把loading改成true 如果为false不触发loading事件
      this.pageIndex = 1
      this.loading = true

      setTimeout(() => {
        const id = this.category[num].id
        // // 发送请求
        this.getCont(id)
      }, 1000)
    }
  },
  beforeRouteLeave(to, from, next) {
    // 判断只要去的是tab配置界面就清除掉home的缓存
    console.log(to)
    if (to.path === '/editab') {
      // 清空vuex中的home
      this.$store.commit('clear')
    }
    next()
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 54px;
  width: 100%;
  background-color: #1989fa;
  display: flex;
  text-align: center;
  line-height: 54px;
  color: #fff;

  .left {
    width: 70px;
    span {
      font-size: 58px;
    }
  }
  .search {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.5);
    height: 38px;
    border-radius: 26px;
    margin-top: 8px;
    line-height: 38px;
    font-size: 14px;
  }
  .wode {
    width: 70px;
    span {
      font-size: 32px;
    }
  }
}
.addor {
  position: absolute;
  right: 0%;
  width: 10%;
  line-height: 44px;
  height: 44px;
  text-align: center;
  background-color: #fff;
  z-index: 999;
  .van-icon {
    padding-top: 5px;
    font-size: 16px;
  }
}

.van-tabs {
  /deep/.van-sticky {
    width: 90%;
  }
}
</style>
