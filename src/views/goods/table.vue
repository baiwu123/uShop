<template>
    <div>
        <el-table :data="getGoodsList" border style="width: 100%" row-key="id" default-expand-all :tree-props="{children: 'children'}">
            <el-table-column prop="id" label="商品规格"></el-table-column>
            <el-table-column prop="goodsname" label="商品名称"></el-table-column>
            <el-table-column prop="price" label="商品价格"></el-table-column>
            <el-table-column prop="market_price" label="市场价格"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="item">
                    <div>
                        <img class="image" :src="item.row.img?$imgUrl+item.row.img:''" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="是否新品">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if="item.row.isnew==1" type="success">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="是否热卖">
                <template slot-scope="item">
                    <div>
                        <el-tag v-if="item.row.ishot==1" type="success">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
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
        <!-- 分页 -->
        <el-pagination :page-size='getGoodsSize' background layout="prev, pager, next" :total="getCountNum" @current-change="changePage">
        </el-pagination>
    </div>
</template>

<script>
// 引入获取菜单列表
import { mapActions, mapGetters } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
    data() {
        return {};
    },
    mounted() {
        // 组件一加载获取角色列表
        this.getGoodsListAction();
        this.getCountAction();
        // console.log(this.getMangerList,'aaaa');
    },
    computed: {
        ...mapGetters({
            getGoodsList: "goods/getGoodsList",
            getGoodsSize: "goods/getGoodsSize",
            getCountNum:'goods/getCountNum'
        }),
    },
    methods: {
        ...mapActions({
            getGoodsListAction: "goods/getGoodsListAction",
            getCountAction:'goods/getCountAction',
            changePageAction:'goods/changePageAction'
        }),
        // 切换页码
        changePage(n){
            this.changePageAction(n);
        },
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
                    getGoodsDelete({ id }).then((res) => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.msg);
                            this.getGoodsListAction();
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
.image{
    width: 100px;
}
</style>
