<template>
    <div>
        <head-top></head-top>
		
		<section class="data_section">
			<h3 class="section_title">VR头戴设备控制管理系统运行实时记录</h3>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="6"><div class="data_list today_head"><span class="data_num head">箱体总数：</span><span class="data_num">{{userCount}}</span></div></el-col>
				<el-col :span="6"><div class="data_list all_head"><span class="data_num head">头盔手柄总数：</span> <span class="data_num ">{{allOrderCount}}</span> </div></el-col>
				<el-col :span="6"><div class="data_list wall_head"><span class="data_num head">VR运行次数：</span> <span class="data_num">{{orderCount}}</span></div></el-col>
                <el-col :span="6"><div class="data_list user_head"><span class="data_num head">故障台楼：</span> <span class="data_num">{{adminCount}}</span></div></el-col>
			</el-row>
			<!-- <header class="section_title">数据统计</header> -->
			<!-- <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="6"><div class="data_list today_head"><span class="data_num head">VR头盔与手柄信息：</span></div></el-col>
				<el-col :span="6"><div class="data_list"><span class="data_num">{{userCount}}</span> VR手柄是否在充电</div></el-col>
				<el-col :span="6"><div class="data_list"><span class="data_num">{{orderCount}}</span> VR头盔是否在充电</div></el-col>
                <el-col :span="6"><div class="data_list"><span class="data_num">{{adminCount}}</span> VR设备与箱体保持一致</div></el-col>
			</el-row>
            <el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="6"><div class="data_list all_head"><span class="data_num head">未授权箱体状态信息：</span></div></el-col>
                <el-col :span="6"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 未授权</div></el-col>
                <el-col :span="6"><div class="data_list"><span class="data_num">{{allOrderCount}} {{orderCount}}</span> 已授权</div></el-col>
				<el-col :span="6"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 故障异常状态</div></el-col>
            </el-row>
			 <el-row :gutter="20">
                <el-col :span="6"><div class="data_list wall_head"><span class="data_num head">已授权箱体状态信息：</span></div></el-col>
                <el-col :span="9"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 解锁</div></el-col>
                <el-col :span="9"><div class="data_list"><span class="data_num">{{allOrderCount}} {{orderCount}}</span> 加锁</div></el-col>
            </el-row> -->
		</section>
		<section class="data_section">
			<div class="linebox">
               <h3 class="titleline">过去一周</h3>
		       <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
		    </div>
			<div class="linebox2">
               <h3 class="titleline">VR设备运行情况</h3>
		       <visitorPie :pieData='pieData'></visitorPie>
		    </div>
		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency' 
	import visitorPie from '../components/visitorPie' 
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
    			userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
				sevenDay: [],
				sevenDate: [[]],
				pieData: [],
				// sevenDate: [[],[],[]],
    		}
    	},
    	components: {
    		headTop,
			tendency,
			visitorPie,
    	},
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
    			const today = dtime().format('YYYY-MM-DD')
    			Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
    			.then(res => {
    				this.userCount = res[0].count;
    				this.orderCount = res[1].count;
                    this.adminCount = res[2].count;
                    this.allUserCount = res[3].count;
                    this.allOrderCount = res[4].count;
                    this.allAdminCount = res[5].count;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
    			const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
    				apiArr[0].push(userCount(item))
    				apiArr[1].push(orderCount(item))
                    apiArr[2].push(adminDayCount(item))
    			})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[]];
					res.forEach((item, index) => {
						if (item.status == 1) {
							resArr[Math.floor(index/7)].push(item.count)
						}
					})
					this.sevenDate = resArr;
    			}).catch(err => {
    				console.log(err)
    			})
    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
	
		.section_title{
			text-align: left;
			font-size: 16px;
			padding-left: 5px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: left;
			font-size: 12px;
			color: #666;
            border-radius: 2px;
			background: #E5E9F2;
			padding: 6px 20px 20px;
			// height: 50px;
            .data_num{
				color: #fff;
				display: block;
				font-size: 24px;
				font-weight: 600;
				margin-top: -3px;
				line-height: 100%;
            }
            .head{
                border-radius: 2px;
				font-size: 12px;
                padding: 4px 0;
				color: #fff;
				line-height: 100%;
                display: inline-block;
            }
        }
        .today_head{
			background: #2389f5;
			line-height: 45px;
        }
        .all_head{
			background: #00b5b1;
			line-height: 45px;
		}
		.wall_head{
			background: #ffcf3d;
			line-height: 45px;
		}
		.user_head{
			background: #ff676a;
			line-height: 45px;
		}
	}
    .wan{
        .sc(16px, #333)
	}
	 .linebox{ width: 60%; float: left;}
	 .linebox2{width: 38%;float: left;}
	  .titleline{ display: inblack;padding-left: 30px; font-size: 14px;  padding-bottom: 10px;}
</style>
