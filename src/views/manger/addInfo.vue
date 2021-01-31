<template>
    <div>
        <!-- 弹框 -->
        <el-dialog :title="addInfo.isAdd?'添加管理员':'编辑管理员'" :visible.sync="addInfo.isShow" :before-close='cancel' center>
            <el-form :model="mangerForm" :rules="rules" ref="ruleForm">
                <el-form-item label="所属角色：" prop='roleid' :label-width="formLabelWidth">
                    <el-select v-model="mangerForm.roleid" placeholder="请选择">
                        <el-option v-for="item in getRoleList" :key="item.id" :label="item.rolename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='username' label="用户名称：" :label-width="formLabelWidth">
                    <el-input v-model="mangerForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth">
                    <el-input v-model="mangerForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="mangerForm.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2">
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
import { addManger, mangerInfo, editManger } from "../../util/axios";
export default {
    data() {
        return {
            mangerForm: {
                roleid: "", //角色编号
                username: "", //管理员名称
                password: "", //密码
                status: 1, //状态 1正常 2禁用
            },
            formLabelWidth: "120px",
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 8,
                        message: "长度在 2 到 8 个字符",
                        trigger: "blur",
                    },
                ],
                roleid: [
                    {
                        required: true,
                        message: "请选择所属角色",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    props: ["addInfo"],
    mounted() {
        this.getRoleListAction();
    },
    computed: {
        ...mapGetters({
            getRoleList: "role/getRoleList",
        }),
    },
    methods: {
        ...mapActions({
            getRoleListAction: "role/getRoleListAction",
            getMangerListAction: "manger/getMangerListAction",
            getCountAction:'manger/getCountAction'
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
            this.mangerForm = {
                roleid: "", //角色编号
                username: "", //管理员名称
                password: "", //密码
                status: 1, //状态 1正常 2禁用
            };
            this.$refs['ruleForm'].resetFields();
        },
        // 封装一个添加事件
        add(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 调取添加接口
                    addManger(this.mangerForm).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getMangerListAction();
                            // 重新调取总数
                            this.getCountAction();
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
        lookUp(id) {
            mangerInfo({ uid:id }).then((res) => {
                if (res.data.code === 200) {
                    this.mangerForm = res.data.list;
                    this.mangerForm.uid = id;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 更新数据
        update(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.roleForm);
                    // 调取添加接口
                    editManger(this.mangerForm).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getMangerListAction();
                            this.getCountAction();
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
