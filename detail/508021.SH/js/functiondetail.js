// prettier-ignore
var myChart2 = echarts.init(document.getElementById('chart_alarm'));
var myChart3 = echarts.init(document.getElementById('chart_alarm1'));
var myChart4 = echarts.init(document.getElementById('chart_alarm2'));

var indexkey = '508021.SH'
if(indexkey.indexOf(".SZ") != -1){
        var datamon = datakl[indexkey+"mon"];
        var datemons = calculatedate(0,datamon)
      }else {
        var datamon = datakl[indexkey];
        var datemons = calculatedatesh(0,datamon)

}

var data0 = datakl[indexkey];
var data1 = datafenh;
var datadate = calculatedataf(1, indexkey, datafenh);
var dataf1 = calculatedataq0(2, indexkey, datafenh);
var dataf2 = calculatedataq0(4, indexkey, datafenh);
var dataf8 = calculatedataq0(3, indexkey, datafenh);
var dataf9 = calculatedataq0(5, indexkey, datafenh);
var dataf3 = calculatedataq(6, indexkey, datafenh);
var dataf4 = calculatedataq(7, indexkey, datafenh);



function converteq2d(date) {
    var datezhuan = {
        "Q1": "03-31",
        "Q2": "06-30",
        "Q3": "09-30",
        "Q4": "12-31",
    };
    for (var key in datezhuan) {
        if (date.indexOf(key) != -1) {
            var result = date.toString().slice(0, 4) + "-" + datezhuan[key];
            return result;
        }
    }
}


function calculatedataf(no, indexkey, data) {
    let result = [];
    for (let i = 0, len = data.length; i < len; i++) {
      if(indexkey == data[i][0]){
        result.push(data[i][no]);
      }
    }
    return result;
}
function calculatedataq0(no, indexkey, data) {
    let result = [];
    for (let i = 0, len = data.length; i < len; i++) {
      if(indexkey == data[i][0]){
        if (data[i][no] == "-"){
          result.push(0)
        }else {
           result.push((parseFloat(data[i][no].replace(/[^\d\\.-]/g,""))/10000).toFixed(2));
        }
      }
    }
    return result;
}

function calculatedataq(no, indexkey, data) {
    let result = [];
    for (let i = 0, len = data.length; i < len; i++) {
      if(indexkey == data[i][0]){
        if (data[i][no] == "-"){
          result.push(0)
        }else {
           result.push(parseFloat(data[i][no]));
        }
      }
    }
    return result;
}


function calculatedata(number, data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    result.push(parseInt(data[i][number]/10000));
  }
  return result;
}

function calculatedate(number, data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    result.push(data[i][number])
  }
  return result;
}

function calculatedatesh(number, data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {

    result0 = [data[i][0].toString().slice(0,4),"-",data[i][0].toString().slice(4,6),
        "-", data[i][0].toString().slice(6,8)].join("");

    result.push(result0)
  }
  return result;
}

function calculatedata1(data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
     result.push([data[i][1],data[i][2],data[i][3],data[i][4]])
  }
  return result;
}
function calculatedata12(data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
     result.push([data[i][1],data[i][4],data[i][2],data[i][3]])
  }
  return result;
}
const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
const labelFont = 'bold 12px Sans-serif';
function calculateMA(dayCount, data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += +data[i - j][1];
    }
    result.push((sum / dayCount).toFixed(2));
  }
  return result;
}

if (indexkey.indexOf("SH")  != -1){
  var dates = calculatedatesh(0,data0);
  // prettier-ignore
  var data = calculatedata12(data0);
  // prettier-ignore
  var volumes = calculatedata(6,data0);
}else{
  var dates = calculatedate(0,data0);
  // prettier-ignore
  var data = calculatedata1(data0);
  // prettier-ignore
  var volumes = calculatedata(8,data0);

}
var dataf5 = zhuanpaixian(dataf4, datadate, datemons, data);

function zhuanpaixian(dataf, dates1, dates2, data){
  var result = [];
  for(var i = 0, len = dataf.length; i < len; i++){
      var shujuweiz0 = converteq2d(dates1[i]);
      var shujuweiz1 = dates2.indexOf(shujuweiz0);
      var timeprice = data[shujuweiz1][1];
      result.push((dataf[i]/timeprice*400).toFixed(2))
  }
  return result
}


const dataMA5 = calculateMA(5, data);
const dataMA10 = calculateMA(10, data);
var shuju0 = ['当期实际分配', '当期可分配', '派现率%', '当年累计实分', '当年累计可分'];

var shuju1 = [dataf1, dataf2, dataf5, dataf8, dataf9];


