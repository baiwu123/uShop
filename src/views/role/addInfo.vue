<template>
    <div>
        <!-- 弹框 -->
        <el-dialog :title="addInfo.isAdd?'添加角色':'编辑角色'" :visible.sync="addInfo.isShow" :before-close='cancel' center>
            <el-form :model="roleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop='rolename' label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="roleForm.rolename" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" :label-width="formLabelWidth">
                    <el-tree :data="getMenuList" show-checkbox node-key="id" default-expand-all :props="defaultProps" ref="tree" check-strictly>
                    </el-tree>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="roleForm.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="addInfo.isAdd" type="primary" @click="add('ruleForm')">确 定</el-button>
                <el-button v-else type="primary" @click="update('ruleForm')">编辑</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 引入接口模块
import { addRole,roleInfo,editRole } from "../../util/axios";
export default {
    data() {
        return {
            roleForm: {
                rolename: "",
                menus: "", //角色权限
                status: 1, //状态 1正常 2禁用
            },
            formLabelWidth: "120px",
            rules: {
                rolename: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 8,
                        message: "长度在 2 到 8 个字符",
                        trigger: "blur",
                    },
                ],
            },
            defaultProps: {
                children: "children",
                label: "title",
            },
        };
    },
    props: ["addInfo"],
    mounted() {
        this.getMenuListAction();
    },
    computed: {
        ...mapGetters({
            getMenuList: "menu/getMenuList",
        }),
    },
    methods: {
        ...mapActions({
            getMenuListAction: "menu/getMenuListAction",
            getRoleListAction: "role/getRoleListAction",
        }),
        // 点击取消关闭弹窗
        cancel() {
            this.$emit("cancel", {
                isShow: false,
                isAdd: this.addInfo.isAdd,
            });
            this.reset();
        },
        reset() {
            (this.roleForm = {
                rolename: "",
                menus: "", //角色权限
                status: 1, //状态 1正常 2禁用
            }),
                this.$refs.tree.setCheckedKeys([]);
        },
        // 封装一个添加事件
        add(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.$refs.tree.getCheckedKeys(),'数组');
                    this.roleForm.menus = this.$refs.tree
                        .getCheckedKeys()
                        .join(",");
                    // console.log(this.roleForm);
                    // 调取添加接口
                    addRole(this.roleForm).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getRoleListAction();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 查询一条数据
        lookUp(id){
            roleInfo({id})
            .then(res=>{
                if(res.data.code===200){
                    this.roleForm = res.data.list;
                    this.$refs.tree.setCheckedKeys(res.data.list.menus.split(','));
                    this.roleForm.id = id;
                }else{
                    this.$message.error(res.data.msg)
                }           
            })
        },
        // 更新数据
        update(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.$refs.tree.getCheckedKeys(),'数组');
                    this.roleForm.menus = this.$refs.tree
                        .getCheckedKeys()
                        .join(",");
                    // console.log(this.roleForm);
                    // 调取添加接口
                    editRole(this.roleForm).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getRoleListAction();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="" scoped>
</style>
