<template>
    <div>
        <el-table :data="cateList" border style="width: 100%" row-key="id" default-expand-all :tree-props="{children: 'children'}">
            <el-table-column prop="id" label="分类编号"></el-table-column>
            <el-table-column prop="catename" label="分类名称"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="item">
                    <div v-if="item.row.pid!=0">
                        <img class="image" :src="item.row.img?$imgUrl+item.row.img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2026027467,701626978&fm=26&gp=0.jpg'" alt="">
                    </div>
                    <div v-else>
                    </div>
                </template>
            </el-table-column>
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
import { deleteCate} from "../../util/axios";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            cateList: "cate/getCateList",
        }),
    },
    mounted() {
        this.getCateList();
    },
    methods: {
        ...mapActions({
            getCateList: "cate/getCateListAction",
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
                    deleteCate({ id }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg);
                            this.getCateList();
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
.image{
    width: 100px;
}
</style>
