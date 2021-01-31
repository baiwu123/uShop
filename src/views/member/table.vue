<template>
    <div>
        <el-table :data="memberList" border style="width: 100%">
            <el-table-column prop="uid" label="用户编号"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
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
                        <el-button type="primary" @click="edit(item.row.uid)" size="small">编辑</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 引入获取菜单列表
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            memberList: "member/getMemberList"
        }),
    },
    mounted() {
        this.getMemberAction();
    },
    methods: {
        ...mapActions({
            getMemberAction: "member/getMemberListAction"
        }),
        // 打开编辑弹框
        edit(id) {
            this.$emit("edit", id);
        },
    },
};
</script>

<style lang="" scoped>
</style>
