<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
             <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-form-item label="箱体ID">
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="管理员姓名">
                    <el-input v-model="formInline.user" placeholder="请输入身份证号码"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="箱体状态">
                    <el-select v-model="formInline.region" placeholder="开锁">
                    <el-option label="开锁" value="shanghai"></el-option>
                    <el-option label="关锁" value="beijing"></el-option>
                    </el-select>
                </el-form-item> -->
                 <el-form-item label="定时轮巡开始时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="定时轮巡结束时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                </el-form>
             <el-button size="big" class="newbnt" @click="handleEdit()">权限</el-button>
            <el-button size="big" @click="handleEdit()" >收回权限</el-button>
            <!-- <el-button size="big" class="delebnt">删除</el-button> -->
            <el-table
                :data="tableData"
                 @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                ref="multipleTable" 
                tooltip-effect="light" 
                style="width: 100%" 
                @selection-change="handleSelectionChange" 
                stripe border fit highlight-current-row
               >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="箱体ID">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="箱体名称">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="授权状态 ">
                        <span>{{ props.row.authstatus }}</span>
                      </el-form-item>
                      <el-form-item label="授权时间 ">
                        <span>{{ props.row.authstatustime }}</span>
                      </el-form-item>
                      <el-form-item label="是否开锁">
                        <span>{{ props.row.phone }}</span>
                      </el-form-item>
                      <el-form-item label="开锁时间">
                        <span>{{ props.row.time }}</span>
                      </el-form-item>
                      <el-form-item label="使用人性名">
                        <span>{{ props.row.username }}</span>
                      </el-form-item>
                      <el-form-item label="使用人身份证编号">
                        <span>{{ props.row.userid }}</span>
                      </el-form-item>
                      <el-form-item label="使用人班级">
                        <span>{{ props.row.userclass }}</span>
                      </el-form-item>
                      <el-form-item label="头盔、手柄与箱体是否一致">
                        <span>{{ props.row.rating }}</span>
                      </el-form-item>
                      <el-form-item label="头盔是否在充电">
                        <span>{{ props.row.recent_order_num }}</span>
                      </el-form-item>
                      <el-form-item label="手柄是否在充电">
                        <span>{{ props.row.category }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                  <el-table-column 
                type="selection" 
                width="55" >
                 </el-table-column>
                <el-table-column
                  label="箱体ID"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="箱体名称"
                  prop="address">
                </el-table-column>
                 <el-table-column
                  label="授权状态"
                  prop="authstatus">
                      <el-switch v-model="form.delivery"></el-switch>
                </el-table-column>
                  <el-table-column
                  label="是否开锁"
                  prop="unlock">
                </el-table-column>
                <el-table-column
                  label="使用人姓名"
                  prop="unlocktime">
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">权限</el-button>
                    <el-button
                      size="mini"
                      type="Success"
                      @click="addFood(scope.$index, scope.row)">收回权限授</el-button>
                    <!-- <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改店铺信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="店铺名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" label-width="100px">
                        <el-autocomplete
                          v-model="address.address"
                          :fetch-suggestions="querySearchAsync"
                          placeholder="请输入地址"
                          style="width: 100%;"
                          @select="addressSelect"
                        ></el-autocomplete>
                        <span>当前城市：{{city.name}}</span>
                    </el-form-item>
                    <el-form-item label="店铺介绍" label-width="100px">
                        <el-input v-model="selectTable.description"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺分类" label-width="100px">
                        <el-cascader
                          :options="categoryOptions"
                          v-model="selectedCategory"
                          change-on-select
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="商铺图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/shop'"
                          :show-file-list="false"
                          :on-success="handleServiceAvatarScucess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateShop">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {cityGuess, getResturants, getResturantsCount, foodCategory, updateResturant, searchplace, deleteResturant,formatGood} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                form: {
                    date1: '',
                    date2: '',
                    delivery: false,
                    },
                formInline: {
                user: '',
                region: ''
                },
                expendRow: [],
            }
        },
        created(){
            this.initData();
            console.log(11111)
        },
    	components: {
    		headTop,
    	},
        methods: {
             formatGood(r, c, v) {
                return  v == '未授权' ? '<img src="../assets/img/redlight.png"   alt="" width="30" height="30">' : 
                       '<img  src="../assets/img/greenlight.png"   alt="" width="30" height="30">'; 
            },
            onSubmit() {
            console.log('submit!');
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            async initData(){
                try{
                    this.city = await cityGuess();
                    const countData = await getResturantsCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getResturants();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getCategory(){
                try{
                    const categories = await foodCategory();
                    categories.forEach(item => {
                        if (item.sub_categories.length) {
                            const addnew = {
                                value: item.name,
                                label: item.name,
                                children: []
                            }
                            item.sub_categories.forEach((subitem, index) => {
                                if (index == 0) {
                                    return
                                }
                                addnew.children.push({
                                    value: subitem.name,
                                    label: subitem.name,
                                })
                            })
                            this.categoryOptions.push(addnew)
                        }
                    })
                }catch(err){
                    console.log('获取商铺种类失败', err);
                }
            },
            async getResturants(){
                const {latitude, longitude} = this.city;
                // const restaurants = await getResturants({latitude, longitude, offset: this.offset, limit: this.limit});
                   const restaurants =
                    [{
                    name: 'cd212121',
                    address:'一号机',
                    authstatus:'已授权',
                    unlock: '未开锁',
                    unlocktime : '无',
                    category_id: '2019-01-12 14:21:10',
                    image_path : 'Jack',
                    specfoods : 'Jack'

            },
            {
                    name: 'cd212122',
                    address:'二号机',
                    authstatus:'已授权',
                    unlock: '未开锁',
                    unlocktime : '无',
                    category_id: '2019-01-12 14:21:10',
                    image_path : 'Jack',
                    specfoods : 'Jack'

            },{
                    name: 'cd212123',
                    address:'三号机',
                    authstatus:'已授权',
                    unlock: '未开锁',
                    unlocktime : '无',
                    category_id: '2019-01-12 14:21:10',
                    image_path : 'Jack',
                    specfoods : 'Jack'
                }];
                this.tableData = [];
                restaurants.forEach(item => {
                    const tableData = {};
                    tableData.name = item.name;
                    tableData.address = item.address;
                    tableData.authstatus = item.authstatus;
                    tableData.unlock = item.unlock;
                    tableData.unlocktime = item.unlocktime;
                    tableData.rating = item.rating;
                    tableData.recent_order_num = item.recent_order_num;
                    tableData.category = item.category;
                    tableData.image_path = item.image_path;
                    this.tableData.push(tableData);
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getResturants()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.address.address = row.address;
                this.dialogFormVisible = true;
                this.selectedCategory = row.category.split('/');
                if (!this.categoryOptions.length) {
                    this.getCategory();
                }
            },
            addFood(index, row){
                this.$router.push({ path: 'addGoods', query: { restaurant_id: row.id }})
            },
            async handleDelete(index, row) {
                try{
                    const res = await deleteResturant(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除店铺成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除店铺失败')
                }
            },
            async querySearchAsync(queryString, cb) {
                if (queryString) {
                    try{
                        const cityList = await searchplace(this.city.id, queryString);
                        if (cityList instanceof Array) {
                            cityList.map(item => {
                                item.value = item.address;
                                return item;
                            })
                            cb(cityList)
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
            },
            expand(row, status){
            	if (status) {
            		this.getSelectItemData(row)
            	}else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
            addressSelect(vale){
                const {address, latitude, longitude} = vale;
                this.address = {address, latitude, longitude};
            },
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            async updateShop(){
                this.dialogFormVisible = false;
                try{
                    Object.assign(this.selectTable, this.address);
                    this.selectTable.category = this.selectedCategory.join('/');
                    const res = await updateResturant(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新店铺信息成功'
                        });
                        this.getResturants();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新餐馆信息失败', err);
                }
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width:200px;
        color: #666;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
        .newbnt{
        background: #20a0ff !important;
        color: #fff !important;
        border-color: #20a0ff !important;
        margin-bottom: 10px;
    }
     .newbnt:hover{
        background: #097bd0 !important;
        color: #fff !important;
        border-color: #097bd0 !important;
    }
    .delebnt{
        background: #ea2e2e !important;
        color: #fff !important;
        border-color: #ea2e2e !important;
        margin-bottom: 10px;
    }
     .delebnt:hover{
      border-color: #d01414 !important;
      background: #d01414 !important;
      color: #fff !important;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .top_bnt{ padding: 10px;}
    .fontcred{ font-weight: 600;color: #d01414}
    .fontcgreen{ font-weight: 600;color:#097bd0}
    .table_topleft{ float: left;}
    .table_topright{float: right; padding-top: 10px; padding-right: 20px;   }
</style>