<template>
    <div>
        <el-dialog :title="addInfo.isAdd?'添加商品':'编辑商品'" :visible.sync="addInfo.isShow" center :before-close='cancel' @opened='createEditor'>
            <el-form :model="goodsForm" :rules="rules" ref="ruleForm">
                <el-form-item label="一级分类：" prop='first_cateid' :label-width="formLabelWidth">
                    <el-select v-model="goodsForm.first_cateid" @change="changeCate" placeholder="请选择">
                        <el-option v-for="item in getCateList" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类：" prop='second_cateid' :label-width="formLabelWidth">
                    <el-select v-model="goodsForm.second_cateid" placeholder="请选择">
                        <el-option v-for="item in secondCate" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称：" prop='goodsname' :label-width="formLabelWidth">
                    <el-input v-model="goodsForm.goodsname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品价格：" prop='price' :label-width="formLabelWidth">
                    <el-input v-model="goodsForm.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="市场价格：" prop='market_price' :label-width="formLabelWidth">
                    <el-input v-model="goodsForm.market_price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片：" :label-width="formLabelWidth">
                    <el-upload action="#" list-type="picture-card" :auto-upload='false' :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="onChange" :file-list="fileList" :limit="1" :on-exceed="handleExceed">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="商品规格：" prop='specsid' :label-width="formLabelWidth">
                    <el-select v-model="goodsForm.specsid" @change='changeSpecs' placeholder="请选择">
                        <el-option v-for="item in getSpecsList" :key="item.id" :label="item.specsname" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格属性：" prop='specsattr' :label-width="formLabelWidth">
                    <el-select v-model="goodsForm.specsattr" :multiple='true' placeholder="请选择">
                        <el-option v-for="item in specsArr" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否新品：" :label-width="formLabelWidth">
                    <el-radio v-model="goodsForm.isnew" :label="1">是</el-radio>
                    <el-radio v-model="goodsForm.isnew" :label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="是否热卖：" :label-width="formLabelWidth">
                    <el-radio v-model="goodsForm.ishot" :label="1">是</el-radio>
                    <el-radio v-model="goodsForm.ishot" :label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-switch v-model="goodsForm.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2">
                    </el-switch>
                </el-form-item>
                <el-form-item label="商品描述：" :label-width="formLabelWidth">
                    <div id='editor'></div>
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
// 引入wangeditor
import E from "wangeditor";
// 引入二级路由配置项
import { indexRouters } from "../../router";
// 引入接口文件
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            goodsForm: {
                first_cateid: "", //一级分类编号
                second_cateid: "", //二级分类编号
                goodsname: "", //商品名称
                price: "", //商品价格
                market_price: "", //市场价格
                img: "", //商品图片（文件）
                description: "", //商品描述
                specsid: "", //商品规格编号
                specsattr: [], //商品规格属性
                isnew: 1, //是否新品
                ishot: 1, //是否热卖推荐
                status: 1, //状态1正常2禁用
            },
            fileList: [],
            dialogImageUrl: "",
            dialogVisible: false,
            imgUrl: "", //文件图片的配置对象
            secondCate: [], //二级分类数组
            specsArr: [], //商品规格属性数组
            editor: null,
            rules: {
                first_cateid: [
                    {
                        required: true,
                        message: "请选择一级分类",
                        trigger: "change",
                    },
                ],
                second_cateid: [
                    {
                        required: true,
                        message: "请选择二级分类",
                        trigger: "change",
                    },
                ],
                goodsname: [
                    {
                        required: true,
                        message: "请输入商品名称",
                        trigger: "change",
                    },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在 2 到 20 个字符",
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        message: "请输入商品价格",
                        trigger: "change",
                    },
                ],
                market_price: [
                    {
                        required: true,
                        message: "请输入市场价格",
                        trigger: "change",
                    },
                ],
                specsid: [
                    {
                        required: true,
                        message: "请选择商品规格",
                        trigger: "change",
                    },
                ],
                specsattr: [
                    {
                        required: true,
                        message: "请选择规格属性",
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
    computed: {
        ...mapGetters({
            getCateList: "cate/getCateList", //分类列表
            getSpecsList: "specs/getSpecsList", //分类列表
            getGoodsList: "goods/getGoodsList",
        }),
    },
    mounted() {
        //商品列表一触发就调用列表
        //分类列表行动
        // 减少与服务器交互
        if(this.cateList){
            this.getCateListAction();
        }       
        //规格列表行动
        this.getSpecsListAction();
        this.getGoodsListAction();
    },
    methods: {
        // 创建编辑
        createEditor() {
            // 实例化编辑器的构造函数
            this.editor = new E("#editor");
            // 清空多次实例化创建
            // this.editor = this.editor.txt.html(this.goodsForm.description);
            
            // 初始化创建
            this.editor.create();
            this.editor.txt.html(this.goodsForm.description);
        },
        // 封装一个一级分类切换
        changeCate() {
            // console.log(this.goodsForm.first_cateid,'一级分类id');
            let index = this.getCateList.findIndex(
                (item) => this.goodsForm.first_cateid == item.id
            );
            this.secondCate = this.getCateList[index].children;
            this.goodsForm.second_cateid = "";
        },
        // 商品规格切换
        changeSpecs() {
            // console.log(this.goodsForm.specsid,'商品规格id');
            let index = this.getSpecsList.findIndex(
                (item) => this.goodsForm.specsid == item.id
            );
            this.specsArr = this.getSpecsList[index].attrs;
            this.goodsForm.specsattr = "";
        },
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
            this.goodsForm = {
                first_cateid: "", //一级分类编号
                second_cateid: "", //二级分类编号
                goodsname: "", //商品名称
                price: "", //商品价格
                market_price: "", //市场价格
                img: "", //商品图片（文件）
                description: "", //商品描述
                specsid: "", //商品规格编号
                specsattr: [], //商品规格属性
                isnew: 1, //是否新品
                ishot: 1, //是否热卖推荐
                status: 1, //状态1正常2禁用
            };
            this.$refs['ruleForm'].resetFields();
            this.editor = this.editor.txt.html("");
            this.fileList = [];
        },
        ...mapActions({
            getCateListAction: "cate/getCateListAction",
            getSpecsListAction: "specs/getSpecsListAction",
            getGoodsListAction: "goods/getGoodsListAction",
            getCountAction: "goods/getCountAction",
        }),
        // 查看一条数据事件
        lookUp(id) {
            // console.log(id);
            // 调取查看一条数据接口
            getGoodsInfo({ id }).then((res) => {
                this.goodsForm = res.data.list;
                this.goodsForm.id = id;
                this.fileList = this.goodsForm.img
                    ? [{ url: this.$imgUrl + this.goodsForm.img }]
                    : [];
                this.goodsForm.specsattr = this.goodsForm.specsattr.split(",");
                if (this.editor) {
                    this.editor.txt.html(this.goodsForm.description);
                }
            });
        },
        // 编辑商品
        update(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(this.goodsForm, "表单体");
                if (valid) {
                    this.goodsForm.img = this.imgUrl;
                    this.goodsForm.description = this.editor.txt.html();
                    this.goodsForm.specsattr = this.goodsForm.specsattr
                        ? this.goodsForm.specsattr.join(",")
                        : [];
                    // 对于有上传文件的数据，需要使用构造函数FormData去转换
                    let file = new FormData();
                    // 循环添加对象
                    for (let i in this.goodsForm) {
                        file.append(i, this.goodsForm[i]);
                    }
                    getGoodsEdit(file).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getGoodsListAction();
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
        // 添加商品
        add(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(this.goodsForm, "表单体");
                // 取出富文本编辑器的内容

                if (valid) {
                    this.goodsForm.img = this.imgUrl;
                    this.goodsForm.description = this.editor.txt.html();
                    this.goodsForm.specsattr = this.goodsForm.specsattr
                        ? this.goodsForm.specsattr.join(",")
                        : "";
                    // 对于有上传文件的数据，需要使用构造函数FormData去转换
                    let file = new FormData();
                    // 循环添加对象
                    for (let i in this.goodsForm) {
                        file.append(i, this.goodsForm[i]);
                    }
                    getGoodsAdd(file).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getGoodsListAction();
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
