<template>
  <div class="editab">
    <!-- 通用导航栏 -->
    <hm-header>
      <span slot="title">栏目管理</span>
    </hm-header>
    <!-- 栏目分类 -->
    <div class="list_tab">
      <p>点击删除以下频道</p>
      <div class="addtab">
        <div
          class="tablist"
          v-for="(item,index) in tab"
          :key="item.id"
          @click="deltab(index)"
        >{{item.name}}</div>
      </div>
      <p>点击添加以下频道</p>
      <div class="addtab">
        <div
          class="tablist"
          v-for="(items,index) in addtab"
          :key="items.id"
          @click="add(index)"
        >{{items.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 获取所有标签内容
  async created() {
    //  判断本地是否有值
    const tab = JSON.parse(localStorage.getItem('tab'))
    if (tab) {
      this.tab = JSON.parse(localStorage.getItem('tab'))
      this.addtab = JSON.parse(localStorage.getItem('addtab'))
    } else {
      //  发送请求
      const res = await this.$axios.get(this.baseUrl + '/category')
      console.log(res)
      if (res.data.statusCode === 200) {
        this.tab = res.data.data
      }
    }
    // 把这里的值传给首页
    this.$bus.$emit('tabdata', tab)
  },
  data() {
    return {
      tab: [],
      addtab: []
    }
  },
  methods: {
    deltab(index) {
      if (this.tab.length <= 4) {
        this.$toast('请至少保留4个')
        return
      }
      this.addtab.push(this.tab[index])
      this.tab.splice(index, 1)
    },
    add(index) {
      console.log(index)
      this.tab.push(this.addtab[index])
      this.addtab.splice(index, 1)
    }
  },
  watch: {
    tab: {
      deep: true,
      handler() {
        // 监听数据发生变化后往本地存储中存值
        localStorage.setItem('tab', JSON.stringify(this.tab))
        localStorage.setItem('addtab', JSON.stringify(this.addtab))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list_tab {
  padding: 0 15px;
  p {
    font-size: 14px;
    line-height: 36px;
  }
  .addtab {
    .tablist {
      display: inline-block;
      width: 60px;
      height: 30px;
      background-color: #eee;
      margin: 0 12px;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
      border: 1px solid #cccccc;
      background-color: #fff;
      margin-top: 10px;
    }
  }
}
</style>
