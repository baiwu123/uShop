<template>
    <div>
        <!-- 弹框 -->
        <el-dialog :title="addInfo.isAdd?'添加规格':'编辑规格'" :visible.sync="addInfo.isShow" :before-close='cancel' center>
            <el-form :model="specsForm" :rules="rules" ref="ruleForm">
                <el-form-item prop='specsname' label="规格名称：" :label-width="formLabelWidth">
                    <el-input v-model="specsForm.specsname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性：" :label-width="formLabelWidth">
                    <el-input class='inpClass' v-model="item.value" autocomplete="off"></el-input>
                    <el-button v-if="index==0" @click="addAttr" type="primary">新增规格属性</el-button>
                    <el-button v-else @click="delAttr(item)" type="danger">删除</el-button>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-switch v-model="specsForm.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2">
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
import { mapActions } from "vuex";
// 引入接口模块
import { getSpecsAdd, getSpecsEdit, getSpecsInfo } from "../../util/axios";
export default {
    data() {
        return {
            // 动态表单项
            attrArr: [
                {
                    value: "",
                },
            ],
            specsForm: {
                specsname: "", //规格名称
                attrs: "", //商品规格属性值
                status: 1, //状态 1正常 2禁用
            },
            formLabelWidth: "120px",
            rules: {
                specsname: [
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
            },
        };
    },
    props: ["addInfo"],
    methods: {
        // 动态添加表单项
        addAttr() {
            if (this.attrArr.length <= 6) {
                this.attrArr.push({
                    value: "",
                });
            } else {
                this.$message.warning("最多只能添加6个输入框");
            }
        },
        // 删除表单项
        delAttr(item) {
            var index = this.attrArr.indexOf(item);
            if (index !== -1) {
                this.attrArr.splice(index, 1);
            }
        },
        ...mapActions({
            getSpecsListAction: "specs/getSpecsListAction",
            getCountAction: "manger/getCountAction",
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
            this.specsForm = {
                specsname: "", //规格名称
                attrs: "", //商品规格属性值
                status: 1, //状态 1正常 2禁用
            };
            this.attrArr = [
                {
                    value: "",
                },
            ],
            this.$refs["ruleForm"].resetFields();
        },
        // 封装一个添加事件
        add(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.specsForm.attrs = this.attrArr.map(item=>item.value).join(",");
                    // 调取添加接口
                    getSpecsAdd(this.specsForm).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getSpecsListAction();
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
            getSpecsInfo({ id }).then((res) => {
                if (res.data.code === 200) {
                    this.specsForm = res.data.list[0];
                    this.specsForm.id = id;
                    // 循环数组
                    this.specsForm.attrs.map((item,index)=>{
                        if(index===0){
                            this.attrArr[0].value = item
                        }else{
                            this.attrArr.push({
                                value:item
                            })
                        }
                    })
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        // 更新数据
        update(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.specsForm.attrs = this.attrArr.map(item=>item.value).join(",");
                    // console.log(this.roleForm);
                    // 调取添加接口
                    getSpecsEdit(this.specsForm).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getSpecsListAction();
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
.inpClass {
    width: 70%;
}
</style>
