<template>
    <div>
        <el-dialog :title="addInfo.isAdd?'添加会员':'编辑会员'" :visible.sync="addInfo.isShow" center :before-close='cancel'>
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="手机号：" prop='phone' :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="nickname" label="昵称:" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="addInfo.isAdd" @click="add('ruleForm')" type="primary">确 定</el-button>
                <el-button v-else @click="update('ruleForm')" type="primary">编辑</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 引入接口文件
import { getMemberInfo, getMemberEdit } from "../../util/axios";
import { mapActions } from "vuex";
export default {
    data() {
        return {
            form: {
                nickname: "", // 昵称
                phone: "", //手机号
                password: "", //密码
                status: 1, //状态1正常2禁用
            },
            rules: {
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                ],
            },
            formLabelWidth: "120px",
        };
    },
    props: ["addInfo"],
    mounted() {},
    computed: {
    },
    methods: {
        // 关闭弹框
        cancel() {
            this.$emit("cancel", {
                isShow: false,
                isAdd: this.addInfo.isAdd,
            });
            this.reset();
        },
        // 重置内容
        reset() {
            this.form = {
                nickname: "", // 昵称
                phone: "", //手机号
                password: "", //密码
                status: 1, //状态1正常2禁用
            };
            this.$refs['ruleForm'].resetFields();
        },
        ...mapActions({
            getMemberList: "member/getMemberListAction",
        }),
        // 查看一条数据事件
        lookUp(uid) {
            // console.log(id);
            // 调取查看一条数据接口
            getMemberInfo({ uid }).then((res) => {
                this.form = res.data.list;
                this.form.uid = uid;
            });
        },
        // 编辑会员
        update(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    getMemberEdit(this.form).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getMemberList();
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
};
</script>

<style lang="" scoped>
</style>
