/**
 * Created by 54721 on 2018/11/27.
 */
$(function () {
  // 1. 柱状图
  // 基于准备好的dom，初始化echarts实例
  var echarts_left = echarts.init(document.querySelector(".echarts_left"));

  // 指定图表的配置项和数据
  var option1 = {
    // 标题
    title: {
      // 标题文本
      text: '2018年注册人数',
      padding: [5, 5, 5, 20]
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data: ['人数', '销量'],
      left: 'center'
    },
    // x轴
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // y轴, y轴的数据刻度, 需要通过数据的值, 动态生成
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',    // bar 柱状图,  line 折线图   pie 饼图
      data: [100, 60, 46, 40, 10, 20]
    }, {
      name: '销量',
      type: 'bar',
      data: [50, 20, 66, 10, 10, 20]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1);



  // 2. 饼图
  // 基于准备好的dom，初始化echarts实例
  var echarts_right = echarts.init(document.querySelector(".echarts_right"));
  option2 = {
    title: {
      text: '热门销量',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['阿迪', '安踏', '乔丹', '老北京', '回力']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '阿迪' },
          { value: 310, name: '安踏' },
          { value: 234, name: '乔丹' },
          { value: 135, name: '老北京' },
          { value: 1548, name: '回力' }
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
