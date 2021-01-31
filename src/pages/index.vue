<template>
    <div class="index">
        <el-container>
            <el-header>
                <h1>小U商城后台管理系统</h1>
                <div class="userInfo">
                    <span>{{getUserInfo.username}}</span>
                    <el-button @click='quitOut' type='danger' size='mini'>退出登录</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside>
                    <v-aside></v-aside>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vAside from '../components/aside'
export default {
    data() {
        return {
            
        };
    },
    components:{
        vAside
    },
    methods: {
        // 退出事件
        ...mapActions(['changeUserInfoAction']),
        quitOut(){
            // 修改getUserInfo的仓库状态，跳转到登录
            this.changeUserInfoAction(null)
            this.$router.push('/login')
        }
    },
    computed:{
        ...mapGetters(['getUserInfo']),
    }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-container {
    // width: 90vw;
    // margin: 0 auto;

    .el-header {
        background-color: $color2;
        display:flex;
        justify-content:space-between;

        h1 {
            line-height: 60px;
            color: #fff;
            font-size: 22px;
        }
        .userInfo{
            line-height: 60px;
            font-size 16px;
            .el-button{
                margin-left: 10px;
            }
        }
    }

    .el-aside {
        height: 90vh;
        width: 220px !important;
        background-color: #545c64 !important;


        .el-menu {
            width: 220px;
        }
    }
}
</style>
