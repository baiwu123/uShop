<template>
    <div>
        <el-dialog :title="addInfo.isAdd?'添加分类':'编辑分类'" :visible.sync="addInfo.isShow" center :before-close='cancel'>
            <el-form :model="cateForm" :rules="rules" ref="ruleForm">
                <el-form-item label="上级分类：" prop='pid' :label-width="formLabelWidth">
                    <el-select v-model="cateForm.pid" placeholder="请选择上级分类">
                        <el-option label='顶级分类' :value="0">
                        </el-option>
                        <el-option v-for="item in getCateList" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称：" prop='catename' :label-width="formLabelWidth">
                    <el-input v-model="cateForm.catename" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="cateForm.pid!=0" label="图片：" prop='catename' :label-width="formLabelWidth">
                    <el-upload action="#" list-type="picture-card" :auto-upload='false' :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="onChange" :file-list="fileList" :limit="1" :on-exceed="handleExceed">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>

                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-switch v-model="cateForm.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2">
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
import { cateInfo, addCate, editCate } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            cateForm: {
                pid: 0, //上级分类编号
                catename: "", //商品分类名称
                img: "", //图片
                status: 1, //状态1正常2禁用
            },
            fileList: [],
            dialogImageUrl: "",
            dialogVisible: false,
            imgUrl: "", //文件图片的配置对象
            rules: {
                catename: [
                    {
                        required: true,
                        message: "请输入分类名称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 8,
                        message: "长度在 2 到 8 个字符",
                        rigger: "blur",
                    },
                ],
                pid: [
                    {
                        required: true,
                        message: "请输入上级分类",
                        trigger: "change",
                    },
                ],
            },
            formLabelWidth: "120px",
        };
    },
    props: ["addInfo"],
    mounted() {},
    computed: {
        ...mapGetters({
            getCateList: "cate/getCateList",
        }),
    },
    methods: {
        // 文件上传触发的钩子函数
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        // 文件改变时触发的函数
        onChange(file) {
            this.imgUrl = file.raw;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
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
            this.cateForm = {
                pid: 0, //上级分类编号
                catename: "", //商品分类名称
                img: "", //图片
                status: 1, //状态1正常2禁用
            };
        },
        ...mapActions({
            getCateListAction: "cate/getCateListAction",
        }),
        // 查看一条数据事件
        lookUp(id) {
            // console.log(id);
            // 调取查看一条数据接口
            cateInfo({ id }).then((res) => {
                this.cateForm = res.data.list;
                this.cateForm.id = id;
                // 查询数据给fileList赋值
                this.fileList = this.cateForm.img
                    ? [{ url: this.$imgUrl + this.cateForm.img }]
                    : "";
            });
        },
        // 编辑分类
        update(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 针对图片进行判断
                    this.cateForm.img = this.imgUrl
                        ? this.imgUrl
                        : this.cateForm.img;
                    // 对于有上传文件的数据，需要使用构造函数FormData去转换
                    let file = new FormData();
                    // 循环添加对象
                    for (let i in this.cateForm) {
                        file.append(i, this.cateForm[i]);
                    }
                    editCate(file).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getCateListAction();
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
        // 添加分类
        add(formName) {
            // console.log(this.cateForm,'表单体');
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.cateForm.img = this.imgUrl;
                    // 对于有上传文件的数据，需要使用构造函数FormData去转换
                    // let file = new FormData();
                    // // 循环添加对象
                    // for (let i in this.cateForm) {
                    //     file.append(i, this.cateForm[i]);
                    // }
                    addCate(this.cateForm).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getCateListAction();
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
