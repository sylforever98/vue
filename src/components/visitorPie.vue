<template>
    <div class="visitorpie">
        <div id="visitorpie" class="" style="width: 100%;height:400px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('visitorpie'));
            this.initData();
        },
        props: ['pieData'],
        methods: {
            initData(){
                const colors = ['#4f94ee', '#e13c6d', '#ff9b45','#b24cf5','#27bd4e'];
                const option = {
                    color: colors,
                    // title : {
                    //     text: '用户分布',
                    //     subtext: '',
                    //     x:'center'
                    // },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        // orient: 'vertical',
                        orient: 'horizontal',
                        right: 'left',
                        data: ['未授权','已授权关锁','已授开锁','故障','其他']
                    },
                    series : [
                        {
                            name: 'VR设备',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                // {value:this.pieData.beijing, name:'北京'},
                                // {value:this.pieData.shanghai, name:'上海'},
                                // {value:this.pieData.shenzhen, name:'深圳'},
                                // {value:this.pieData.hangzhou, name:'杭州'},
                                // {value:this.pieData.qita, name:'其他'}
                                  {value:44, name:'未授权'},
                                {value:22, name:'已授权关锁'},
                                {value:11, name:'已授开锁'},
                                {value:33, name:'故障'},
                                {value:11, name:'其他'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                this.myChart.setOption(option);
            }
        },
        watch: {
            pieData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .visitorpie{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
