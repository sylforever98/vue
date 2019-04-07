<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="2"  style="min-height: 100%; overflow: hidden;    background:linear-gradient(130deg, rgb(5, 47, 90) 30%, rgb(2, 14, 35) 100%);">
				<el-menu :default-active="defaultActive" class="sildleft" style="min-height: 100%;  background-color:transparent" theme="dark" router>
				  <h1 class="tith1"><img src="../assets/img/logo.png" width="60"/></h1>
					<el-menu-item index="manage"><i class="el-icon-menu"></i><span>授首页</span></el-menu-item>
					<el-menu-item index="AddDevice"><i class="el-icon-upload"></i><span>授设备管理</span></el-menu-item>
					
					<!-- <el-submenu index="2" >
						<template slot="title"><i class="el-icon-upload"></i><span>授设备管理</span></template>
				  	<el-menu-item index="shopList">VR设备管理</el-menu-item>
						<el-menu-item index="foodList">箱体管理</el-menu-item>
						
						<el-menu-item index="orderList">订单列表</el-menu-item>
						<el-menu-item index="adminList">管理员列表</el-menu-item>
					</el-submenu> -->
						<el-menu-item index="orderList"><i class="el-icon-edit"></i><span>授权管理</span></el-menu-item>
					<!-- <el-menu-item index="3">
						<template slot="title"><i class="el-icon-edit"></i>授权管理</template>
						<el-menu-item index="orderList">授权管理</el-menu-item>
						<el-menu-item index="addShop">授权管理</el-menu-item> 
						<el-menu-item index="addGoods">添加商品</el-menu-item>
					</el-menu-item> -->
						<el-menu-item index="visitor"><i class="el-icon-search"></i><span>查询</span></el-menu-item>
					<!-- <el-menu-item index="3">
					<!-- <el-submenu index="4">
						<template slot="title"><i class="el-icon-search"></i>查询</template>
						<el-menu-item index="visitor">查询</el-menu-item>
						<el-menu-item index="newMember">用户数据</el-menu-item>
					</el-submenu> -->
				  	<el-menu-item index="sendMessage"><i class="el-icon-warning"></i><span>故障管理</span></el-menu-item>
					<!-- <el-submenu index="5">
						<template slot="title"><i class="el-icon-warning"></i>故障管理</template>
						<el-menu-item index="sendMessage">上传图片</el-menu-item>
						<el-menu-item index="vueEdit">故障管理</el-menu-item>
					</el-submenu> -->
					<el-menu-item index="uploadImg"><i class="el-icon-date"></i><span>日志管理</span></el-menu-item>
					<!-- <el-submenu index="6">
						<template slot="title"><i class="el-icon-date"></i>日志管理</template>
						<el-menu-item index="uploadImg">操作员日志管理</el-menu-item>
						<el-menu-item index="sendMessage">学生管理</el-menu-item> 
					</el-submenu> -->
					<!-- <el-submenu index="7">
						<template slot="title"><i class="el-icon-star-on"></i><span>用户管理</span></template>
						<el-menu-item index="adminSet">班级管理</el-menu-item>
						<el-menu-item index="sendMessage">学生管理</el-menu-item>
							<el-menu-item index="userList">学生管理</el-menu-item>
					</el-submenu> -->
						<el-menu-item index="adminSet"><i class="el-icon-star-on"></i><span>用户管理</span></el-menu-item>
					<!-- <el-menu-item index="uploadImg"><i class="el-icon-setting"></i>设置</el-menu-item> -->
					<!-- <el-submenu index="8">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="explain">设置</el-menu-item>
					</el-submenu> -->
				</el-menu>
			</el-col>
			<el-col :span="22" style="height: 100%;overflow: auto;">
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
	.tith1{padding: 10px 0 25px;}
	.sildleft li{ height: auto;  padding:10px 0 5px !important ;}
	.sildleft li span{ display: block; width: 100%; text-align: center; font-size: 12px; height: 30px; line-height: 26px;}
	.sildleft i{ font-size: 22px; display:block;width: 100%; color: #fff;
	}
	.sildleft li.is-active i{ color: #20a0ff;}
</style>
