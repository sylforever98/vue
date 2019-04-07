<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<div class="manage_tip">
				  <h1 class="tith1"><img src="../assets/img/logo1.png" width="80"/></h1>
		  			<p>头戴设备控制与管理系统</p>
		  		</div>
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" class="item_input" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<!-- <p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p> -->
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
	import global_ from './global'

	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
			if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			...mapActions(['getAdminData']),
			async submitForm(formName) {
				
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						login({UserName: this.loginForm.username, pwd: this.loginForm.password}).then(res => {
							// global_.token = res.token;
							// this.$store.state.setUserToken(res.token);
							console.log('434343',res.data);
							let data = res.data
							if (res.code == 0) {
							this.$message({
		                        type: 'success',
		                        message: '登录成功'
							});
							
							this.$router.push('manage')
						}else{
							this.$message({
		                        type: 'error',
		                        message: res.message
		                    });
						}
							//控制台打印请求成功时返回的数据
						})
						.catch(function (err) {
							if (err.response) {
								console.log(err.response)
								//控制台打印错误返回的内容
							}
						})
					
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	
	.login_page{
		background-color: #fff;
		background-image: url(../assets/img/login-bg.jpg);
		background-repeat: no-repeat;
		background-position: center;
		background-size:cover; 
	}
	.tith1{padding: 10px 0 15px;}
	.manage_tip{
		// position: absolute;
		// width: 100%;
		// top: -100px;
		// left: 0;
		font-weight: 600;
		margin: 20px  auto 30px;
		p{
			font-size: 20px;
			color: #333;
		}
	}
	.form_contianer{
		.wh(320px, 260px);
		.ctp(320px, 260px);
		padding: 25px;
		border-radius: 2px;
		text-align: center;
		top: 40%;
		// background-color: rgba(255,255,255,.5);
	    // box-shadow: 0 10px 10px rgba(0,0,0,.2);
		.submit_btn{
			width: 100%;
			font-size: 14px;
			border-radius: 4px;
			padding: 14px;
			background-color: #2d8cf0;
			border-color: #2d8cf0;
			:hover{
		    opacity:0 .3;
			}
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
