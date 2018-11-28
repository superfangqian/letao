$(function(){
   // 基于准备好的dom，初始化echarts实例
   var echarts_left = echarts.init(document.querySelector('.echarts_left'));

   // 指定图表的配置项和数据
   //柱状图
   var option1 = {
       title: {
           text: '2018年销量'
       },
       tooltip: {},
       legend: {
           data:['人数', '销量']
       },
       xAxis: {
           data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
       },
       yAxis: {},
       series: [{
           name: '销量',
           type: 'bar',
           data: [5, 20, 36, 10, 10, 20]
       },
       {
        name: '人数',
        type: 'bar',
        data: [70, 40, 36, 10, 90, 20]
    }
      ]
   };

   // 使用刚指定的配置项和数据显示图表。
   echarts_left.setOption(option1);


   var echarts_right = echarts.init(document.querySelector('.echarts_right'));
   option2 = {
    title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['回力','乔丹','安踏','老北京','耐克']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'回力'},
                {value:310, name:'乔丹'},
                {value:234, name:'安踏'},
                {value:135, name:'老北京'},
                {value:1548, name:'耐克'}
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
echarts_right.setOption(option2);

})