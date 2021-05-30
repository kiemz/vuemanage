<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
  <el-header>
    <div>
      <img src="../assets/img/login/icon.jpg" alt="">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <!-- 页面主体 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="iconfont icon-zhedie toggle-button"
      @click="toggleCollapse"
      :class="{ 'toggle-change': isCollapse }"></div>
      <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409BFF"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="activePath">
      <!-- 一级菜单 -->
      <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
        <!-- 一级菜单的模板区域 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="iconsObj[item.id]"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="'/'+subItem.path" 
        v-for="subItem in item.children" 
        :key="subItem.id"
        @click="saveNavState()">
          <template slot="title">
          <!-- 图标 -->
          <i class="iconfont icon-icon"></i>
          <!-- 文本 -->
          <span>{{subItem.authName}}</span>
        </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <!-- 右侧内容 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Home',
  data() { 
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        '125': "iconfont icon-yonghuguanli",
        '103': "iconfont icon-quanxianguanli",
        '101': "iconfont icon-ziyuan83",
        '102': "iconfont icon-dingdanguanli",
        '145': "iconfont icon-shujutongji",
      },
      isCollapse: false,
      activePath: '',
    }
  },
  props: {

  },
  components:{

  },
  created() {
    this.getMenuList()
  },
  mounted() {

  },
  updated() {
    this.activePath = window.sessionStorage.getItem("activePath")
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push("/login")
    },
    // 获取所有从菜单
    async getMenuList(){
      const{data:res}=await this.$http.get('menus')
      if(res.meta.status !== 200) return this.$message.error(res.meta.status)
      this.menulist = res.data
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(){
      this.activePath = window.sessionStorage.getItem("activePath")
    }
  } 
 }
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display:flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div{
    display: flex;
    align-items: center;
    img{
      height: 60px;
      widows: 60px;
      border-radius: 50%;
    }
    span{
      margin-left: 18px;
    }
    
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}
.toggle-button {
  margin: 0;
  background: linear-gradient(to right,#333744,#76a4b3);
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  color: #8bf3fa;
  cursor: pointer;
}
.toggle-change{
  transform: rotate(180deg);
}
</style>