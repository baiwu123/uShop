<template>
    <div>
        <v-bread></v-bread>
        <el-button @click="toOpen" type="primary" plain size='small'>添加</el-button>
        <!-- 引入table表格 -->
        <v-table @edit="edit"></v-table>
        <!-- 引入弹框 -->
        <v-add ref="vDialog" :addInfo="addInfo" @cancel="cancel"></v-add>
    </div>
</template>

<script>
import vTable from './table'
import vAdd from './addInfo'
export default {
    data() {
        return {
            addInfo:{
                isShow: false, //判断弹框显示隐藏
                isAdd: true //判断是添加还是编辑角色
            }
        };
    },
    components:{
        vTable,
        vAdd
    },
    methods: {
        // 点击按钮打开弹窗
        toOpen(){
            this.addInfo.isShow = true;
            this.addInfo.isAdd = true;
        },
        // 关闭弹窗
        cancel(e){
            this.addInfo = e;
        },
        // 编辑事件
        edit(e){
            this.addInfo.isShow = true;
            this.addInfo.isAdd = false;
            this.$refs.vDialog.lookUp(e);
        }
    },
};
</script>

<style lang="stylus" scoped>
.el-button{
    margin-bottom 20px
}
</style>
