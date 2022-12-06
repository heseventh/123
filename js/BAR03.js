var myChart2 = echarts.init(document.getElementById('chart03'));
var databar01 = datatab[3];

var data0 = [];

for(var key1 in databar01[0]){
    var item = {name:key1, value:databar01[0][key1].toFixed(2)};
    data0.push(item)
}
var data1 = [];

for(var key1 in databar01[1]){
    var item = {name:key1, value:databar01[1][key1].toFixed(2)};
    data1.push(item);
}
var data2 = [];

for(var key1 in databar01[2]){
    var item = {name:key1, value:databar01[2][key1].toFixed(2)};
    data2.push(item);
}


var option = {
    title: [{
        text: 'REITS发行规模各维度占比',
        textStyle:{
             fontSize: 20,//字体大小
             color: '#131824',//字体颜色,
             fontFamily:"华文楷体",
                    },
        left: '40%',
        top: '5%',
    }, {
        subtext: '公司占比',
        subtextStyle:{
             fontSize: 15,//字体大小
             color: '#131824',//字体颜色,
             fontFamily:"华文楷体",
                    },
        left: '16.67%',
        top: '85%',
        textAlign: 'center'
    }, {
        subtext: '行业占比',
        subtextStyle:{
             fontSize: 15,//字体大小
             color: '#131824',//字体颜色,
             fontFamily:"华文楷体",
                    },
        left: '50%',
        top: '85%',
        textAlign: 'center'
    }, {
        subtext: '城市占比',
        subtextStyle:{
             fontSize: 15,//字体大小
             color: '#131824',//字体颜色,
             fontFamily:"华文楷体",
                    },
        left: '83.33%',
        top: '85%',
        textAlign: 'center'
    }],
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} 亿({d}%)'
    },
   color:['#278499',
       '#4b6065',
       '#74949c',
       '#7b505c',
       '#62759f',
       '#a49f9f',
       '#5f869c',
       '#24567c',
       '#6b836e',
       '#957d61',
   ],
    series: [{
        type: 'pie',
        radius: '45%',
        center: ['50%', '50%'],
        data: data0,
        animation: false,
        label: {
            position: 'outer',
            alignTo: 'labelLine',
            bleedMargin: 5
        },
        left: 0,
        right: '66.6667%',
        top: 0,
        bottom: 0
    }, {
        type: 'pie',
        radius: '45%',
        center: ['50%', '50%'],
        data: data1,
        animation: false,
        label: {
            position: 'outer',
            alignTo: 'labelLine',
            bleedMargin: 5
        },
        left: '33.3333%',
        right: '33.3333%',
        top: 0,
        bottom: 0
    }, {
        type: 'pie',
        radius: '45%',
        center: ['50%', '50%'],
        data: data2,
        animation: false,
        label: {
            position: 'outer',
            alignTo: 'labelLine',
            bleedMargin: 5
        },
        left: '66.6667%',
        right: 0,
        top: 0,
        bottom: 0
    }]
};

    if (option && typeof option === 'object') {
      myChart2.setOption(option);
    }