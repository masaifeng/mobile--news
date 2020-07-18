<template>
  <div class="search">
    <!-- header -->
    <div class="search_head">
      <span @click="goback">
        <van-icon name="arrow-left" />
      </span>
      <input
        type="text"
        @input="think"
        v-model.trim="keyword"
        placeholder="请输入关键字"
        @keyup.enter="search"
      />
      <span class="sou" @click="search">搜索</span>
    </div>

    <!-- 联想内容 -->
    <div class="think_data" v-if="thinkData.length > 0">
      <div class="think_list" v-for="data in thinkData" :key="data.id">
        <div class="list on-txt-cut" @click="thinkfn(data.id)">{{data.title}}</div>
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 搜索出来的内容 -->
    <div class="search-data" v-else-if="searchData.length > 0">
      <hm-newlist v-for="items in searchData" :key="items.id" :items="items"></hm-newlist>
    </div>

    <div v-else>
      <!-- 历史记录 -->
      <div class="history">
        <p>历史记录</p>
        <div class="msg">
          <div
            class="items"
            v-for="item in searchKey"
            :key="item"
            @click="search_his(item)"
          >{{item}}</div>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="hot_search">
        <p>热门搜索</p>
        <div class="msg">
          <div class="items">办公室小野否认解散</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  created() {
    // 看本地存储有没有历史记录
    const res = JSON.parse(localStorage.getItem('searchKey'))
    if (res) {
      this.searchKey = res
    }
  },
  data() {
    return {
      // 关键字
      keyword: '',
      // 搜索出来的内容
      searchData: [],
      // 搜索的关键字
      searchKey: [],
      // 历史记录
      // history: [],
      soushow: true,
      // 联想内容
      thinkData: []
    }
  },
  methods: {
    think: _.debounce(async function() {
      if (this.keyword !== '') {
        const res = await this.$axios.get(
          this.baseUrl + `/post_search?keyword=${this.keyword}`
        )
        // console.log(res)
        if (res.data.statusCode === 200) {
          this.thinkData = res.data.data
          console.log(res.data.data)
        }
      }
    }, 500),
    // 点击搜索
    async search() {
      // 如果搜索的内容为空就不搜索
      if (this.keyword !== '') {
        // 发送请求
        const res = await this.$axios.get(this.baseUrl + '/post_search', {
          params: {
            keyword: this.keyword
          }
        })
        if (res.data.statusCode === 200) {
          this.searchData = res.data.data
        }

        // 过滤一下关键字看是否有重复
        this.searchKey = this.searchKey.filter(item => item !== this.keyword)

        // 把搜索的关键字存起来,并且监听存在本地存储中
        this.searchKey.unshift(this.keyword)
        // 把内容清空
        this.keyword = ''
      }
    },
    // 返回事件
    goback() {
      if (this.keyword) {
        // 清空搜索栏内容
        this.keyword = ''
        this.searchData = []
      } else {
        this.$router.back()
        console.log(123)
      }
    },
    // 历史记录点击搜索
    async search_his(data) {
      // 发送请求
      const res = await this.$axios.get(this.baseUrl + '/post_search', {
        params: {
          keyword: data
        }
      })
      if (res.data.statusCode === 200) {
        this.searchData = res.data.data
      }

      // 过滤一下关键字看是否有重复
      this.searchKey = this.searchKey.filter(item => item !== data)

      // 把搜索的关键字存起来,并且监听存在本地存储中
      this.searchKey.unshift(data)
      // 把内容清空
      this.keyword = ''
      this.soushow = false
    },
    // 联想事件点击
    thinkfn(dataId) {
      const data = this.keyword
      // 过滤一下关键字看是否有重复
      this.searchKey = this.searchKey.filter(item => item !== data)

      // 把搜索的关键字存起来,并且监听存在本地存储中
      this.searchKey.unshift(data)
      console.log(data)
      // 跳转
      setTimeout(() => {
        this.$router.push({ path: '/post/', query: { id: dataId } })
      }, 50)
    }
  },
  watch: {
    searchKey: {
      deep: true,
      handler(value) {
        localStorage.setItem('searchKey', JSON.stringify(this.searchKey))
      }
    },
    keyword(value) {
      if (value === '') {
        this.thinkData = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .search_head {
    padding: 0 15px;
    height: 52px;
    line-height: 52px;
    font-size: 22px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #1989fa;
    color: #fff;

    input {
      width: 70%;
      height: 38px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 38px;
      border: none;
      padding: 0 10px;
      font-size: 16px;
    }
    input::placeholder {
      color: rgba(255, 255, 255);
    }
    .sou {
      font-size: 16px;
    }
  }
  p {
    font-size: 18px;
    font-weight: 700;
  }
  .think_list {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    background-color: #fff;
    .list {
      height: 52px;
      line-height: 52px;
    }
  }
  .history,
  .hot_search {
    padding: 0 15px;
    margin: 15px 0;
    p {
      margin-bottom: 10px;
    }
    .items {
      display: inline-block;
      width: 60px;
      height: 32px;
      font-size: 16px;
      text-align: center;
      line-height: 32px;
      background-color: #eee;
      margin-right: 8px;
    }
  }
  .hot_search {
    .items {
      width: auto;
      padding: 0 8px;
    }
  }
}
</style>
