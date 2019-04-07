<template>
    <div class="header_container">
      <div class="em-spots" ><span class="decorate" style="width: 28px; height: 28px; margin-top: -14px; margin-left: -14px; top: 19.5109%; left: 8.33333%;"></span><span class="decorate" style="background: rgb(0, 62, 135); width: 36px; height: 36px; margin-top: -18px; margin-left: -18px; top: 12.6548%; left: 25%;"></span><span class="decorate" style="background: rgb(233, 34, 36); width: 22px; height: 22px; margin-top: -11px; margin-left: -11px; top: 4.71765%; left: 41.6667%;"></span><span class="decorate" style="width: 56px; height: 56px; margin-top: -28px; margin-left: -28px; top: 0.692177%; left: 58.3333%;"></span><span class="decorate" style="background: rgb(255, 86, 0); width: 43px; height: 43px; margin-top: -21.5px; margin-left: -21.5px; top: 88.9307%; left: 75%;"></span><span class="decorate" style="background: rgb(233, 34, 36); width: 36px; height: 36px; margin-top: -18px; margin-left: -18px; top: 6.28293%; left: 91.6667%;"></span></div>
		<el-breadcrumb separator="/" style="position: absolute;">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<img :src="baseImgPath + adminInfo.avatar" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :to="{ path: '/manage' }" command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
    		return {
    			baseImgPath,
    		}
    	},
    	created(){
    		if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'signout'){
					this.$router.push('/');
					const res = await signout();
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 54px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
		position: relative;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	    box-shadow: 0 5px 30px rgba(45,140,240,.7);
	}
	.el-dropdown-menu__item{
        text-align: center;
	}
	.em-spots .decorate {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #4b89fc;
    position: absolute;
    left: 200px;
    opacity: .13;
}
</style>
