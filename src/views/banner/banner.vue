<template>
    <div>
        <v-bread></v-bread>
        <el-button @click="add" type="primary" plain size='small'>添加</el-button>
        <v-list ref="getId" :addInfo='addInfo' @cancel='cancel'></v-list>
        <!-- table表格 -->
        <v-table @edit='edit'></v-table>
    </div>
</template>

<script>
import vTable from './table'
import vList from './addInfo'
export default {
    data() {
        return {
            addInfo:{
                isShow:false, //控制弹框显示隐藏
                isAdd:true //控制弹框是添加菜单还是编辑菜单，true为添加
            }    
        };
    },
    components:{
        vTable,
        vList
    },
    methods: {
        cancel(e){
            this.addInfo = e;
        },
        add(){
            this.addInfo.isShow = true;
            this.addInfo.isAdd = true;
        },
        // 编辑
        edit(e){
            this.addInfo.isShow = true;
            this.addInfo.isAdd = false;
            // console.log(this.$refs.getId);
            this.$refs.getId.lookUp(e)
        }
    },
};
</script>

<style lang="stylus" scoped>
.el-button{
    margin-bottom 20px
}
</style>
