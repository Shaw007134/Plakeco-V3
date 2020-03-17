function hchartsConfig() {
  var chart = {
    zoomType: 'xy'
  };
  var title = {
    text: '合肥24小时实时气象数据'
  };
  var xAxis = {
    categories: [],
    crosshair: true
  };
  var yAxis = [{ // 第一条Y轴
      title: {
        text: '降雨量',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      labels: {
        format: '{value} mm',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      opposite: true
    }, { // 第二条Y轴
      gridLineWidth: 0,
      title: {
        text: '气压',
        style: {
          color: Highcharts.getOptions().colors[2]
        }
      },
      labels: {
        format: '{value} mb',
        style: {
          color: Highcharts.getOptions().colors[2]
        }
      },
    },
    { // 第三条Y轴
      title: {
        text: '气温',
        style: {
          color: Highcharts.getOptions().colors[3]
        }
      },
      labels: {
        format: '{value}\xB0C',
        style: {
          color: Highcharts.getOptions().colors[3]
        }
      }
    }, { // 第四条Y轴
      gridLineWidth: 0,
      title: {
        text: '相对湿度',
        style: {
          color: Highcharts.getOptions().colors[4]
        }
      },
      labels: {
        format: '{value} %',
        style: {
          color: Highcharts.getOptions().colors[4]
        }
      },
      opposite: true
    }
  ];

  var series = [{
      name: '降雨量',
      type: 'column',
      yAxis: 0,
      data: [],
      tooltip: {
        valueSuffix: ' mm'
      }

    },
    {
      name: '气压',
      type: 'spline',
      yAxis: 1,
      data: [],
      // color: "#008800",
      tooltip: {
        valueSuffix: ' hPa'
      }
    },
    {
      name: '气温',
      type: 'spline',
      yAxis: 2,
      data: [],
      tooltip: {
        valueSuffix: '\xB0C'
      }
    },
    {
      name: '相对湿度',
      type: 'spline',
      yAxis: 3,
      data: [],
      tooltip: {
        valueSuffix: ' %'
      }
    }
  ];
  var colors = [];
  var tooltip = {
    shared: true
  };
  var credits = {
    enabled: false
  };
  var legend = {
    layout: 'horizontal',
    // align: 'left',
    // x: 0,
    verticalAlign: 'top',
    y: 1,
    // floating: true,
    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
  };
  var colors = ["#7cb5ec", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
  var json = {};
  json.chart = chart;
  json.title = title;
  json.xAxis = xAxis;
  json.yAxis = yAxis;
  json.tooltip = tooltip;
  json.legend = legend;
  json.series = series;
  json.credits = credits;
  json.colors = colors;
  return json;
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded')
  getWeather()
})

setInterval(getWeather, 30 * 60 * 1000)

function getWeather() {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://47.104.228.220:10002/realtime')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = xhr.responseText
        var length = response.length
        response = response.substr(9, length - 9)
        response = JSON.parse(response)
        // console.log(response);
        var time = [],
          rain = [],
          temperature = [],
          humidity = [],
          pressure = [],
          windDirection = [],
          windSpeed = []
        for (var i = 0; i < response.length - 1; i++) {
          time.unshift(response[i].time.substr(10, 6))
          rain.unshift(response[i].rain1h)
          temperature.unshift(response[i].temperature)
          humidity.unshift(response[i].humidity)
          pressure.unshift(response[i].pressure)
          windDirection.unshift(response[i].windDirection)
          windSpeed.unshift(response[i].windSpeed)
        }
        var json = hchartsConfig();
        json.xAxis.categories = time
        json.series[0].data = rain
        json.series[1].data = pressure
        json.series[2].data = temperature
        json.series[3].data = humidity
        let myChart = Highcharts.chart('container', json)
      }
    }
  }
  xhr.send()
}
