///////////////echarts地图////////////////////////////////////////
    var chart1 = echarts.init(document.getElementById('map'));

    ///////成交地图////////////////////////////
    var datacity = datatab[0][2];
    var maxdata = maxData(datatab[0][2]);
    function convertData(data) {
				var res = [];
				for (var key in data) {
				    if (geoCoordMapcity.hasOwnProperty(key)) {
				        var item = data[key];
				        var geoCoord = geoCoordMapcity[key];

						res.push({
							name: key,
							value:geoCoord.concat(item)
						});
                    }
				}
				return res;
			}

	function maxData(data) {
				var res = 0;
				for (var key in data) {
				    if (data[key] > res) {
				        res = data[key]
                    }
				}
				return res;
			}

	var deadata = convertData(datacity);



      $.get('js/map/china.json', function (geoJson) {
          console.log('geoJson:', geoJson);
          // 注册地图名字(tongren)和数据(geoJson)
          echarts.registerMap('china', geoJson);
          var option = {
          title: {
              text: '各城市REITS发行数量情况',
              x: 'center',
              top: "10",
              textStyle: {
                  color: '#131824',
                  fontSize: 14
              }
          },

          tooltip: {
              show: true,
              // backgroundColor: '#005cff',
              formatter: (params) => {
                  var data = "城市: " + params.name + "<br/>" + "发行数量: " + params.value[2];
                  return data;
              },
          },
          visualMap: [{
              type: 'continuous',
              seriesIndex: 0,
              text: ['发行数量'],
               textStyle: {
                  color: '#131824',
                  fontSize: 10
              },
              calculable: true,

              max: maxdata,
              inRange: {
                  color: ['#c8f4de', '#a4e5d9','#66c6ba']
              }
          }],
          geo3D: {
              map: 'china',
              roam: true,
              aspectScale: 0.75, //长宽比
              //boxHeight: 30,
              viewControl: {
                  distance: 70,
                  barHeight:30,

                  center: [-3, -5, 5]
              },
              itemStyle: {
                  areaColor: '#346c9c', // 地图板块的颜色
                  opacity: 0.4, // 图形的不透明度 [ default: 1 ]
                  borderWidth: 1.2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
                  borderColor: '#f6ffdf' // 图形描边的颜色。[ default: #333 ]
              },
              label: {
                  show: false,
                  textStyle: {
                      color: '#144d7f', //地图初始化区域字体颜色
                      fontSize: 8,
                      opacity: 0.5,
                      backgroundColor: '#8fffbd'
                  },
              },
              emphasis: { //当鼠标放上去  地=区区域是否显示名称
                  label: {
                      show: false,
                      textStyle: {
                          color: '#000000',
                          fontSize: 12,
                          opacity: 1,
                          backgroundColor: '#04dae8',
                      }
                  }
              },
              //shading: 'lambert',
              light: { //光照阴影
                  main: {
                      color: '#c6cdc8', //光照颜色
                      intensity: 1.2, //光照强度
                      //shadowQuality: 'high', //阴影亮度
                      shadow: false, //是否显示阴影
                      alpha: 50,
                      beta: 10

                  },
                  ambient: {
                      intensity: 0.3
                  }
              }
          },
          series: [
              {
              name: 'bar3D',
              type: "bar3D",
              coordinateSystem: 'geo3D',
              barSize: 1, //柱子粗细
              minHeight:1,
              shading: 'lambert',
              bevelSize: 0.2,
              opacity: 0.8,
              silent: false,
              color: '#ff1bb9',
              label: {
                  show: true,
                  textStyle: {
                      color: '#fdf4ff',
                      fontSize: 9,
                      opacity: 1,
                      backgroundColor: '#1d003d',
                  },
                  formatter: '{b}'
              },
              data: deadata,
          }]
      };
      chart1.setOption(option, true);
      });



