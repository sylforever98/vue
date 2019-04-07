<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; overflow: hidden;    background:linear-gradient(130deg, rgb(5, 47, 90) 30%, rgb(2, 14, 35) 100%);">
				<el-menu :default-active="defaultActive" style="min-height: 100%;    background-color:transparent" theme="dark" router>
				  <h1 class="tith1">VR设备管理系统</h1>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2" >
						<template slot="title"><i class="el-icon-upload"></i>设备管理</template>
				  	<el-menu-item index="shopList">VR设备管理</el-menu-item>
						<el-menu-item index="foodList">箱体管理</el-menu-item>
						
						<!-- <el-menu-item index="orderList">订单列表</el-menu-item>
						<el-menu-item index="adminList">管理员列表</el-menu-item> -->
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-edit"></i>授权管理</template>
						<el-menu-item index="orderList">授权管理</el-menu-item>
						<!-- <el-menu-item index="addShop">授权管理</el-menu-item> -->
						<!-- <el-menu-item index="addGoods">添加商品</el-menu-item> -->
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-search"></i>查询</template>
						<el-menu-item index="visitor">查询</el-menu-item>
						<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-warning"></i>故障管理</template>
						<el-menu-item index="sendMessage">上传图片</el-menu-item>
						<!-- <el-menu-item index="vueEdit">故障管理</el-menu-item> -->
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-date"></i>日志管理</template>
						<el-menu-item index="uploadImg">操作员日志管理</el-menu-item>
						<!-- <el-menu-item index="sendMessage">学生管理</el-menu-item>  -->
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-star-on"></i>用户管理</template>
						<el-menu-item index="adminSet">班级管理</el-menu-item>
						<!-- <el-menu-item index="sendMessage">学生管理</el-menu-item> -->
							<el-menu-item index="userList">学生管理</el-menu-item>
					</el-submenu>
					<el-submenu index="8">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="explain">设置</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
	}
</style>
