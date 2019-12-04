/* let color = ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
  '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
  '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
  '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0']
let backgroundColor = 'rgba(0,114,140,0.5)'
let lineObj = {
    type: 'line',
    name: '曲线1',
    symbol: 'none',
    smooth: false,
    data: []
  }
let barObj = {
  type: 'bar', // bar配置
  name: '曲线2',
  barMinHeight: 0, // 最小高度改为0
  // barWidth: null,        // 默认自适应
  barGap: '30%', // 柱间距离，默认为柱形宽度的30%，可设固定值
  barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
  itemStyle: {
    normal: {
      // color: '各异',
      barBorderColor: '#fff', // 柱条边线
      barBorderRadius: 0, // 柱条边线圆角，单位px，默认为0
      barBorderWidth: 1, // 柱条边线线宽，单位px，默认为1
      label: {
        show: false
        // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
        //           'inside'|'left'|'right'|'top'|'bottom'
        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
      }
    },
    emphasis: {
      // color: '各异',
      barBorderColor: 'rgba(0,0,0,0)', // 柱条边线
      barBorderRadius: 0, // 柱条边线圆角，单位px，默认为0
      barBorderWidth: 1, // 柱条边线线宽，单位px，默认为1
      label: {
        show: false
        // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
        //           'inside'|'left'|'right'|'top'|'bottom'
        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
      }
    }
  },
  data: []
}
let title = '挠度曲线演示'
let yValue = '{value} (t)' */
export default function getLineOption (backgroundColor, title, legendData, yValue, name, type = 'time') {
  return {
    backgroundColor: backgroundColor, // 全图默认背景色
   /* color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
      '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
      '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
      '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],*/
    title: {
      text: title, // 标题
      /* subtext: '挠度小弟', // 副标题 */
      x: 'center', // 水平安放位置  // 'center' ¦ 'left' ¦ 'right'
      y: 'top', // 垂直安放位置    // 'top' ¦ 'bottom' ¦ 'center'
      borderColor: '#000', // 标题边框颜色
      borderWidth: 0, // 标题边框线宽
      padding: 5, // 标题内边距
      itemGap: 10, // 主副标题纵向间隔
      textStyle: {
        fontSize: 18,
        fontWeight: 'bolder',
        color: '#000'// 主标题文字颜色
      },
      subtextStyle: {
        color: 'rgba(0,0,0,0.6)' // 副标题文字颜色
      }
    },/*
    dataZoom: [
      {
        id: 'dataZoomX',
        type: 'slider',
        xAxisIndex: [0],
        filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
        start: 30,
        end: 70
      },
      {
        id: 'dataZoomY',
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'empty'
      }
    ],*/
    toolbox: {
      show: true,
      textStyle: {
        color: '#333'
      },
      feature: {
        mark: {show: true},
        dataZoom: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'alarm.vue']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    legend: { // 图例
      show: true,
      orient: 'vertical', // 布局方式，默认为水平布局，可选为：  // 'horizontal' ¦ 'vertical'
      x: 'right', // 水平安放位置，默认为全图居中，可选为：  // 'center' ¦ 'left' ¦ 'right'  // ¦ {number}（x坐标，单位px）
      y: 'center', // 垂直安放位置，默认为全图顶端，可选为： // 'top' ¦ 'bottom' ¦ 'center'    // ¦ {number}（y坐标，单位px）
      data: legendData,
      backgroundColor: 'rgba(0,0,0,0)', // 图例背景色
      borderColor: '#ccc', // 图例边框颜色
      borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
      padding: 5, // 图例内边距，单位px，默认各方向内边距为5，// 接受数组分别设定上右下左边距，同css
      itemGap: 10, // 各个item之间的间隔，单位px，默认为10，// 横向布局时为水平间隔，纵向布局时为纵向间隔
      itemWidth: 30, // 图例图形宽度
      itemHeight: 14, // 图例图形高度
      textStyle: {
        color: '#EC151A'// 图例文字颜色
      }
    },
    // 提示框
    tooltip: {
      trigger: 'axis', // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    // 网格
    /*grid: {
      x: 80,
      y: 60,
      x2: 80,
      y2: 60,
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 1,
      borderColor: '#f21'
    },*/

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: type,
      splitLine: {show: true},
      axisLabel: {
        interval: 0,
        rotate: '45'
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: yValue
      },
      splitLine: {
        show: true
      }
    },
    series: [
      {
        type: 'line',
        name: name,
        symbol: '',
        smooth: false,
        stack: '总量',
        areaStyle: {normal: {}},
        data: []
      }
    ]
  }
}
