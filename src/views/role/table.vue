<template>
    <div>
        <!-- table表格 -->
        <el-table :data="getRoleList" border style="width: 100%">
            <el-table-column prop="id" label="角色编号" width="180">
            </el-table-column>
            <el-table-column prop="rolename" label="角色名称" width="180">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if="item.row.status" type="success">启用</el-tag>
                        <el-tag v-else type="danger">禁用</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="item">
                    <div>
                        <el-button @click="edit(item.row.id)" type="primary" size="small">编辑</el-button>
                        <el-button @click="del(item.row.id)" type="danger" size="small">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 调取接口
import { deleteRole } from "../../util/axios";
export default {
    data() {
        return {};
    },
    mounted() {
        // 组件一加载获取角色列表
        this.getRoleListAction();
        // console.log(this.getRoleList,'aaaa');
    },
    computed: {
        ...mapGetters({
            getRoleList: "role/getRoleList",
        }),
    },
    methods: {
        ...mapActions({
            getRoleListAction: "role/getRoleListAction",
        }),
        // 点击编辑打开弹框
        edit(id) {
            this.$emit("edit", id);
        },
        // 删除操作
        del(id) {
            this.$confirm("你确定要删除此条信息吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    deleteRole({id})
                    .then(res=>{
                        if(res.data.code===200){
                            this.$message.success(res.data.msg);
                            this.getRoleListAction();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
};
</script>

<style lang="" scoped>
</style>
