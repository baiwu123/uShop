<template>
    <div>
        <!-- table表格 -->
        <el-table :data="getMangerList" border style="width: 100%">
            <el-table-column prop="uid" label="用户编号" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名称" width="180">
            </el-table-column>
            <el-table-column prop="rolename" label="所属角色" width="180">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="item">
                    <div>
                        <el-button @click="edit(item.row.uid)" type="primary" size="small">编辑</el-button>
                        <el-button @click="del(item.row.uid)" type="danger" size="small">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-size='getMangerSize' background layout="prev, pager, next" :total="getCountNum" @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 调取接口
import { deleteManger } from "../../util/axios";
export default {
    data() {
        return {};
    },
    mounted() {
        // 组件一加载获取角色列表
        this.getMangerListAction();
        this.getCountAction();
        // console.log(this.getMangerList,'aaaa');
    },
    computed: {
        ...mapGetters({
            getMangerList: "manger/getMangerList",
            getMangerSize: "manger/getMangerSize",
            getCountNum:'manger/getCountNum'
        }),
    },
    methods: {
        ...mapActions({
            getMangerListAction: "manger/getMangerListAction",
            getCountAction:'manger/getCountAction',
            changePageAction:'manger/changePageAction'
        }),
        // 切换页码
        changePage(n){
            this.changePageAction(n);
        },
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
                    deleteManger({ uid:id }).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.getMangerListAction();
                            this.getCountAction();
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
