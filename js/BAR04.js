var myChart2 = echarts.init(document.getElementById('chart04'));

var data0 = datakl;
var timeline = 300;
var databar02 = datatab[2];
var item = {};

for(var i = 0; i < databar02.length-1; i++){

    if (databar02[i +1][4] != ""){
        var itemn = databar02[i+1][12];
        var itemo = databar02[i+1][0];
        var itemp = databar02[i+1][5];
        var itempr = databar02[i+1][7];
         if (data0[databar02[i+1][1]].length > timeline){
             var itemif = (data0[databar02[i+1][1]]).slice(-timeline);
         }else{
             var itemif = data0[databar02[i+1][1]]
         }
    if(item.hasOwnProperty(itemn)){
        item[itemn].push([itemo, itemp, itempr, itemif])
    }else{
        item[itemn]= [[itemo, itemp, itempr, itemif]]
    }
    }
}




var date0 = (data0["508000.SH"]).slice(-timeline);

function calculatedate(number, data) {
  let result = [];
  for (let i = 0, len = data.length; i < len; i++) {

    var result0 = [data[i][0].toString().slice(0,4),"-",data[i][0].toString().slice(4,6),
        "-", data[i][0].toString().slice(6,8)].join("");

    result.push(result0)
  }
  return result;
}

var date = calculatedate(0, date0);

var serisdata = [];


for(var key1 in item){
    var data01 = [];
    for(var key3 in item[key1]){
        if (item[key1][key3][3].length < timeline){
        var leno = item[key1][key3][3].length;
        for(var i = 0; i < timeline - leno; i++){
            item[key1][key3][3].unshift(['', ''])
        }
    }
    }

     for(var i = 0; i < timeline; i++){
        var fenzi = 0;
        var fenmu0 = 0;
        for(var key3 in item[key1]) {
              if(item[key1][key3][3][i][1] != ""){
                  fenmu0 = +item[key1][key3][2]*item[key1][key3][1];
                  fenzi = +item[key1][key3][3][i][1]*item[key1][key3][1]
              }
          }
          if(fenzi != 0){
              data01.push((fenzi/fenmu0*100).toFixed(2))
          }else{
              data01.push("")
          }

}
    var serisda = {name:key1,
        type: 'line',
        lineStyle:{
         normal:{
             width:1
         }
        },
        symbol:"circle",
        symbolSize:0,
        data:data01,
    };
serisdata.push(serisda)
}




var option = {
    title: {
        text: '近三个季度分行业reits指数走势(100为基准)',
        x:'center',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: date
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date,
    },
    yAxis: {
        type: 'value'
    },
    series: serisdata
};

    if (option && typeof option === 'object') {
      myChart2.setOption(option);
    }