var option = {
  animation: false,
  color: colorList,
  title: {
    left: 'center',
    text: '项目K线图'
  },
  legend: {
    top: 30,
    data: ['日K', 'MA5', 'MA10']
  },
  tooltip: {
    triggerOn: 'none',
    transitionDuration: 0,
    confine: true,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'rgba(255,255,255,0.9)',
    textStyle: {
      fontSize: 12,
      color: '#333'
    },
    position: function (pos, params, el, elRect, size) {
      const obj = {
        top: 60
      };
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
      return obj;
    }
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: [0, 1]
      }
    ]
  },
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: [0, 1],
      realtime: false,
      start: 20,
      end: 1000000,
      top: 65,
      height: 20,
      handleIcon:
        'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '120%'
    },
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 40,
      end: 70,
      top: 30,
      height: 20
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: dates,
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#777' } },
      axisLabel: {
        formatter: function (value) {
          return echarts.format.formatTime('MM-dd', value);
        }
      },
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        show: true
      }
    },
    {
      type: 'category',
      gridIndex: 1,
      data: dates,
      boundaryGap: false,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#777' } },
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        type: 'shadow',
        label: { show: false },
        triggerTooltip: true,
        handle: {
          show: true,
          margin: 30,
          color: '#B80C00'
        }
      }
    }
  ],
  yAxis: [
    {
      scale: true,
      splitNumber: 2,
      axisLine: { lineStyle: { color: '#777' } },
      splitLine: { show: true },
      axisTick: { show: false },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }
  ],
  grid: [
    {
      left: 20,
      right: 20,
      top: 110,
      height: 120
    },
    {
      left: 20,
      right: 20,
      height: 40,
      top: 260
    }
  ],
  graphic: [
    {
      type: 'group',
      left: 'center',
      top: 70,
      width: 300,
      bounding: 'raw',
      children: [
        {
          id: 'MA5',
          type: 'text',
          style: { fill: colorList[1], font: labelFont },
          left: 0
        },
        {
          id: 'MA10',
          type: 'text',
          style: { fill: colorList[2], font: labelFont },
          left: 'center'
        },
        {
          id: 'MA20',
          type: 'text',
          style: { fill: colorList[3], font: labelFont },
          right: 0
        }
      ]
    }
  ],
  series: [
    {
      name: '交易额（万元）',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        color: '#7fbe9e'
      },
      emphasis: {
        itemStyle: {
          color: '#140'
        }
      },
      data: volumes
    },
    {
      type: 'candlestick',
      name: '日K',
      data: data,
      itemStyle: {
        color: '#ef232a',
        color0: '#14b143',
        borderColor: '#ef232a',
        borderColor0: '#14b143'
      },
      emphasis: {
        itemStyle: {
          color: 'black',
          color0: '#444',
          borderColor: 'black',
          borderColor0: '#444'
        }
      }
    },
    {
      name: 'MA5',
      type: 'line',
      data: dataMA5,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: dataMA10,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1
      }
    },
  ]
};

myChart2.setOption(option);


var maxjine1 = Math.max(...(shuju1[0].concat(shuju1[1])));
var maxjine2 = Math.max(...(shuju1[3].concat(shuju1[4])));

var maxpaixian = Math.max(...(shuju1[2]));
var option1 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: shuju0
    },
    xAxis: [
        {
            type: 'category',
            data: datadate,
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    grid:{
        left:80,
        rigth:10,
        top:60,
        bottom:30
    },
    yAxis: [
        {
            type: 'value',
            name: '实际派现额',
            min: 0,
            max:  Math.ceil(maxjine1/100)*100,
            interval: Math.round(maxjine1/800)*100,
            axisLabel: {
                formatter: '{value} 万元',
            }
        },
        {
            type: 'value',
            name: '年化派现率',
            min: 0,
            max:  Math.ceil(maxpaixian),
            interval: Math.round(maxpaixian/6),
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name: shuju0[0],
            type: 'bar',
            data: shuju1[0]
        },
        {
            name: shuju0[1],
            type: 'bar',
            data: shuju1[1]
        },
        {
            name: shuju0[2],
            type: 'line',
            yAxisIndex: 1,
            data: shuju1[2]
        },
    ]
};
myChart3.setOption(option1);


var option2 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    grid:{
        left:120,
        rigth:10,
        top:60,
        bottom:30
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data: shuju0
    },
    xAxis: [
        {
            type: 'category',
            data: datadate,
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '万元',
            min: 0,
            max:   Math.ceil(maxjine2/100)*100,
            interval: Math.round(maxjine2/800)*100,
            axisLabel: {
                formatter: '{value} 万元'
            }
        },
        {
            type: 'value',
            name: '年化派现率',
            min: 0,
            max: Math.ceil(maxpaixian),
            interval: Math.round(maxpaixian/6),
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [

        {
            name: shuju0[2],
            type: 'line',
            yAxisIndex: 1,
            data: shuju1[2]
        },
                {
            name: shuju0[3],
            type: 'bar',
            data: shuju1[3]
        },
                {
            name: shuju0[4],
            type: 'bar',
            data: shuju1[4]
        },
    ]
};
myChart4.setOption(option2);
