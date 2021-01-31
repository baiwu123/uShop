<template>
    <div>
        <!-- table表格 -->
        <el-table :data="getSpecsList" border style="width: 100%">
            <el-table-column prop="id" label="规格编号" width="180">
            </el-table-column>
            <el-table-column prop="specsname" label="规格名称" width="180">
            </el-table-column>
            <el-table-column label="规格属性" width="180">
                <template slot-scope="item">
                    <div>
                        <el-tag v-for="attr in item.row.attrs" type="info" :key="attr">{{attr}}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if="item.row.status==1" type='success'>启用</el-tag>
                        <el-tag v-else type='danger'>禁用</el-tag>
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
        <!-- 分页 -->
        <el-pagination :page-size='getSpecsSize' background layout="prev, pager, next" :total="getCountNum" @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 调取接口
import { getSpecsDelete } from "../../util/axios";
export default {
    data() {
        return {};
    },
    mounted() {
        // 组件一加载获取角色列表
        this.getSpecsListAction();
        this.getCountAction();
        // console.log(this.getSpecsList,'aaaa');
    },
    computed: {
        ...mapGetters({
            getSpecsList: "specs/getSpecsList",
            getSpecsSize: "specs/getSpecsSize",
            getCountNum:'specs/getCountNum'
        }),
    },
    methods: {
        ...mapActions({
            getSpecsListAction: "specs/getSpecsListAction",
            getCountAction:'specs/getCountAction',
            changePageAction:'specs/changePageAction'
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
                    getSpecsDelete({ id }).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.getSpecsListAction();
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
