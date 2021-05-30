<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avater_box">
        <img src="../assets/img/login/icon.jpg" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form 
      ref="loginFormRef"
      :model="loginForm" 
      :rules="loginFormRules"
      class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
         <el-input v-model="loginForm.username"
         prefix-icon="iconfont icon-tubiaozhizuomoban-"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
         <el-input v-model="loginForm.password"
         prefix-icon="iconfont icon-mimaji"
         type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
         <el-button type="primary" round @click="login">登录</el-button>
         <el-button type="info" round @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() { 
    return {
      // 这是登录表单的数据绑定对象
      loginForm:{
        username: 'admin',
        password: '123456',
      },
      // 这是表单的验证规则对象
      loginFormRules:{
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
           { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {

  },
  components:{

  },
  created() {

  },
  mounted() {

  },
  updated() {

  },
  methods:{
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields();
    },
    login(){
      this.$refs.loginFormRef.validate(valid => {
        if(!valid) return;
        const result=this.$http.post('login',this.loginForm)
        result.then(res=>{
          const data=res.data
          if(data.meta.status !==200) return this.$message.error('登录失败！');
          this.$message.success('登录成功！')

          window.sessionStorage.setItem('token',data.data.token)
          this.$router.push('/home')
        })
      }) 
    }
  },
 }
</script>

<style lang="less" scoped>
.login_container {
  background: url("../assets/img/login/loginbk.jpg") 100% no-repeat fixed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  max-width: 450px;
  max-width: 300px;
  width: 45%;
  height: 35%;
  background:transparent;
  border: 1px solid rgb(32, 70, 118);
  border-radius: 10px;
  box-shadow: 10px 10px 40px;
  transition: all .4s;
  position: relative;

  .avater_box{
    width: 42%;
    height: auto;
    border: 1px solid rgb(32, 70, 118);
    border-radius: 50%;
    padding: 1%;
    box-shadow: 0 0 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: block;
    }
  }
}
.login_box:hover{
  transform: scale(1.2);
}
.login_form{
  position: absolute;
  width: 100%;
  height: 65%;
  padding: 0 5%;
  bottom: 0;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-height: 812px) {
  .login_form{
    height: 75% !important;
  }
  
  .el-button{
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
  }
  .el-button.is-round{
    padding: 0;
  }
}
</style>
<style>
.el-input__inner{
  background-color: transparent;
}
@media screen and (max-height: 812px) {
.el-input__inner{
    height: 30px;
  }
.el-form-item__content{
    margin-bottom: -10px;
  }
}

</style>