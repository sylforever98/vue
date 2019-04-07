<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-menu :default-active="defaultActive"  class="el-menu-demo" mode="horizontal"  theme="dark" router>
                <el-menu-item index="shopList" default-active>VR设备管理</el-menu-item>
                 <el-menu-item index="foodList">箱体管理</el-menu-item>
            </el-menu>
        <div class="table_container">
            <el-button size="big" class="newbnt" @click="handleEdit()">新建</el-button>
            <el-button size="big" @click="toggleSelection(tableData)">全选</el-button>
            <!-- <el-button @click="toggleSelection()" :disabled="multipleSelection.length == 0">取消选择</el-button> -->
            <el-button size="big" class="delebnt">删除</el-button>
              <p class="table_topright">Hi，共有箱体 <span class="fontcred">32</span> 台箱体。</p>
            <el-table
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                ref="multipleTable" 
                :data="tableData" 
                tooltip-effect="light" 
                style="width: 100%" 
                @selection-change="handleSelectionChange" 
                stripe border fit highlight-current-row
                >
                <el-table-column 
                type="selection" 
                width="55" >
                 </el-table-column>
                <el-table-column
                  label="箱体ID"
                  width="110px"
                  prop="item_id">
                </el-table-column>
                <el-table-column
                  label="箱体名称"
                  prop="name">
                </el-table-column>
                 <el-table-column
                  label="图标"
                  prop="description">
                </el-table-column>
                <!-- <el-table-column
                  label="箱体是否连接"
                  prop="month_sales">
                </el-table-column> -->
                <el-table-column
                prop="month_sales"
                label="VR是否连接"
                sortable
                align="center"
                width="180">
                   <template slot-scope="scope">
                      <span v-if="scope.row.month_sales==0">是</span>
                      <span v-if="scope.row.month_sales==1">否</span>
                   </template>
                </el-table-column>
                <el-table-column
                  label="授权状态"
                  prop="restaurant_id"

                  >
                      
        
                </el-table-column>
                
                <el-table-column label="操作" width="160">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            <el-dialog title="修改箱体信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="箱体名称" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="箱体装态" label-width="100px">
	                    <el-select v-model="selectIndex" :placeholder="selectMenu.label" @change="handleSelect">
						    <el-option
						      v-for="item in menuOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.index">
						    </el-option>
						</el-select>
                    </el-form-item>
                    <el-form-item label="箱体图片" label-width="100px">
                        <el-upload
                          class="avatar-uploader"
                          :action="baseUrl + '/v1/addimg/food'"
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
                <el-button type="primary" @click="updateFood">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail} from '@/api/getData'
    // import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'

    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                restaurant_id: null,
                city: {},
                offset: 0,
                limit: 10,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
                specsForm: {
		          	specs: '',
		          	packing_fee: 0,
		          	price: 20,
		        },
                specsFormrules: {
		        	specs: [
						{ required: true, message: '请输入规格', trigger: 'blur' },
					],
		        },
		        specsFormVisible: false,
                expendRow: [],
            }
        },
        created(){
        	this.restaurant_id = this.$route.query.restaurant_id;
            this.initData();
        },
        computed: {
            defaultActive: function(){
				return this.$route.path.replace('/', '');
			},
        	specs: function (){
        		let specs = [];
        		if (this.selectTable.specfoods) {
	        		this.selectTable.specfoods.forEach(item => {
	        			specs.push({
	        				specs: item.specs_name,
	        				packing_fee: item.packing_fee,
	        				price: item.price,
	        			})
	        		})
        		}
        		return specs
        	}
        },
    	components: {
    		headTop,
    	},
        methods: {
            // formatGood(r, c, v) {
            //     return  v == '未授权' ? '<img src="../assets/img/redlight.png"   alt="" width="30" height="30">' : 
            //            '<img  src="../assets/img/greenlight.png"   alt="" width="30" height="30">'; 
            // },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            async initData(){
                try{
                    const countData = await getFoodsCount({restaurant_id: this.restaurant_id});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getFoods();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            async getMenu(){
            	this.menuOptions = [];
                try{
                    const menu = await getMenu({restaurant_id: this.selectTable.restaurant_id, allMenu: true});
                    menu.forEach((item, index) => {
                        this.menuOptions.push({
                        	label: item.name,
                        	value: item.id,
                        	index,
                        })
                    })
                }catch(err){
                    console.log('获取食品种类失败', err);
                }
            },
            async getFoods(){
                // const Foods = await getFoods({offset: this.offset, limit: this.limit, restaurant_id: this.restaurant_id});
                 const Foods =
                    [{
                    name: '一号机器',
                    item_id:'cd323222',
                    description: '../images/ico1.png',
                    rating: '一号机器',
                    month_sales : '0',
                    restaurant_id : '已授权',
                    category_id: 'Jack',
                    image_path : 'Jack',
                    specfoods : 'Jack'

            },
            {
                    name: '二号机器',
                    item_id:'cd323222',
                    description: '../images/ico1.png',
                    rating: '二号机器',
                    month_sales : '1',
                    restaurant_id : '故障',
                    category_id: 'Jack',
                    image_path : 'Jack',
                    specfoods : 'Jack'

            },{
                name: '三号机器',
                item_id:'cd323220',
                description: '../images/redlight.png',
                rating: '三号机器',
                month_sales : '1',
                restaurant_id : '未授权',
                category_id: 'Jack',
                image_path : 'Jack',
                specfoods : 'Jack'
                }];
                this.tableData = [];
                Foods.forEach((item, index) => {
                    const tableData = {};
                    tableData.item_id = item.item_id;
                    tableData.name = item.name;
                    tableData.description = item.description;
                    tableData.rating = item.rating;
                    tableData.month_sales = item.month_sales;
                    tableData.restaurant_id = item.restaurant_id;
                    tableData.category_id = item.category_id;
                    tableData.image_path = item.image_path;
                    tableData.specfoods = item.specfoods;
                    tableData.index = index;
                    this.tableData.push(tableData);
                    // const tableData = {};
                    // tableData.name = '一号机器';
                    // tableData.item_id = 'cd001001';
                    // tableData.description = '../images/ico.png';
                    // tableData.rating = '';
                    // tableData.month_sales = '正常';
                    // tableData.restaurant_id = item.restaurant_id;
                    // tableData.category_id = item.category_id;
                    // tableData.image_path = item.image_path;
                    // tableData.specfoods = item.specfoods;
                    // tableData.index = index;
                    // this.tableData.push(tableData);
                })
            },
            tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
		    addspecs(){
				this.specs.push({...this.specsForm});
				this.specsForm.specs = '';
				this.specsForm.packing_fee = 0;
				this.specsForm.price = 20;
				this.specsFormVisible = false;
			},
			deleteSpecs(index){
				this.specs.splice(index, 1);
			},
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getFoods()
            },
            
            expand(row, status){
            	if (status) {
            		this.getSelectItemData(row)
            	}else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
            handleEdit(row) {
            	this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            async getSelectItemData(row, type){
            	const restaurant = await getResturantDetail(row.restaurant_id);
            	const category = await getMenuById(row.category_id)
                this.selectTable = {...row, ...{restaurant_name: restaurant.name, restaurant_address: restaurant.address, category_name: category.name}};

                this.selectMenu = {label: category.name, value: row.category_id}
                this.tableData.splice(row.index, 1, {...this.selectTable});
                this.$nextTick(() => {
                    this.expendRow.push(row.index);
                })
                if (type == 'edit' && this.restaurant_id != row.restaurant_id) {
                	this.getMenu();
                }
            },
            handleSelect(index){
            	this.selectIndex = index;
            	this.selectMenu = this.menuOptions[index];
            },
            async handleDelete(index, row) {
                try{
                    const res = await deleteFood(row.item_id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除食品成功'
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
                    console.log('删除食品失败')
                }
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
            async updateFood(){
                this.dialogFormVisible = false;
                try{
                	const subData = {new_category_id: this.selectMenu.value, specs: this.specs};
                	const postData = {...this.selectTable, ...subData};
                    const res = await updateFood(postData)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新食品信息成功'
                        });
                        this.getFoods();
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
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
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
    .el-menu-demo{ background: #fff !important; padding-left: 30px; border-bottom: solid 1px #EFF2F7; margin-bottom: 10px; }
    .el-menu-demo .el-menu-item{ color: #000; margin: 0;height: 50px; line-height: 50px;margin-left: 30px;}
    .el-menu-demo .el-menu-item:hover{background: #fff !important;color:#2389f5}
    .el-menu-demo .is-active{color:#2389f5; border-bottom: solid 3px #2389f5;font-weight: bold}
</style>
