<template>
    <div>
        <el-table :data="menuList" border style="width: 100%" row-key="id" default-expand-all :tree-props="{children: 'children'}">
            <el-table-column prop="id" label="菜单编号"></el-table-column>
            <el-table-column prop="title" label="菜单名称"></el-table-column>
            <el-table-column prop="pid" label="上级菜单"></el-table-column>
            <el-table-column prop="icon" label="菜单图标"></el-table-column>
            <el-table-column prop="url" label="菜单地址"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if="item.row.status==1" type="success">启用</el-tag>
                        <el-tag v-else type="danger">禁用</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="item">
                    <div>
                        <el-button type="primary" @click="edit(item.row.id)" size="small">编辑</el-button>
                        <el-button type="danger" @click="del(item.row.id)" size="small">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 引入获取菜单列表
import { mapActions, mapGetters } from "vuex";
import { deleteMenu } from "../../util/axios";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            menuList: "menu/getMenuList",
        }),
    },
    mounted() {
        this.getMenuList();
    },
    methods: {
        ...mapActions({
            getMenuList: "menu/getMenuListAction",
        }),
        // 打开编辑弹框
        edit(id) {
            this.$emit("edit", id);
        },
        // 删除数据
        del(id) {
            this.$confirm("确定删除这条信息吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    deleteMenu({ id }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg);
                            this.getMenuList();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
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
