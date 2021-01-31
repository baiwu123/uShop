import http from './axios'

// ======================菜单列表=======================

// 获取菜单列表
export function getMenuList(){
    return http.get('/api/menulist?istree=tree')
}
// 添加菜单
export function addMenu(data){
    return http.post('/api/menuadd',data);
}
// 删除菜单
export function deleteMenu(data){
    return http.post('/api/menudelete',data);
}
// 获取一条菜单数据
export function getInfo(params){
    return http.get('/api/menuinfo',{params});
}
// 编辑菜单
export function editMenu(data){
    return http.post('/api/menuedit',data);
}


// ======================角色列表=========================

// 获取角色列表
export function getRoleList(){
    return http.get('/api/rolelist')
}
// 添加角色
export function addRole(data){
    return http.post('/api/roleadd',data);
}
// 删除角色
export function deleteRole(data){
    return http.post('/api/roledelete',data);
}
// 获取一条角色数据
export function roleInfo(params){
    return http.get('/api/roleinfo',{params});
}
// 编辑角色
export function editRole(data){
    return http.post('/api/roleedit',data);
}


// ======================管理员列表=========================

// 获取管理员列表
export function getMangerList(params){
    return http.get('/api/userlist',{params})
}
// 添加管理员
export function addManger(data){
    return http.post('/api/useradd',data);
}
// 删除管理员
export function deleteManger(data){
    return http.post('/api/userdelete',data);
}
// 获取一条管理员数据
export function mangerInfo(params){
    return http.get('/api/userinfo',{params});
}
// 编辑管理员
export function editManger(data){
    return http.post('/api/useredit',data);
}
// 管理员总条数
export function getMangerCount(){
    return http.get('/api/usercount',);
}
// 管理员登录
export function userLogin(data){
    return http.post('/api/userlogin',data);
}


// ======================商品分类列表=========================

// 获取商品分类列表
export function getCateList(){
    return http.get('/api/catelist',{params:{istree:true}})
}
// 添加商品分类
export function addCate(data){
    // 对于有上传文件的数据，需要使用构造函数FormData去转换
    let file = new FormData();
    // 循环添加对象
    for (let i in data) {
        file.append(i, data[i]);
    }
    return http.post('/api/cateadd',file);
}
// 删除商品分类
export function deleteCate(data){
    return http.post('/api/catedelete',data);
}
// 获取一条商品分类数据
export function cateInfo(params){
    return http.get('/api/cateinfo',{params});
}
// 编辑商品分类
export function editCate(data){
    return http.post('/api/cateedit',data);
}


// ======================商品规格列表=========================
//商品规格添加
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
//商品规格列表
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
//商品规格获取（一条）
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
//商品规格修改
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
//商品规格删除
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
//商品规格总数（用于计算分页)
export function getSpecsCount(){
    return http.get('/api/specscount')
}

// ======================商品管理列表=========================
//商品管理添加
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
//商品管理列表
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
//商品管理获取（一条）
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
//商品管理修改
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}
//商品管理删除
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
//商品管理总数（用于计算分页)
export function getGoodsCount(){
    return http.get('/api/goodscount')
}

// ======================会员管理列表=========================
//封装会员管理列表接口
export function getMemberList(){
    return http.get('/api/memberlist')
}
//封装会员管理获取（一条）接口
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
//封装会员管理修改接口
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}

// ======================轮播图管理列表=========================
//封装轮播图添加接口
export function getBannerAdd(data){
    return http.post('/api/banneradd',data)
}
//封装轮播图列表接口
export function getBannerList(){
    return http.get('/api/bannerlist')
}
//封装轮播图获取（一条）接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
//封装轮播图修改接口
export function getBannerEdit(data){
    return http.post('/api/banneredit',data)
}
//封装轮播图删除接口
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}

// ======================限时秒杀列表=========================
//封装限时秒杀添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
//封装限时秒杀列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}
//封装限时秒杀获取（一条）接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
//封装限时秒杀修改接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
//封装限时秒杀删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}




