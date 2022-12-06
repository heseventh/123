var myChartCJzz = echarts.init(document.getElementById('chart_alarm'));

var databar01 = datatab[1];
var databar02 = Object.values(databar01[0]);
var databar03 = Object.values(databar01[1]);
var databar04 = Object.values(databar01[2]);
var databar05 = [];
for(var i = 0; i < databar04.length; i++){
    databar05.push((databar04[i][1]/databar04[i][0]*100).toFixed(2))
}


var keys = Object.keys(datatab[1][0]);

function addzzt(myChart){
const colors = ['#346C9C', '#4d606e', '#393e46'];
var option = {
    color: colors,
    tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '20%'
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {

      textStyle:{
             fontSize: 12,//字体大小
             color: '#131824'//字体颜色
                        },
    data: ['发行数量(个)', '发行规模(亿元)', '发行派现率(%)']
  },
  xAxis: [
    {
      type: 'category',
            axisLabel: {
                show: true,
                textStyle: {
                    fontSize: 10,//字体大小
                    color: '#131824',
                     borderWidth:0,
                }
            },
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
      data: keys
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '发行数量',
      position: 'right',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value} 个',
          borderWidth:0,
      }
    },
    {
      type: 'value',
      name: '发行规模',
      position: 'right',
      alignTicks: true,
      offset: 60,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value} 亿元'
      }
    },
    {
      type: 'value',
      name: '发行派现率%',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: '发行数量(个)',
      type: 'bar',
      data: databar03
    },
    {
      name: '发行规模(亿元)',
      type: 'bar',
      yAxisIndex: 1,
      data: databar02
    },
    {
      name: '发行派现率(%)',
      type: 'line',
      yAxisIndex: 2,
      data: databar05
    }
  ]
};

myChart.setOption(option);

}

addzzt(myChartCJzz);