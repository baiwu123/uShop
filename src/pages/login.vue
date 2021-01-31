<template>
    <div class="login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input clearable v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
// 引入接口模块
import {userLogin} from '../util/axios'
export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 8,
                        message: "长度在 2 到 8 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "change",
                    },
                    {
                        min: 6,
                        max: 12,
                        message: "长度在 6 到 12 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        ...mapActions(['changeUserInfoAction']),
        login(loginForm) {
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    userLogin(this.loginForm)
                    .then(res=>{
                        // console.log(res);
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            // 把登陆结果存储在会话存储
                            // sessionStorage.setItem('loginInfo',JSON.stringify(res.data.list))
                            // 把登录结果存储到vuex中
                            this.changeUserInfoAction(res.data.list)
                            // 跳转首页
                            this.$router.push('/home')
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.login {
    background-color: $color1;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .demo-ruleForm {
        width: 40vw;
        height: 50vh;
        margin: 25vh auto;
    }
}
</style>
