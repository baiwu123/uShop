<template>
    <div>
        <el-dialog :title="addInfo.isAdd?'添加秒杀管理':'编辑秒杀管理'" :visible.sync="addInfo.isShow" center :before-close='cancel'>
            <el-form :model="seck" :rules="rules" ref="ruleForm">
                <el-form-item label="活动名称：" prop='title' :label-width="formLabelWidth">
                    <el-input v-model="seck.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动期限：" :label-width="formLabelWidth">
                    <el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="一级分类：" :label-width="formLabelWidth" >
                    <el-select v-model="seck.first_cateid" placeholder="请选择" @change="changeCate(false)">
                        <!-- 调取分类列表接口 -->
                        <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类：" :label-width="formLabelWidth">
                    <el-select v-model="seck.second_cateid" placeholder="请选择" @change="changeGoods(false)">
                        <el-option v-for="item in secondArr" :key="item.id" :label="item.catename" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品：" :label-width="formLabelWidth">
                    <el-select v-model="seck.goodsid" placeholder="请选择">
                        <el-option v-for="item in goodsArr" :key="item.id" :label="item.goodsname" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-switch v-model="seck.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="2">
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
import { getSeckAdd, getSeckInfo, getSeckEdit,getGoodsList } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            seck: {
                title:"",//限时秒杀名称
                begintime:"",//开始时间
                endtime:"",//结束时间
                first_cateid:"",//商品一级分类编号
                second_cateid:"",//商品二级分类编号
                goodsid:"",//商品编号
                status: 1, //状态1正常2禁用
            },
            timer:'',
            secondArr:[], //二级分类数据
            goodsArr:[], //商品数组
            rules: {
                title: [
                    {
                        required: true,
                        message: "请输入秒杀名称",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 10,
                        message: "长度在 2 到 10 个字符",
                        rigger: "blur",
                    },
                ]
            },
            formLabelWidth: "120px",
            value: "",
            indexRouters,
        };
    },
    props: ["addInfo"],
    mounted() {
        this.getCateListAction();
    },
    computed: {
        ...mapGetters({
            cateList: "cate/getCateList",
        }),
    },
    methods: {
        // 一级分类切换事件
        changeCate(n){
            let index = this.cateList.findIndex(item=>this.seck.first_cateid == item.id)
            this.secondArr = this.cateList[index].children
            // 清空二级分类双向数据绑定
            if(!n){
                this.seck.second_cateid = ""
                this.seck.goodsid = ''
            }
            
        },
        // 切换商品事件
        changeGoods(n){
            // 调取商品列表接口
            getGoodsList({
                fid:this.seck.first_cateid,
                sid:this.seck.second_cateid
            })
            .then(res=>{
                // console.log(res,'商品列表');
                if(res.data.code==200){
                    this.goodsArr = res.data.list ? res.data.list : []
                }
            })
            if(!n){
                this.seck.goodsid = ''
            }
            
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
            this.seck = {
                title:"",//限时秒杀名称
                begintime:"",//开始时间
                endtime:"",//结束时间
                first_cateid:"",//商品一级分类编号
                second_cateid:"",//商品二级分类编号
                goodsid:"",//商品编号
                status: 1, //状态1正常2禁用
            };
            this.$refs['ruleForm'].resetFields();
        },
        ...mapActions({
            getSeckListAction: "seck/getSeckListAction",
            getCateListAction: "cate/getCateListAction",
        }),
        // 查看一条数据事件
        lookUp(id) {
            // console.log(id);
            // 调取查看一条数据接口
            getSeckInfo({ id }).then((res) => {
                if(res.data.code == 200){
                    this.seck = res.data.list
                    this.seck.id = id
                    // 把时间进行转换
                    this.timer = [new Date(parseFloat(this.seck.begintime)) , new Date(parseFloat(this.seck.endtime))]
                    // 重新调取一级分类和商品
                    this.changeCate(true)
                    this.changeGoods(true)
                }
            });
        },
        // 编辑秒杀
        update(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    getSeckEdit(this.seck).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getSeckListAction();
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
        // 添加秒杀
        add(formName) {
            console.log(this.seck,'秒杀表单');
            this.seck.begintime = new Date(this.timer[0]).getTime()
            this.seck.endtime = new Date(this.timer[1]).getTime()
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    getSeckAdd(this.seck).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.cancel();
                            this.getSeckListAction();
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
