<template>
    <div>
        <el-dialog :title="addInfo.isAdd?'添加菜单':'编辑菜单'" :visible.sync="addInfo.isShow" center :before-close='cancel'>
            <el-form :model="menu" :rules="rules" ref="ruleForm">
                <el-form-item label="菜单名称：" prop='title' :label-width="formLabelWidth">
                    <el-input v-model="menu.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单：" prop='pid' :label-width="formLabelWidth">
                    <el-select v-model="menu.pid" placeholder="请选择上级菜单">
                        <el-option label='顶级菜单' :value="0">
                        </el-option>
                        <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单类型：" :label-width="formLabelWidth">
                    <el-radio v-model="menu.type" :label="1">目录</el-radio>
                    <el-radio v-model="menu.type" :label="2">菜单</el-radio>
                </el-form-item>
                <el-form-item v-if="menu.type==1" label="菜单图标：" :label-width="formLabelWidth">
                    <!-- icon图标 -->
                    <el-select v-model="menu.icon" placeholder="请选择上级菜单">
                        <el-option v-for="item in iconList" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else label="菜单地址：" :label-width="formLabelWidth">
                    <!-- path地址 -->
                    <el-select v-model="menu.url" placeholder="请选择上级菜单">
                        <el-option v-for="item in indexRouters" :key="item.path" :label="item.name" :value="item.path">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-switch v-model="menu.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2">
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
// 引入二级路由配置项
import { indexRouters } from "../../router";
// 引入接口文件
import { addMenu,getInfo,editMenu } from "../../util/axios";
import {mapActions,mapGetters} from 'vuex'
export default {
    data() {
        return {
            menu: {
                pid: 0, //上级分类编号
                title: "", //标题
                icon: "", //图标
                type: 1, //类型1目录2菜单
                url: "", //菜单地址
                status: 1, //状态1正常2禁用
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入菜单名称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 6,
                        message: "长度在 2 到 6 个字符",
                        rigger: "blur",
                    },
                ],
                pid: [
                    {
                        required: true,
                        message: "请输入上级菜单",
                        trigger: "change",
                    },
                ],
            },
            formLabelWidth: "120px",
            value: "",
            iconList: ["el-icon-s-tools", "el-icon-s-goods"],
            indexRouters,
        };
    },
    props: ["addInfo"],
    mounted() {},
    computed:{
        ...mapGetters({
            menuList:'menu/getMenuList'
        })
    },
    methods: {
        // 关闭弹框
        cancel() {
            this.$emit("cancel",{
                isShow:false,
                isAdd:this.addInfo.isAdd
            });
            this.reset();
        },
        // 重置内容
        reset() {
            this.menu = {
                pid: 0, //上级分类编号
                title: "", //标题
                icon:'', //图标
                type: 1, //类型1目录2菜单
                url: "", //菜单地址
                status: 1, //状态1正常2禁用
            };
        },
        ...mapActions({
            getMeunList:'menu/getMenuListAction'
        }),
        // 查看一条数据事件
        lookUp(id){
            // console.log(id);
            // 调取查看一条数据接口
            getInfo({id})
            .then(res=>{
                this.menu = res.data.list;
                this.menu.id = id;
            })
        },
        // 编辑菜单
        update(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    editMenu(this.menu)
                    .then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getMeunList()
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
        // 添加菜单
        add(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    addMenu(this.menu)
                    .then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getMeunList()
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
